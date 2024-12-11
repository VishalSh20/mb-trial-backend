import { PutObjectCommand } from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../app.js";

export async function getMediaUploadURL(req,res){
    try{
    const {filename,size,type} = req.query;

    if([filename,size,type].some(field => !field))
        return res.status(400).json({error:"All fields are required"});

    if(!type.startsWith("image/") && !type.startsWith("video/"))
        return res.status(400).json({error:"Invalid media type - only images and videos are allowed"});

    const extension = type.substring(type.indexOf("/")+1);
    const actualFileName = `${filename}-${Date.now()}.${extension}`
    const command = new PutObjectCommand({
        Bucket:process.env.AWS_BUCKET,
        Key:`uploads/${type}/${actualFileName}`,
        ContentType:type,
    });
    const postingURL = await getSignedUrl(s3Client,command);
    res.status(200).json({url:postingURL});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}