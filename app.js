const express = require("express");
const app = express();
const port = 3000;

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
});

// --------------------------------------------------------------------------

const categories = require('./json/categories.json');
const categories_info = require('./json/category-info.json');
const products = require('./json/products');
const product_info = require('./json/product-info');
const product_comment = require('./json/product-comment');
const cart = require('./json/cart');

// --------------------------------------------------------------------------

app.get("/categories", (req, res) => {
    res.send(categories);
});

app.get("/category-info", (req, res) => {
    res.send(categories_info);
});

app.get("/products", (req, res) => {
    res.send(products);
});

app.get("/product-info", (req, res) => {
    res.send(product_info);
});

app.get("/product-comment", (req, res) => {
    res.send(product_comment);
});

app.get("/cart", (req, res) => {
    res.send(cart);
});

// --------------------------------------------------------------------------

app.listen(port, () => {
    console.log("Escuchando solicitudes a http://localhost:" + port);
});



