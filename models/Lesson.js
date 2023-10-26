module.exports = (dbConnection, Sequelize)=>{
    const Lesson = dbConnection.define("Lesson", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        lessonsStart: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Lesson: {
            type: Sequelize.STRING
        },
        length: {
            type: Sequelize.DECIMAL
        }
        
    })
    return Lesson
}