const fs = require("fs");
const http = require("http")

// let data = fs.readFileSync("./data.txt","utf-8");

// console.log(data);

const Server = http.createServer((req,res)=>{
    if(req.url=="/home"){
        let data = fs.readFileSync("./data.txt","utf-8");
        console.log(data);
        res.end(data);
    }else{
        res.end("other page");
    }
})

Server.listen(8080,()=>{
    console.log("server started");
})