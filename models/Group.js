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
        Students: {
            type: Sequelize.INTEGER
        }
    })
    return Group
}