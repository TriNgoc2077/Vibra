import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as database from './Config/database';
import Topic from './Models/topic.Model';

dotenv.config();
database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3001;

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', async (req: Request, res: Response) => {
    const topics = await Topic.find({ deleted: false });
    res.render('client/pages/topics/index', { topics: topics });
})
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});