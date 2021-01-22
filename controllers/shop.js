const Product = require('../models/products');
const Cart = require('../models/cart');


exports.getproducts = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/product_list',
                {
                    doctittle: 'All Products',
                    prods: rows,
                    path: '/products'
                });
        })
        .catch(err => console.log(err));
}

exports.getproduct = (req, res, next) => {
    const prodid = req.params.productid;
    Product.findById(prodid)
        .then(([rows]) => {
            res.render('shop/product_details',
                {
                    doctittle: 'Product Details',
                    prods: rows[0],
                    path: '/products'
                });
        }
        )
        .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll().then(([rows, fieldData]) =>
        res.render('shop/index',
            {
                doctittle: 'Shop',
                prods: rows,
                path: '/'
            })
    ).catch(err =>
        console.log(err)
    );
}

exports.getCart = (req, res, next) => {
    Cart.getCart().then((cartdata) => {
        res.render('shop/cart',
            {
                doctittle: 'Your Cart',
                path: '/cart',
                products: cartdata[0]
            });
    }).catch(err => console.log(err));
}

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId).then(([productrows]) => {
        Cart.getCartById(productId).then(([cartrows]) => {
            Cart.addProduct(productId, productrows[0], cartrows).then(() => {
                res.redirect('/cart');
            });

        })
    }).catch(err => console.log(err));
}
exports.postDeleteCart = (req, res, next) => {
    const productId = req.body.productId;
    Cart.deleteProduct(productId).then(() => {
        res.redirect('/cart');
    }).catch(err => console.log(err));
    /* Product.findById(productId, (prdData) => {
         Cart.deleteProduct(productId, prdData.price);
         res.redirect('/cart');
     })*/
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders',
        {
            doctittle: 'Your Orders',
            path: '/orders'
        });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        doctittle: 'Your Checkout',
        path: '/checkout'
    });
}
