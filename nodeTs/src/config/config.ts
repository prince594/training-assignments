import dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    autoIndex: false,
    retryWrites: false
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'princeNewput';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'iamback';
const MONGO_HOST = process.env.MONGO_URL || `@cluster0.gomlq.mongodb.net/iamback?retryWrites=true&w=majority`;

const MONGO = {
    host: MONGO_HOST,
    password: MONGO_PASSWORD,
    username: MONGO_USERNAME,
    options: MONGO_OPTIONS,
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}${MONGO_HOST}`
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const JWT = {
    secret: 'My-Ultra-secure-Super-Secrert-password',
    expiresIn: '90d'
};

const config = {
    mongo: MONGO,
    server: SERVER,
    jwt: JWT
};

export default config;
