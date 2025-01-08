import express, { Router } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './View/Routes.js';
import bodyParser from 'body-parser';


mongoose.connect("mongodb+srv://hrushikesh2003:klausyt2003@ytclone.w4d9a.mongodb.net/")


const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use(cors());

app.listen(9000, () => {
  console.log('Server is running on port 9000');
});



routes(app);



