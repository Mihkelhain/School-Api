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
    await sequelize.sync({ force: true }) // Erase evevryhting and recreate
}

module.exports = { db, sync }