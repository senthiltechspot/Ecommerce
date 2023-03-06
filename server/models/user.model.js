module.exports = (Sequelize, sequelize) => {

    const User = sequelize.define('users', {
        
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password:{
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        tableName: 'user'

    }
    );
    return User;
};