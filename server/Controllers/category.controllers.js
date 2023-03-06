const { Product, Category } = require("../models");

exports.create = async (req, res) => {

    if (!req.isAdmin) {
        return res.status(403).send({ message: "OOPS! you are unauthorized to perform this task" });
    };
    try {

        const category = { name: req.body.name, description: req.body.description };

        await Category.create(category);

        console.log(`category with name ${category.name} created successfully`);
        res.status(201).send(category);

    } catch (err) {
        res.status(500).semd({ message: "Something went wrong" });
    }


}
exports.getAll = async (req, res) => {
    try {
        const categories = await Category.findAll()
        res.send(categories);

    } catch (err) {
        res.status(500).send({ message: "Something went Wrong" });
    }
}


exports.getOne = (req, res) => {
    const categoryId = req.params.id;

    Category.findByPk(categoryId)
        .then((category) => {
            if (!category) {
                res.status(400).send({ message: `Category with id: ${categoryId} doesn't exists` });
            }

            res.send(category);
        })
        .catch((err) => {
            res.status(500).send({ message: "Something Went Worng" });
        })
}

exports.update = (req, res) => {
    if (!req.roles.includes('admin')) {
        return res.status(403).send({ message: "OOPS! you are unauthorized to perform this task" });
    }

    const categoryId = req.params.id;

    const { name, description } = req.body;

    const category = {};

    if (name) {
        category.name = name;
    }

    if (description) {
        category.description = description;
    }

    Category.update(category, {
        where: { id: categoryId }
    })
        .then((updatedCategory) => {
            res.send({ message: `${updatedCategory[0]} records updated successfully}` });
        })
        .catch((err) => {
            res.status(500).send({ message: "Something went wrong" });
        })
}

exports.delete = (req, res) => {
    if (!req.isAdmin) {
        return res.status(403).send({ message: "OOPS! you are unauthorized to perform this task" });
    }

    const categoryId = req.params.id;

    Category.destroy({
        where: {
            id: categoryId
        }
    })
        .then((data) => {
            res.send({ message: "Successfully deleted the category" });
        })
        .catch((err) => {
            res.status(500).send({ message: "Something went wrong" });
        })
}

exports.getbycategoryid = (req, res) => {
    const categoryId = req.params.id;

    Product.findAll({
        where: {
            categoryid: categoryId
        }
    })
        .then((product) => {
            res.send(product);
        })
        .catch((err) => {
            res.status(500).send({ message: "Something Went Worng" });
        })
}
