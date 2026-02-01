const Queue = require("bull");
const sendMail = require("../utils/sendMail");

const emailQueue = new Queue("email", {
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
  },
});

emailQueue.process("verifyEmail", async (job) => {
  try {
    await sendMail(job.data.email, job.data.token);
  } catch (error) {
    console.log("email not sent" + error.message);
  }
});

emailQueue.on("completed", (job, result) => {
  console.log(`Job ${job.id} completed`);
});

emailQueue.on("error", (err) => { 
  console.log("Queue Error:", err);
});
module.exports = emailQueue;