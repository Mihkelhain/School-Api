const Group = require("./Group")
const Lesson = require("./Lesson")

module.exports = (dbConnection, Sequelize, Lesson, Group) => {
    const GroupLessons = dbConnection.define("GroupLessons", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        playtime: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        GameId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Lesson,
                key: "id"
            }
        },
        PlayerId: {
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