import mongoose from "mongoose";

mongoose.connect("mongodb+srv://datior:123@datior.greymyk.mongodb.net/alura-node");

let db = mongoose.connection;
export default db;