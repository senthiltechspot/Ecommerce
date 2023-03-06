
const { Product, Category, Sequelize } = require("../models");
const Op= Sequelize.Op;


exports.create = (req, res) => {

    if(!req.isAdmin){
        return res.status(403).send({message:"OOPS! you are unauthorized to perform this task"});
    }


    const {name,description,cost,categoryId}=req.body;
    const product = {name,description,cost,categoryId};

    Product.create(product)
    .then(product=>{
        res.status(201).send(product);
    })
    .catch((err)=>{
        res.status(500).send({message:err.message || "Something went wrong"});
    })
}

// GET localhost:8080/ecomm/api/v1/products?minCost=80000
// GET localhost:8080/ecomm/api/v1/products?maxCost=80000
// GET localhost:8080/ecomm/api/v1/products?minCost=60000&maxCost=80000
exports.findAll = (req, res) => {
    console.log(req.user);
    const {name,minCost,maxCost,page,size} = req.query;

    const limit = size?parseInt(size):15;
    const offset= page?page*limit:0;

    if(name){
        productsPromise=Product.findAll({
            where:{
                name:name
            },
            limit:limit,
            offset:offset
        })    
    }
    else if(minCost && maxCost){

        productsPromise=Product.findAll({
            where:{
            cost:{
                [Op.gte]:minCost,
                [Op.lte]:maxCost
            }},
            limit:limit,
            offset:offset
        })
    }
    else if(minCost){
        productsPromise=Product.findAll({
            where:{
            cost:{
                [Op.gte]:minCost            
            }
        },
        limit:limit,
        offset:offset
        })

    }
    else if(maxCost){
        productsPromise=Product.findAll({
            where:{
            cost:{
                [Op.lte]:maxCost           
             }
        }, limit:limit,
        offset:offset
        })
    }
    else{
        productsPromise=Product.findAll({
            limit:limit,
            offset:offset
        });
    }
  
    productsPromise
    .then(products=>{
        res.send(products)
    })
    .catch((err)=>{
        res.status(500).send({message:err.message || "Something went wrong"});
    })
}


exports.findOne = (req, res) => {
    const productId = req.params.id;

    Product.findByPk(productId)
        .then((product) => {
            if (!product) {
                res.status(400).send({ message: `Product with id: ${productId} doesn't exists` });
            }

            res.send(product);
        })
        .catch((err) => {
            res.status(500).send({ message: "Something Went Worng" });
        })
}

exports.update = (req, res) => {
    const productId = req.params.id;

    const { name, description, cost } = req.body;
    const product = {};
    if (name) {
        product.name = name;
    }
    if (description) {
        product.description = description;
    }
    if (cost) {
        product.cost = cost;
    }
    Product.update(product, {
        where: { id: productId }
    })
        .then((updatedproduct) => {
            res.send({ message: `${updatedproduct} records Updated Sucessfully` });
        })
        .catch((err) => {
            res.status(500).send({ message: "Something Went Worng" });
        })
}

exports.delete = (req, res) => {
    const productId = req.params.id;

    Product.destroy({
        where: {
            id: productId
        }
    })
        .then((data) => {
            res.send({ message: "Deleted Sucessfully" });
        })
        .catch((err) => {
            res.status(500).send({ message: "Something Went Worng" });
        })
}


exports.getallproductbycategoryid = (req, res) => {
    Product.findAll({
        where: {
            categoryId: req.params.categoryid
        }
    })
        .then(products => {
            res.send(products);
        })
        .catch((err) => {
            res.status(500).send({ message: "Something went wrong while getting products for given categroy Id" });
        })
}


exports.findproductundercategory = (req, res) => {
    Product.findAll({
        where: {
            categoryId: req.params.categoryid,
            id: req.params.productid
        }
    })
        .then(product => {
            res.send(product);
        })
        .catch((err) => {
            res.status(500).send({ message: "Something went wrong while getting products for given categroy Id" });
        })
}
