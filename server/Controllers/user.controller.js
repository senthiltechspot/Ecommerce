const { User, Role, Sequelize, ROLES } = require("../models");
const bcrypt = require("bcrypt");

exports.findAll = (req, res) => {

    User.findAll()
        .then(users => {
            res.send(users)
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || "Something went wrong" });
        })
}
exports.delete = (req, res) => {
    const UserId = req.params.id;

    User.destroy({
        where: {
            id: UserId
        }
    })
        .then((data) => {
            res.send({ message: "Deleted Sucessfully" });
        })
        .catch((err) => {
            res.status(500).send({ message: "Something Went Worng" });
        })
}

exports.update = async (req, res) => {
    if (!req.roles.includes('admin')) {
        return res.status(403).send({ message: "OOPS! you are unauthorized to perform this task" });
    }
    try {

        const userId = req.params.id;

        const { username, email, password } = req.body;

        const user = {};

        if (username) {
            user.username = username;
        }

        if (email) {
            user.email = email;
        }

        if (password) {
            user.password = bcrypt.hashSync(password, 8);
        }

        await User.update(user, { where: { id: userId } })

        res.status(200).send({ message: ` user updated successfully}` });

    } catch (err) {
        res.status(500).send({ message: "Something went wrong" });
    }

}