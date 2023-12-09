//传递相关的ipfs依赖操作
import { create } from "kubo-rpc-client";
import fs from 'fs';

import dotenv from 'dotenv';
dotenv.config(".env");
//抽象此处的接口方法
const ipfs=create(new URL(process.env.THEIPFSURI));


export async function uploadTheFileToIpfs(filePath){
    const file=fs.readFileSync(filePath);
    const FileResult=await ipfs.add(
    {
        path:filePath,
        content:file
    }
    )
    return FileResult; 
}

