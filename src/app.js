import express from "express";
import cors from "cors"
import { getMediaUploadURL } from "./controllers/upload.controller.js";
import { getImages } from "./controllers/images.controller.js";
import { getVideos } from "./controllers/videos.controller.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/api/upload",getMediaUploadURL);
app.get("/api/images",getImages);
app.get("/api/videos",getVideos);

export {app};