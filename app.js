const express = require('express');
const bodyparser = require('body-parser');  
const path = require('path');  
const app = express();
const rootdir = require('./util/path'); 
const errorpage = require('./controllers/error');   

//const exphandlebars = require('express-handlebars');  

const admindata = require('./routes/admin');  //import router   
const shoprouter  = require('./routes/shop');  
//const db = require('./util/database');  
app.use(express.static('public'));       

app.use(bodyparser.urlencoded({    
    extended: true  
}));
//app.engine('hbs',exphandlebars({layoutsDir:'views/layouts/',defaultLayout:'mainlayouts',extname:'hbs'}));  
//app.set('view engine','hbs');               
//app.set('view engine','pug');  
app.set('view engine','ejs');    
app.set('views', 'views');  

         



/*
db.execute('select * from products').then(result => {    
    console.log(result[0],result[1]);    
}).catch(err => {  
    console.log(err);       
});  */   



app.use(shoprouter);    // Use Router   
app.use('/admin',admindata);   // Use Router with Define Path 
app.use(errorpage.get404);               



app.listen(5000);               