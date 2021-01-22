const express = require('express');
const app = express();
app.use((req,res,next)=>{
next();  
});

app.use((req,res,next)=>{
    next();     
});

app.use((req,res,next)=>{
   res.send("<h3>This is Third Middleware</h3>");        
});

app.listen(3000);        