const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.CUSTOMERS_TABLE; // Ensure to set this in Lambda's environment variables

exports.handler = async (event) => {
  const userEmail = event['body-json'].email; // Adjust according to the exact structure of your API Gateway event

  // Add the email to DynamoDB
  const params = {
    TableName: tableName,
    Item: {
      email: userEmail,
      createdAt: new Date().toISOString()
    }
  };

  await dynamoDb.put(params).promise();
  
  // You can return a response to API Gateway if needed
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Email saved successfully' }),
  };
};
