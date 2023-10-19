module.exports = (dbConnection, Sequelize)=>{
    const Lesson = dbConnection.define("Lesson", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        length: {
            type: Sequelize.DECIMAL
        }
    })
    return Lesson
}