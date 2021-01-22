
const Product = require('../models/products');
const Cart = require('../models/cart');  
exports.getAddProducts =  (req ,res, next)=>{             
    res.render('admin/edit_product',  {  
    doctittle:'Add Product',
    path:'/admin/edit_product',  
    editMode : false                   
   });                   
}

exports.postAddProducts = (req ,res, next)=>{  
    const body = req.body;
    const title = body.title
    const imageUrl = body.imageUrl;
    const price = body.price;
    const description= body.description;
    const product = new  Product(null,title,imageUrl,price,description);    
    product.save().then(() =>{   
        res.redirect('/');                   
    }).catch(err => console.log(err));                 
}

exports.getEditProducts =  (req ,res, next)=>{
const editMode = req.query.edit;  
 const productId = req.params.productId; 
 Product.findById(productId).then(([rows]) => {
    res.render('admin/edit_product',  {  
        doctittle:'Edit Product',  
        path:'/admin/edit_product',  
        prods : rows[0],
        editMode : editMode                
       }); 
 }).catch(err => console.log(err));                      
}

exports.editSaveProduct = (req,res,next) =>{
    const updatedTitle = req.body.title;
    const updatedimageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedProductId = req.body.productId;
    const product = new  Product(updatedProductId,updatedTitle,updatedimageUrl,updatedPrice,updatedDescription);
    product.save().then(() => {
    res.redirect('/admin/products');             
    }).catch(err => console.log(err));  
}

exports.getProducts = (req,res,next) =>{
    Product.fetchAll().then(([rows]) => {
        res.render('admin/products',    
        {doctittle:'Admin Product List',    
        prods : rows,     
        path:'/admin/products'  
       }); 

    }).catch(err => console.log(err));
}
exports.getPostDeleteProduct = (req,res,next) =>{
    const productId = req.body.productId;
    Product.deleteById(productId).then(() => {
        Cart.deleteProduct(productId).then(() => {  
            res.redirect('/admin/products');         
        }).catch(delerr => console.log(delerr));    
    }).catch(err => console.log(err));  
}
 
