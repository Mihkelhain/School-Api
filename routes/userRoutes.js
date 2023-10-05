const usersController = require("../controller/usersController.js")

module.exports = (app) =>{
app.route("/usersController")
.get(usersController.getALL)
.post(usersController.createNew) //create
.post(usersController.createSchool)

app.route("/usersController/:id") 

.get(usersController.getById) // read
.put(usersController.editById) // post
.delete(usersController.deleteById) // delete
}