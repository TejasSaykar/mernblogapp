const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`MONGO GOT CONNECTED`);
    } catch (error) {
        console.log(`Error while connecting to database : ${error}`);
    }
}

module.exports = connectDb;