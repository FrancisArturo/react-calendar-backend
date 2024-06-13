import { connect } from "mongoose";


export const configConnection = {

    url: process.env.DB_CNN,
    options: {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        dbName: process.env.DB_NAME,
    }
}


export const connectDB = async() => {
    try {
        await connect(configConnection.url, configConnection.options);
        console.log("Database connected");
    } catch (error) {
        console.log(error);
        throw new Error("Error connecting to database");
    }
}