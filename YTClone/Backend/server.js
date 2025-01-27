import express, { Router } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './View/Routes.js';
import bodyParser from 'body-parser';


mongoose.connect("mongodb+srv://hrushikesh2003:klausyt2003@ytclone.w4d9a.mongodb.net/")


const app = express();
let port = process.env.PORT || 9000
app.use(express.json());
app.use(bodyParser.json());

app.use(cors());

app.listen(port, () => {
  console.log('Server is running on port 9000');
});



routes(app);



