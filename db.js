const { Sequelize } = require("sequelize");
const School = require("./models/School");
const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mariadb",
    define: {
        timestamps: true
    },
    logging: console.log
})
try {
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    });
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
const db = {}
db.Sequelize = Sequelize
db.connection = sequelize

db.lessons = require("./models/Lesson")(sequelize, Sequelize)
db.groups = require("./models/Group")(sequelize, Sequelize)
db.GroupLessons = require("./models/GroupLessons")(sequelize, Sequelize, db.lessons, db.groups)

db.lessons.belongsToMany(db.groups, {through: db.GroupLessons})
db.groups.belongsToMany(db.lessons, {through: db.GroupLessons})
db.lessons.hasMany(db.GroupLessons)
db.groups.hasMany(db.GroupLessons)
db.GroupLessons.belongsTo(db.lessons)
db.GroupLessons.belongsTo(db.groups)
db.users = require("./models/User")(sequelize, Sequelize)
db.schools = require("./models/School")(sequelize, Sequelize)
db.UserSchools = require("./models/UserSchool")(sequelize, Sequelize, db.users, db.schools)

db.schools.belongsToMany(db.users, { through: db.UserSchools })
db.users.belongsToMany(db.schools, { through: db.UserSchools })
db.schools.hasMany(db.UserSchools)
db.users.hasMany(db.UserSchools)
db.UserSchools.belongsTo(db.schools)
db.UserSchools.belongsTo(db.users)






sync = async () => {
    if (process.env.DROP_DB) {
        console.log("Begin DROP")
        await db.connection.query('SET FOREIGN_KEY_CHECKS = 0')
        console.log("Checks disabled")
        await db.connection.sync({ force: true })
        console.log('Database synchronised.');
        await db.connection.query('SET FOREIGN_KEY_CHECKS = 1')
        console.log("Checks enabled")

        const [School, CreatedS] = await db.schools.findOrCreate({
            where: {
                name: "TTHK"
            },
            defaults: {
                name: "TTHK",
                Director: "Paul Alekand",
            }
        })
        console.log("school created: ", CreatedS)
        

        const [user, CreatedU] = await db.users.findOrCreate({
            where: {
                name: "Hannes Malter"
            },
            defaults: {
                name: "Hannes Malter"
            }
        })
        console.log("user created: ", CreatedU)
        const [UserSchool, CreatedUS] = await db.UserSchools.findOrCreate({
            where: {
                id: 1
            },
            defaults: {
                userId: user.id,
                schoolId: School.id,
            }
        })
        console.log("UserSchool created: ", CreatedUS)
    }
    else {
        await db.connection.sync({ alter: true }) // Alter existing to match the model
    }
}

module.exports = { db, sync }
