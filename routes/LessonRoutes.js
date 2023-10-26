const LessonsController = require("../controllers/LessonsController.js")

module.exports = (app) =>{
    app.route("/lessons")
    .get(LessonsController.getAll)
    .post(LessonsController.createNew) //create
    
    app.route("/lessons/:id") 
    .get(LessonsController.getById) // read
    .put(LessonsController.editById) // post
    .delete(LessonsController.deleteById) // delete
    }