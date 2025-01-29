import mongoose from 'mongoose';

export const connect = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        console.log("connect to database successfully");
    } catch (error) {
        console.log(error);
        console.log("connect error");
    }

}