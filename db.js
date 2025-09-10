//connect to mongo db
const mongoose = require('mongoose');

async function connection() {
    const connection = await mongoose.connect('mongodb+srv://charanprabhu26:CSAVJ52x1Hn890uf@cluster0.3esikqx.mongodb.net/');
    console.log("connected to db");

    
}

module.exports = connection;