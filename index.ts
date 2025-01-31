import express, { Express } from 'express';
import dotenv from 'dotenv';
import * as database from './Config/database';
import clientRouters from './Routers/Client/index.Router';
import session from 'express-session';
import flash from 'express-flash';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();
database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3001;

app.set('views', './views');
app.set('view engine', 'pug');
app.use(cors({credentials: true}));
app.use(cookieParser());
app.use(express.static(`${__dirname}/Public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
      secret: 'CNTN', 
      resave: false,
      saveUninitialized: true,
    })
);
app.use(flash());
//Client routers
clientRouters(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});