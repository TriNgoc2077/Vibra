import express, { Express } from 'express';
import dotenv from 'dotenv';
import * as database from './Config/database';
import clientRouters from './Routers/Client/index.Router';
dotenv.config();
database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3001;

app.set('views', './views');
app.set('view engine', 'pug');
//Client routers
clientRouters(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});