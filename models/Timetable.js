module.exports = (dbConnection, Sequelize)=>{
    const Timetable = dbConnection.define("Timetable", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Lesson: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Length: {
            type: Sequelize.DECIMAL
        }
    })
    return Timetable
}