import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app: Express = express();
const port: Number | String = process.env.PORT || 3001;

app.get('/', (req: Request, res: Response) => {
    res.send('Song topics');
})
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});