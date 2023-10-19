const LessonsController = require("../controllers/LessonsController.js")

module.exports = (app) =>{
    app.route("/LessonsController")
    .get(LessonsController.getALL)
    .post(LessonsController.createNew) //create
    .post(LessonsController.createSchool)
    
    app.route("/LessonsController/:id") 
    
    .get(LessonsController.getById) // read
    .put(LessonsController.editById) // post
    .delete(LessonsController.deleteById) // delete
    }