const { Sequelize } = require("sequelize")
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
db.GroupLessons = require("./models/GroupLessons")(sequelize, Sequelize, db.lessons, db.groups)

db.lessons.belongsToMany(db.groups, {through: db.GroupLessons})
db.groups.belongsToMany(db.lessons, {through: db.GroupLessons})
db.lessons.hasMany(db.GroupLessons)
db.groups.hasMany(db.GroupLessons)
db.GroupLessons.belongsTo(db.lessons)
db.GroupLessons.belongsTo(db.groups)

sync = async () => {
    await sequelize.sync({ force: true }) // Erase all and recreate
    //await sequelize.sync({alter:true}) // Alter existing to match the model
}

module.exports = { db, sync }