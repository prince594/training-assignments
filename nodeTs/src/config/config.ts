import dotenv from "dotenv";

dotenv.config();
// MongoDB Atlas Configurations
const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  autoIndex: false,
  retryWrites: false,
};
const MONGO_USERNAME = process.env.mongoUserName;
const MONGO_PASSWORD = process.env.mongoPassword;
const MONGO_HOST = process.env.mongoUrl;
const MONGO = {
  host: MONGO_HOST,
  password: MONGO_PASSWORD,
  username: MONGO_USERNAME,
  options: MONGO_OPTIONS,
  url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}${MONGO_HOST}`,
};
// Node Server Configurations
const SERVER_HOSTNAME = process.env.serverHostName;
const SERVER_PORT = process.env.serverPort;
const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

const JWT = {
  secret: "My-Ultra-secure-Super-Secrert-password",
  expiresIn: "90d",
};
// AWS Configurations
const AWS_CREDINTIALS = {
  AWS_ACCESS_KEY: process.env.awsAccessKey,
  AWS_SECRET_ACCESS_KEY: process.env.awsSecretAccessKey,
  AWS_BUCKET_NAME: "test-file-prince",
};
// NodeMailer Configurations
const MAILER_CREDINTIALS = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
      user: process.env.mailerName,
      pass: process.env.mailerPassword
  }
};

const config = {
  mailer: MAILER_CREDINTIALS,
  aws: AWS_CREDINTIALS,
  mongo: MONGO,
  server: SERVER,
  jwt: JWT,
};

export default config;
