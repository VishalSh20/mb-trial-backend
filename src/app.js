import express from "express";
import cors from "cors"
import { getMediaUploadURL } from "./controllers/upload.controller.js";
import { getImages } from "./controllers/images.controller.js";
import { getVideos } from "./controllers/videos.controller.js";

import {S3Client} from "@aws-sdk/client-s3";
export const s3Client = new S3Client({
    region: "eu-north-1",
    credentials:{
        accessKeyId:process.env.AWS_CLIENT_ACCESS_KEY_ID,
        secretAccessKey:process.env.AWS_CLIENT_SECRET_ACCESS_KEY
    }
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/api/upload",getMediaUploadURL);
app.get("/api/images",getImages);
app.get("/api/videos",getVideos);

export {app};