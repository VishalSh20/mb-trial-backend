import dotenv from "dotenv";
dotenv.config();
import { app } from "./app.js";

const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log("App is listening at ",port);
})
