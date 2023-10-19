module.exports = (dbConnection, Sequelize)=>{
    const Group = dbConnection.define("Group", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        group: {
            type: Sequelize.STRING,
            allowNull: false
        },
        length: {
            type: Sequelize.DECIMAL
        }
    })
    return Group
}