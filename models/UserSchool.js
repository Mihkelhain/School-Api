module.exports = (dbConnection, Sequelize, User, School) => {
    const UserSchool = dbConnection.define("UserSchool", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Director: {
            type: Sequelize.INTEGER,
        },
        SchoolId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: School,
                key: "id"
            }
        },
        UserId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id"
            }
        }
    })
    return UserSchool
}