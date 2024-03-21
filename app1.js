const express=require('express');
const multer=require('multer');
const { dirname } = require('path');
const app=express();
const port=3000;
//cau hinh multer de luu anh vao thu muc uploads
const storage=multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'uploads');
    },
    filename: (req,file,cb)=>{
        cb(null,file.originalname);
    },
});
const upload=multer({storage});
//route de hien thi form
app.get('/upload',(req,res)=>{
    res.sendFile(__dirname+'/upload.html');
});
//upload anh
app.post('/upload',upload.single('image'),
(req,res)=>{
    res.send('Upload anh thanh cong');
});
//
app.listen(port,()=>{
    console.log('server dang chay o cong 3000');
});
