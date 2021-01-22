const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '../', 'data/', 'cart.json');
const db = require('../util/database');



module.exports = class Cart {
  static addProduct(id, productData, cartData) {
    if (cartData.length > 0) {
      const updatedqty = cartData[0].product_qty + 1;
      const updatePrize = cartData[0].product_prize + productData.price;
      return db.execute('UPDATE cart SET product_qty=?,product_prize=? WHERE product_id=?', [updatedqty, updatePrize, id]);
    } else {
      return db.execute('INSERT INTO cart(product_id,product_title,product_qty,product_prize) VALUES(?,?,?,?)', [productData.id, productData.title, 1, productData.price]);
    }
  }

  static deleteProduct(id) {
    return db.execute('DELETE FROM cart WHERE product_id=?', [id]);
  }

  static getCart(id) {
    return db.execute('SELECT * FROM cart WHERE id > 0');
  }

  static getCartById(id) {
    return db.execute('SELECT * FROM cart WHERE product_id=?', [id]);
  }


};
