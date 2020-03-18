
# ../app.sh


PROJECT_NAME=$(grep "applicationName" ../app.json | sed 's/.*:.\s*\"//' | sed 's/\".*//')
APPLICATION_ID=$(grep "applicationId" ../app.json | sed 's/.*:.\s*\"//' | sed 's/\".*//')
echo $PROJECT_NAME
echo $APPLICATION_ID
