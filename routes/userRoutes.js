const userController = require("../controller/userController.js")
module.exports = (app) => {
    app.route("/Users")
        .get(userController.getAll)
        .post(userController.createNew)      // Create
    app.route("/Users/:id")
        .get(userController.getById)         // Read
        .put(userController.editById)        // Update
        .delete(userController.deleteById)   // Delete
}