import { ObservableMap, action, computed, observable, runInAction, toJS } from "mobx"
import debounce from "lodash/debounce"
import includes from "lodash/includes"
import isEqual from "lodash/isEqual"
import isPlainObject from "lodash/isPlainObject"
import union from "lodash/union"
import uniqueId from "lodash/uniqueId"
import deepmerge from "deepmerge"
import Base from "./Base"
import Collection from "./Collection"
import Request from "./Request"
import apiClient from "./apiClient"
import { OptimisticId, Id, DestroyOptions, SaveOptions } from "./types"

const dontMergeArrays = (_oldArray, newArray) => newArray

type Attributes = { [key: string]: any }
export const DEFAULT_PRIMARY = "id"

export default class Model extends Base {
	defaultAttributes: Attributes = {}

	attributes: ObservableMap = observable.map()
	committedAttributes: ObservableMap = observable.map()

	optimisticId: OptimisticId = uniqueId("i_")
	collection: Collection<this> | null = null

	constructor(attributes: Attributes = {}, defaultAttributes: Attributes = {}) {
		super()

		this.defaultAttributes = defaultAttributes

		const mergedAttributes = {
			...this.defaultAttributes,
			...attributes,
		}

		this.attributes.replace(mergedAttributes)
		this.commitChanges()
	}

	/**
	 * Returns a JSON representation
	 * of the model
	 */
	toJS() {
		return toJS(this.attributes, { exportMapsAsObjects: true })
	}

	/**
	 * Define which is the primary
	 * key of the model.
	 */
	get primaryKey(): string {
		return DEFAULT_PRIMARY
	}

	/**
	 * Return the base url used in
	 * the `url` method
	 *
	 * @abstract
	 */
	urlRoot(): string | null {
		return null
	}

	/**
	 * Return the url for this given REST resource
	 * //*.method에 따라 다른 url 호출을 위한 확장
	 */
	url(method?: string, data?: {}): string {
		let urlRoot = this.urlRoot()

		if (!urlRoot && this.collection) {
			urlRoot = this.collection.url()
		}

		if (!urlRoot) {
			throw new Error("implement `urlRoot` method or `url` on the collection")
		}

		if (this.isNew) {
			return urlRoot
		} else {
			return `${urlRoot}/${this.get(this.primaryKey)}`
		}
	}

	/**
	 * Wether the resource is new or not
	 *
	 * We determine this asking if it contains
	 * the `primaryKey` attribute (set by the server).
	 */
	@computed
	get isNew(): boolean {
		return !this.has(this.primaryKey) || !this.get(this.primaryKey)
	}

	/**
	 * Get the attribute from the model.
	 *
	 * Since we want to be sure changes on
	 * the schema don't fail silently we
	 * throw an error if the field does not
	 * exist.
	 *
	 * If you want to deal with flexible schemas
	 * use `has` to check wether the field
	 * exists.
	 */
	get(attribute: string): any {
		if (this.has(attribute)) {
			return this.attributes.get(attribute)
		}
		//*.속성이 없는 경우 에러 처리에서 콘솔 디버그 로그로 대체
		console.debug(this, 'Mode.get: Attribute "' + attribute + '" not found')
		// throw new Error(`Attribute "${attribute}" not found`)
	}

	/**
	 * Returns whether the given field exists
	 * for the model.
	 */
	has(attribute: string): boolean {
		return this.attributes.has(attribute)
	}

	/**
	 * Get an id from the model. It will use either
	 * the backend assigned one or the client.
	 */
	get id(): Id {
		return this.has(this.primaryKey) ? this.get(this.primaryKey) : this.optimisticId
	}

	/**
	 * Get an array with the attributes names that have changed.
	 */
	@computed
	get changedAttributes(): Array<string> {
		return getChangedAttributesBetween(toJS(this.committedAttributes), toJS(this.attributes))
	}

	/**
	 * Gets the current changes.
	 */
	@computed
	get changes(): { [key: string]: any } {
		return getChangesBetween(toJS(this.committedAttributes), toJS(this.attributes))
	}

	/**
	 * If an attribute is specified, returns true if it has changes.
	 * If no attribute is specified, returns true if any attribute has changes.
	 */
	hasChanges(attribute?: string): boolean {
		if (attribute) {
			return includes(this.changedAttributes, attribute)
		}

		return this.changedAttributes.length > 0
	}

	@action
	commitChanges(): void {
		this.committedAttributes.replace(toJS(this.attributes))
	}

	@action
	discardChanges(): void {
		this.attributes.replace(toJS(this.committedAttributes))
	}

	/**
	 * Replace all attributes with new data
	 */
	@action
	reset(data?: {}): void {
		this.attributes.replace(data ? { ...this.defaultAttributes, ...data } : this.defaultAttributes)
	}

	/**
	 * Merge the given attributes with
	 * the current ones
	 */
	@action
	set(data: {}): void {
		this.attributes.merge(data)
	}

	/**
	 * Fetches the model from the backend.
	 */
	@action
	fetch({ data, ...otherOptions }: { data?: {} } = {}): Request {
		const { abort, promise } = apiClient().get(this.url("get", data), data, otherOptions) //*.method에 따라 다른 url 호출을 위한 확장

		promise
			.then(data => {
				if (!data) return

				this.set(data)
				this.commitChanges()
			})
			.catch(_error => {}) // do nothing

		return this.withRequest("fetching", promise, abort)
	}

	/**
	 * Saves the resource on the backend.
	 *
	 * If the item has a `primaryKey` it updates it,
	 * otherwise it creates the new resource.
	 *
	 * It supports optimistic and patch updates.
	 */
	@action
	save(attributes?: {}, { optimistic = true, patch = true, keepChanges = false, ...otherOptions }: SaveOptions = {}): Request {
		const currentAttributes = this.toJS()
		const label = this.isNew ? "creating" : "updating"
		const collection = this.collection
		let data

		if (patch && attributes && !this.isNew) {
			data = attributes
		} else if (patch && !this.isNew) {
			data = this.changes
		} else {
			data = { ...currentAttributes, ...attributes }
		}

		let method = this.isNew ? "post" : patch ? "patch" : "put" //*.최적화

		if (optimistic && attributes) {
			this.set(patch ? applyPatchChanges(currentAttributes, attributes) : attributes)
		}

		if (optimistic && collection) collection.add([this])

		const onProgress = debounce(progress => {
			if (optimistic && this.request) this.request.progress = progress
		})

		const { promise, abort } = apiClient()[method](
			this.url(method, data), //*.method에 따라 다른 url 호출을 위한 확장
			data,
			{ onProgress, ...otherOptions },
		)

		promise
			.then(data => {
				if (!data) return

				const changes = getChangesBetween(currentAttributes, toJS(this.attributes))

				runInAction("save success", () => {
					this.set(data)
					this.commitChanges()

					if (!optimistic && collection) collection.add([this])

					if (keepChanges) {
						this.set(applyPatchChanges(data, changes))
					}
				})
			})
			.catch(error => {
				this.set(currentAttributes)

				if (optimistic && this.isNew && collection) {
					collection.remove(this)
				}
			})

		return this.withRequest(["saving", label], promise, abort)
	}

	/**
	 * Destroys the resurce on the client and
	 * requests the backend to delete it there
	 * too
	 */
	@action
	destroy({ data, optimistic = true, ...otherOptions }: DestroyOptions = {}): Request {
		const collection = this.collection

		if (this.isNew && collection) {
			collection.remove(this)
			return new Request(Promise.resolve())
		}

		if (this.isNew) {
			return new Request(Promise.resolve())
		}

		const { promise, abort } = apiClient().del(this.url("del"), data, otherOptions) //*.method에 따라 다른 url 호출을 위한 확장

		if (optimistic && collection) {
			collection.remove(this)
		}

		promise
			.then(_data => {
				if (!optimistic && collection) collection.remove(this)
			})
			.catch(error => {
				if (optimistic && collection) collection.add(this)
			})

		return this.withRequest("destroying", promise, abort)
	}
}

/**
 * Merges old attributes with new ones.
 * By default it doesn't merge arrays.
 */
const applyPatchChanges = (oldAttributes: {}, changes: {}): {} => {
	return deepmerge(oldAttributes, changes, {
		arrayMerge: dontMergeArrays,
	})
}

const getChangedAttributesBetween = (source: {}, target: {}): Array<string> => {
	const keys = union(Object.keys(source), Object.keys(target))

	return keys.filter(key => !isEqual(source[key], target[key]))
}

const getChangesBetween = (source: {}, target: {}): { [key: string]: any } => {
	const changes = {}

	getChangedAttributesBetween(source, target).forEach(key => {
		changes[key] =
			isPlainObject(source[key]) && isPlainObject(target[key]) ? getChangesBetween(source[key], target[key]) : target[key]
	})

	return changes
}
