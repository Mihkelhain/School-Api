module.exports = (dbConnection, Sequelize)=>{
    const Group = dbConnection.define("Group", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Group: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Length: {
            type: Sequelize.DECIMAL
        }
    })
    return Group
}