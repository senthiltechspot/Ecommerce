const { Product, Category } = require("../models")
const validateCategoryRequest = (req, res, next) => {

    if (!req.body.name) {
        res.status(400).send({ message: "Name of Category cannot be empty" });
        return;
    }
    next();
}
const valideteProductRequest = (req, res, next) => {
    if (!req.body.name || req.body.cost) {
        res.status(400).send({ message: "Name or Cost of Product cannot be empty" });
        return;
    }
    if (!req.body.categoryId) {
        res.status(400).send({ message: "Name of Category id cannot be empty" });
        return;
    }
    Category.findByPk(req.body.categoryId)
        .then(category => {
            if (!category) {
                res.status(400).send({ message: `category id passed:${req.body.categoryId} is not available` });
                return;
            }
            next();
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || "Something Went Worng" });
        })

}

const validateCategoryPassed = (req, res, next) => {
    const categoryId = parseInt(req.params.categoryid)
    if (!categoryId) {
        res.send(400).send({ message: "Category Id is not passed or invalid" });
    }
    Category.findByPk(categoryId)
        .then(category => {
            if (!category) {
                res.status(400).send({ message: `category id passed:${req.params.categoryid} is not available` });
                return;
            }
            next();
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || "Something Went Worng" });
        })
}


const validateCategoryAndProductPassed = (req, res, next) => {

    const categoryId = parseInt(req.params.categoryid);
    const productId = parseInt(req.params.productid);

    if (!categoryId) {
        res.status(400).send({ message: "Category Id is not passed or it's invalid" });
    }


    if (!productId) {
        res.status(400).send({ message: "ProductId Id is not passed or  it's invalid" });
    }


    Category.findByPk(categoryId)
        .then(category => {

            if (!category) {
                res.status(400).send({ message: `category id passed : ${req.params.categoryid} is not available` });
                return;
            }

            Product.findByPk(productId)
                .then(product => {

                    if (!product) {
                        res.status(400).send({ message: `product id passed : ${req.params.productid} is not available` });
                        return;
                    }
                    next();
                })
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || "Something went wrong" });
        })


}
module.exports = {
    validateCategoryRequest: validateCategoryRequest,
    valideteProductRequest: valideteProductRequest,
    validateCategoryPassed,
    validateCategoryAndProductPassed

}