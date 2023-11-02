const GroupController = require("../controllers/GroupController.js")
module.exports = (app) => {
    app.route("/Groups")
        .get(GroupController.getAll)
        .post(GroupController.createNew)      // Create
    app.route("/Groups/:id")
        .get(GroupController.getById)         // Read
        .put(GroupController.editById)        // Update
        .delete(GroupController.deleteById)   // Delete
}