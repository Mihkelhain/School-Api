const { Sequelize } = require("sequelize");

module.exports = (dbConnection,Sequelize)=>{
    const User = dbConnection.define("User",{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false
        },
        password:{
            type: Sequelize.STRING,
            allowNull: false
        },
        group:{
            type:Sequelize.STRING,
        }
    })
    return User
}