const express = require("express");
const cors = require("cors");
const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");
const app = express();
app.use(express.json());
app.use(cors());
// Configure SQS Client
const sqsClient = new SQSClient({ region: "your-aws-region" });
const SQS_QUEUE_URL = "your-sqs-queue-url";
app.post("/feedback", async (req, res) => {
  const { name, email, feedback } = req.body;
  const params = {
    QueueUrl: SQS_QUEUE_URL,
    MessageBody: JSON.stringify({ name, email, feedback }),
  };
  try {
    await sqsClient.send(new SendMessageCommand(params));
    res
      .status(202)
      .json({ message: "Feedback received. We will process it shortly." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "System error." });
  }
});
app.listen(3000, () => console.log("DUYTEST---- Server running on port 3000"));
