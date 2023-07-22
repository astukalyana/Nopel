
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";

const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use("/user", userRouter);

const CONNECTION_URL = 'mongodb://astukalyana:gabton122114@ac-6xdqbdy-shard-00-00.hg0qqwo.mongodb.net:27017,ac-6xdqbdy-shard-00-01.hg0qqwo.mongodb.net:27017,ac-6xdqbdy-shard-00-02.hg0qqwo.mongodb.net:27017/?ssl=true&replicaSet=atlas-13t4xf-shard-0&authSource=admin&retryWrites=true&w=majority';
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error.message} did not connect`)); 

mongoose.set('useFindAndModify', false);