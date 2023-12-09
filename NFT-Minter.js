import { ethers,JsonRpcProvider } from "ethers";
import fs from "fs";
import dotenv from 'dotenv';
dotenv.config(".env");

//注意相关合约的对应理解操作，如何对其中的操作进行关键理解是需要非常小心的！
//地址到相关图片地址
export async function mint(to ,uri){
    //开启相关服务
    const provider = new JsonRpcProvider('http:localhost:8545');
    //获取用户签名
    const Singer=await provider.getSigner();
    const contractAddress=process.env.CONTRACTADDRESS;
    const abi=JSON.parse(fs.readFileSync("./abi/NFT-abi.json"));
    //合约地址，传输协议，签名
    const contract=new ethers.Contract(contractAddress,abi,Singer);
    const result=await contract.safeMint(to,uri);
    console.log(result.hash);
} 
