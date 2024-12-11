import {ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../app.js";

export async function getVideos(req,res){
    try{
    const {page=1,limit=10} = req.query;

    // listing command
    const start = (page-1)*limit;
    const listCommand = new ListObjectsV2Command({
        Bucket:process.env.AWS_BUCKET,
        Prefix:`uploads/video/`,
    });
    
    // get the list of videos
    const listingResponse = await s3Client.send(listCommand);
    let response = {
        delimiter:listingResponse.Delimiter,
        keyCount:listingResponse.KeyCount,
        page,
        limit,
        pageCount:Math.ceil(listingResponse.KeyCount/limit),
        contents:listingResponse.Contents?.filter((_,index)=>(index>=start && index<start+limit))
    };

    // get url for the videos
    let urlList = []
    if(response.contents){
    for(let content of response.contents){
        const Key = content.Key;
        const urlCommand = new GetObjectCommand({
            Bucket:process.env.AWS_BUCKET,
            Key:Key
        })
        const url = await getSignedUrl(s3Client,urlCommand);
        urlList.push(url);
    }}

    let i = 0;
    response.contents = response.contents.map(content => ({...content,url:urlList[i++]}));
    res.status(200).json(response);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}