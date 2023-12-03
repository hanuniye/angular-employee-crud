import mongoose from "mongoose";

export const connect = async (conn) => {
    return await mongoose.connect(conn);
}