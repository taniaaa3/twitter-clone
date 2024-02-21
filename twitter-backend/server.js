require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/db');
const authRoutes = require('./routes/authRoutes');
const tweetRoutes = require('./routes/tweetRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(cors());
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/tweet',tweetRoutes);
app.use('/api/user',userRoutes);

connectDB().then(()=>{
    app.listen(3003,()=>{
        console.log("SERVER HAS STARTED ON PORT 3003");
    })
})


