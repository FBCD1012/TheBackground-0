//引入新的模块
import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import { uploadTheFileToIpfs} from './IPFS-upload.js';
import { mint } from './NFT-Minter.js';
import dotenv from 'dotenv';
dotenv.config(".env");



const app=express();
app.set('view engine','ejs');
//使用相关的操作理解，如何实现其的操作时必要的
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload())

app.get('/',(req,res)=>{
    res.render("TheInputIndex.ejs");  
})

app.post('/upload',(req,res)=>{
    const title=req.body.title;
    const description=req.body.description;
    //获取相关的索引操作
    const file=req.files.file;
    const fileName=file.name;
    const filePath="files/"+fileName;
    file.mv(filePath, async (err)=>{
        if(err){
            console.log(err);
            res.status(500).send("error occured");
        }
         //直接进行文件的上传
        const result=await uploadTheFileToIpfs(filePath);
        //封装METADATA
        const metaData={
            title:title,
            description:description,
            file:process.env.LOCALURITOIPFS+"/ipfs/"+result.cid.toString()
        }
        await mint(process.env.THEUSERADDRESS,metaData.file)
        res.json(
            {
              message:"The NFT was successfully uploaded ！",
              metadata:metaData 
            }
         )
    })
})


app.listen(process.env.PORT ,()=>{
    console.log('The Server is running.....')
})