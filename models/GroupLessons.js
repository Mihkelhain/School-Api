const Group = require("./Group")
const Lesson = require("./Lesson")

module.exports = (dbConnection, Sequelize, Lesson, Group) => {
    const GroupLessons = dbConnection.define("GroupLessons", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        LessonId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Lesson,
                key: "id"
            }
        },
        GroupId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Group,
                key: "id"
            }
        }
    })
    return GroupLessons
}