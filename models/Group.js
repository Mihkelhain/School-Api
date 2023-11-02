module.exports = (dbConnection, Sequelize)=>{
    const Group = dbConnection.define("Group", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        studentCount: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })
    return Group
}