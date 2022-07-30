const express = require("express");
const {Client} = require("pg")
// const mongoose = require("mongoose");
const redis = require("redis");

//app init
const PORT = process.env.PORT || 4000;
const app = express();


//connect to redis
const REDIS_PORT = 6379;
const REDIS_HOST = "redis";
const redisClient = redis.createClient({url: `redis://${REDIS_HOST}:${REDIS_PORT}`});

redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("connect", () => console.log("Redis Client is connected"));
redisClient.connect();


// connect to mongoose db
const DB_USER = "root";
const DB_PASSWORD = "example"
const DB_PORT = 27017;
const DB_HOST = "mongo";

const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

mongoose.connect(URI)
    .then(() => console.log("connected"))
    .catch(() => console.log("Failed"));

// connect to mongoose db
// const DB_USER = "root";
// const DB_PASSWORD = "example"
// const DB_PORT = 5432;
// const DB_HOST = "postgres";

// const URI = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// const client = new Client({
//     connectionString: URI,
// });
// client
//   .connect()
//   .then(() => console.log("connected postgres"))
//   .catch(() => console.log("Failed postgres"));

app.get("/", (req, res) => {
    redisClient.set('products','products...')
    res.send("<h1>Hello Docker!</h1>")
});
app.get('/data', async (req, res) => {
    const products = await redisClient.get('products');
    res.send(`<h1>The products </h1><h2>${products}</h2>`)
})
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
