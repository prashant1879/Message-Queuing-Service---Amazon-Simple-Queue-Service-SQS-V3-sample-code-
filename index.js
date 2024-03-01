const {
  DeleteMessageCommand, 
  SQSClient, 
  ReceiveMessageCommand, 
  ChangeMessageVisibilityCommand,
  SendMessageCommand
} = require('@aws-sdk/client-sqs');
var randomstring = require("randomstring");

const awsCustomerId = '00000000000';
const awsQueue = 'sample-queue.fifo';
const awsRegion = 'eu-west-1';

const queueUrl = `https://sqs.${awsRegion}.amazonaws.com/${awsCustomerId}/${awsQueue}`;
const visibilityTimeout = 60;

const sqsClient = new SQSClient({
  credentials: {
    accessKeyId:"XXXXXX",
    secretAccessKey:"XXXXXX"
  },
  endpoint: `https://sqs.${awsRegion}.amazonaws.com`,
  region: `${awsRegion}`,
  apiVersion: '2012-11-05'
});

async function sendMessage() {
  const command = new SendMessageCommand({
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify({
      key1: "value1",
      key2: "value2",
    }),  
    MessageDeduplicationId: randomstring.generate(7),
    MessageGroupId: randomstring.generate(7),
  });

  try {
    const response = await sqsClient.send(command);
    console.log(">>> sendMessage RESPONSE>>>", response)
  } catch (error) {
    console.log(">>> sendMessage ERROR>>>", error)      
    throw new Error(error);
  }
}


async function getMessage() {
    const command = new ReceiveMessageCommand({
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 1,
    });
    
    try {
      const response = await sqsClient.send(command);
      console.log(">>> getMessage RESPONSE>>>", response.Messages)
      return response.Messages[0].ReceiptHandle;
    } catch (error) {
      console.log(">>> getMessage ERROR>>>", error)      
      throw new Error(error);
    }
  }

  
async function updateMessageVisibility(
    queueUrl,
    receiptHandle,
    visibilityTimeout
  ){
    const command = new ChangeMessageVisibilityCommand({
      QueueUrl: queueUrl,
      ReceiptHandle: receiptHandle,
      VisibilityTimeout: visibilityTimeout,
    });

    try {
      const response = await sqsClient.send(command);
      console.log(">>> updateMessageVisibility RESPONSE>>>", response)
    } catch (error) {
      console.log(">>> updateMessageVisibility ERROR>>>", error)      
      throw new Error(error);
    }
}
  
async function deleteMessage(receiptHandle) {
    const command = new DeleteMessageCommand({
      QueueUrl: queueUrl,
      ReceiptHandle: receiptHandle,
    });
 
    try {
      const response = await sqsClient.send(command);
      console.log(">>> deleteMessage RESPONSE>>>", response)
    } catch (error) {
      console.log(">>> deleteMessage ERROR>>>", error)      
      throw new Error(error);
    }
}

const fn = async()=>{
  await sendMessage();
  let receiptHandle = await getMessage();
  await deleteMessage(receiptHandle);
}

fn();
