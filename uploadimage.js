const express = require('express');
const app = express();
const port = 2000;
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images');
    },
    filename:(req,file,cb) => {
        cb(null,Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage:storage});

app.set("view engine","ejs");

app.get('/upload',(req,res)=>{
   res.render("upload");
});

app.post('/upload',upload.single("image"),(req,res)=>{
    res.send('Image uploaded');
    
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});        