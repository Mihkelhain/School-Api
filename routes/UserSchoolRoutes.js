const UserSchoolController = require("../controller/UserSchoolController.js")
module.exports = (app) => {
    app.route("/UserSchools")
        .get(UserSchoolController.getAll)
        .post(UserSchoolController.createNew)      // Create
    app.route("/UserSchools/:id")
        .get(UserSchoolController.getById)         // Read
        .put(UserSchoolController.editById)        // Update
        .delete(UserSchoolController.deleteById)   // Delete
}