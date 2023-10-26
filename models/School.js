module.exports = (dbConnection, Sequelize) => {
    const School = dbConnection.define("School", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Director: {
            type: Sequelize.STRING
        }
    })
    return School
} 