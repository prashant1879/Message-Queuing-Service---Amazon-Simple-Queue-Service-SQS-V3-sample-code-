
---

# AWS SQS Node.js Example

This repository contains an example Node.js application demonstrating how to interact with Amazon Simple Queue Service (SQS) using the AWS SDK for JavaScript (v3).

## Prerequisites

Before running the application, make sure you have the following prerequisites installed:

- Node.js (version 20+ or higher)
- AWS account with access to SQS
- AWS credentials (access key ID and secret access key)

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/prashant1879/Amazon-Simple-Queue-Service-AWS-SQS-V3-NodeJS-sample-code.git
   ```

2. Install dependencies:

   ```bash
   cd Amazon-Simple-Queue-Service-AWS-SQS-V3-NodeJS-sample-code
   npm install
   ```

3. Set up AWS credentials:

   Replace the placeholders `XXXXXX` with your AWS access key ID and secret access key in the `index.js` file.

## Usage

To run the example application, execute the following command:

```bash
node index.js
```

This will send a message to an SQS queue, retrieve the message, update its visibility, and then delete it.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
