const express = require('express');

const products = express.Router();

const pool = require("../shared/pool");

products.get("/",(req,res)=>{
    var mainCategoryId = req.query.maincategoryid;
    var subCategoryId = req.query.subcategoryid;
    var keyword = req.query.keyword;

    let query = "select * from products";

    if(subCategoryId){
        query += " where category_id = " + subCategoryId;
    }

    if(mainCategoryId){
        query = `select * from categories c INNER JOIN products p ON p.category_id = c.id and c.parent_category_id = ${mainCategoryId}`
    }

    if(keyword){
        query += ` and keywords like '%${keyword}%'`;
    }

    pool.query(query,(err,products)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(products)
        }
    });
}
)

products.get("/:id",(req,res)=>{
    let id = req.params.id;
    pool.query("select * from products where id= " + id, (err,products)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(products)
        }
    })
})

module.exports = [products];