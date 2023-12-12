const { db } = require("../db")
const UserSchools = db.UserSchools
const { getBaseurl } = require("./helpers")

// CREATE
exports.createNew = async (req, res) => {
    if (!req.body.SchoolId || !req.body.Director || !req.body.UserId) {
        return res.status(400).send({ error: "One or all required parameters are missing" })
    }
    const UserSchools = await UserSchools.create(req.body, {
        fields: ["SchoolId", "Director","UserId"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/UserSchools/${UserSchools.id}`)
        .json(UserSchools)
}
// READ
exports.getAll = async (req, res) => {
    const result = await UserSchools.findAll({
        include: [db.schools, db.users]
    })
    res.json(result)
}
exports.getById = async (req, res) => {
    const FoundSchool = await UserSchools.findByPk(req.params.id)
    if (UserSchools === null) {
        return res.status(404).send({ error: `UserSchool not found` })
    }
    res.json(FoundSchool)
}
// UPDATE
exports.editById = async (req, res) => {
    const updateResult = await UserSchools.update({ ...req.body }, {
        where: { id: req.params.id },
        fields: ["SchoolId", "Director","UserId"]
    })
    if (updateResult[0] == 0) {
        return res.status(404).send({ error: "School not found" })
    }
    res.status(202)
        .location(`${getBaseurl(req)}/Schools/${req.params.id}`)
        .send()
}
// DELETE
exports.deleteById = async (req, res) => {
    const deletedAmount = await UserSchools.destroy({
        where: { id: req.params.id }
    })
    if (deletedAmount === 0) {
        return res.status(404).send({ error: "School not found" })
    }
    res.status(204).send()
} 