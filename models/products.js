const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '../', 'data/', 'products.json');
const Cart = require('./cart');
const db = require('../util/database');

const getproductsfromfile = (cb) => {
    fs.readFile(p, (err, filecontent) => {
        if (err) {
            // return [];
            cb([]);
        }
        cb(JSON.parse(filecontent));
    })

}

module.exports = class Product {

    constructor(id, title, imageurl, price, desc) {
        this.id = id;
        this.title = title;
        this.imageurl = imageurl;
        this.price = price;
        this.desc = desc;
    }


    save() {
        if (this.id) {
            return db.execute('UPDATE products SET title=?,price=?,description=?,imageUrl=? WHERE id=?', [
                this.title, this.price, this.desc, this.imageurl, this.id
            ]);
        } else {
            return db.execute('INSERT INTO products(title,price,description,imageUrl) VALUES(?,?,?,?)', [
                this.title, this.price, this.desc, this.imageurl
            ])
        }
    }
    static deleteById(id) {
        return db.execute('DELETE FROM products WHERE id=?', [id]);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM products');
    }
    static findById(pid) {
        return db.execute('SELECT * FROM products WHERE id = ?', [pid]);
    }
}