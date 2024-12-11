import dotenv from "dotenv";
dotenv.config();

import {S3Client} from "@aws-sdk/client-s3";
export const s3Client = new S3Client({
    region: "eu-north-1",
    credentials:{
        accessKeyId:process.env.AWS_CLIENT_ACCESS_KEY_ID,
        secretAccessKey:process.env.AWS_CLIENT_SECRET_ACCESS_KEY
    }
});

import { app } from "./app.js";
const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log("App is listening at ",port);
})
