const {Sequelize} = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE, {
host: process.env.DATABASE,
dialect: "mariadb"
})
//HjMiaKissing
try{
    sequelize.authenticate().then(() => {
        console.log('connection has been estabhlised')
    });
} catch(error) {
    console.error('unable to connect to the database:', error)
}
const db = {}
db.sequelize = Sequelize
db.connection = sequelize
db.timetables = require("./models/Timetable")