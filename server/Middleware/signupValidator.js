const { User, ROLES } = require("../models");

const Validemailandusername = (req, res, next) => {
    const { username, email } = req.body;

    const checkUserName = User.findOne({
        where: {
            username: username
        }
    });

    const checkEmail = User.findOne({
        where: {
            email: email
        }
    });

    Promise.all([checkUserName, checkEmail])
        .then((users) => {
            if (users[0] || users[1]) {
                res.status(400).send({ message: "Failed! Username or email is already in use" });
                return;
            }
            next();
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || "Something went wrong" });
        })
}
const checkRoleExist = (req, res, next) => {
    const roles = req.body.roles;
    if (roles) {
        for (let i = 0; i < roles.length; i++) {
            if (!ROLES.includes(roles[i])) {
                res.status(400).send({ message: "Roles dosen't Exist" + roles[i] })
                return;
            }
        }
    }
    next();
}
module.exports = {
    Validemailandusername,
    checkRoleExist

}