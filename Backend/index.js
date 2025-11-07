import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { productRoutes, cartRoutes, userRoutes } from './routes/routes.js';

// creating express instance
const app = express();

// creating local API Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running at PORT no. ${PORT}`);
});


// Creating middleware for parsing json data and across origin control access
app.use(cors());
app.use(express.json());


// calling product and cart routes function
productRoutes(app);
cartRoutes(app);
userRoutes(app);

// Connecting with local MongoDB server
// mongoose.connect('mongodb://localhost:27017/nexora')
mongoose.connect('mongodb+srv://akbansal765:9ZLkSADVpWFOxPNf@cluster0.wxkk1bi.mongodb.net/nexora')
.then(() => {
    console.log('MongoDB Database Connected Successfully')
})
.catch((err) => {
    console.log('Connection Failed', err.message)
})