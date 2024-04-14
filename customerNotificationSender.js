const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-west-2' }); // Use the region appropriate for your SES setup

exports.handler = async (event) => {
  console.log('Event: ', JSON.stringify(event, null, 2));
  
  for (const record of event.Records) {
    // Check for new records
    if (record.eventName === 'INSERT') {
      const newCustomerEmail = record.dynamodb.NewImage.email.S;

      // Email parameters
      const emailParams = {
        Source: 'curciodominic0@gmail.com',
        Destination: {
          ToAddresses: [
            newCustomerEmail
          ],
        },
        Message: {
          Subject: {
            Data: 'New Customer Registration',
          },
          Body: {
            Text: {
              Data: `${newCustomerEmail} is a new customer and is interested in tutoring`,
            },
          },
        },
      };

      try {
        // Send email using AWS SES
        await ses.sendEmail(emailParams).promise();
        console.log('Email sent to owner for new customer:', newCustomerEmail);
      } catch (error) {
        console.error('Error sending email:', error);
      }
    }
  }
};
