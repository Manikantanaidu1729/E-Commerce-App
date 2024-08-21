const express = require('express');

const productCategories = express.Router();

const pool = require("../shared/pool");

productCategories.get("/",(req,res)=>{
            pool.query('select * from categories',(err,categories)=>{
                if(err){
                    res.status(500).send(err);
                }
                else{
                    res.status(200).send(categories)
                }
            });
        }
)

module.exports = [productCategories];