import mongoose from "mongoose"
 
export async function connect(){
    try{
        mongoose.connect("mongodb+srv://Asus:$UM!T376@cluster0.vvhlsc0.mongodb.net/")
        const connection = mongoose.connection
        connection.on('connected', ()=>{
            console.log('MongoDB connected');
        })
        connection.on('error', (err)=>{
            console.log('connection error ,  please make sure db is up and running: ' +err);
            process.exit()
        })
    }
    catch(error)
    {
        console.log("Something went wrong");
        console.log(error);
    }
}