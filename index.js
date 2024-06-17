import path from 'path';
import express from 'express';
import __dirname from './dirname.js'; 
import 'dotenv/config';
import cors from 'cors';
import auth from './routes/auth.js';
import events from './routes/events.js'
import { connectDB } from './db/config.js';



const app = express();

connectDB();


app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/api/auth', auth);
app.use('/api/events', events);

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo en puerto ${process.env.PORT}`);
});
