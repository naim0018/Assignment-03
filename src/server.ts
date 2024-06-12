import { Server } from "http";
import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";

let server:Server;

async function main (){
    try {
        await mongoose.connect(config.db as string)
        server = app.listen(config.port,()=>{
            console.log(`App running on : ${config.port}`)
        })
    } catch (error) {
        console.log(error)
    }
}


main()

process.on('unhandledRejection',()=>{
    console.log("Unhandled rejection detected, shutting down server")
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
})

process.on('uncaughtException',()=>{
    console.log("Uncaught exception detected, shutting down server")
    process.exit(1)
})
