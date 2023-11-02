module.exports = (dbConnection, Sequelize) => {
    const School = dbConnection.define("School", {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        director: {
            type: Sequelize.STRING
        }
    })
    return School
} 