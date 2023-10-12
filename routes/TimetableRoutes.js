const TimetablesController = require(".../controllers/TimetablesController.js")

module.exports = (app) =>{
    app.route("/usersController")
    .get(TimetablesController.getALL)
    .post(TimetablesController.createNew) //create
    .post(TimetablesController.createSchool)
    
    app.route("/TimetablesController/:id") 
    
    .get(TimetablesController.getById) // read
    .put(TimetablesController.editById) // post
    .delete(TimetablesController.deleteById) // delete
    }