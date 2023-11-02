const GroupsController = require("../controller/GroupController.js")
module.exports = (app) => {
    app.route("/Groups")
        .get(GroupsController.getAll)
        .post(GroupsController.createNew)      // Create
    app.route("/Groups/:id")
        .get(GroupsController.getById)         // Read
        .put(GroupsController.editById)        // Update
        .delete(GroupsController.deleteById)   // Delete
}