import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import auth from './routes/auth.js';
import events from './routes/events.js'
import { connectDB } from './db/config.js';


const app = express();

connectDB();


app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/events', events);



app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo en puerto ${process.env.PORT}`);
});
