import express, { Express } from 'express';
import dotenv from 'dotenv';
import * as database from './Config/database';
import clientRouters from './Routers/Client/index.Router';
import session from 'express-session';
import flash from 'express-flash';
import cors from 'cors';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import adminRouter from './Routers/Admin/index.Router';
import { systemConfig } from './Config/config';
import path from 'path';
dotenv.config();
database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3001;

app.set("views", `${__dirname}/Views`);
app.set('view engine', 'pug');
app.locals.prefixAdmin = systemConfig.prefixAdmin; //global variable

app.use(methodOverride('_method'));
// app.use(methodOverride((req, res) => {
//   if (req.body && typeof req.body._method === 'string' && ['PATCH'].includes(req.body._method.toUpperCase())) {
//       return req.body._method;
//   }
// }));


//tinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

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
adminRouter(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});