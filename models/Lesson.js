module.exports = (dbConnection, Sequelize)=>{
    const Lesson = dbConnection.define("Lesson", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        lessonStart: {
            type: Sequelize.STRING,
            allowNull: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        length: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
        
    })
    return Lesson
}