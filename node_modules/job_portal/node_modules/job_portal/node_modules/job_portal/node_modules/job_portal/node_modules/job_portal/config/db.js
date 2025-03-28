import mongoose from "mongoose";
const MONGO_URL="mongodb://localhost:27017/jobportal"

const connectDB=async()=>{
    try{
          const conn=await mongoose.connect(MONGO_URL);
          console.log(`Connected to mongodb database ${mongoose.connection.host}`);
          
    }
    catch(error){
console.log(`Mongodb error ${error}`);

    }
}

export default connectDB;