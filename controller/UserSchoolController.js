const { db } = require("../db")
const UserSchools = db.UserSchools
const { getBaseurl } = require("./helpers")

// CREATE
exports.createNew = async (req, res) => {
    if (!req.body.Name || !req.body.Director) {
        return res.status(400).send({ error: "One or all required parameters are missing" })
    }
    const CreatedSchool = await UserSchools.create(req.body, {
        fields: ["Name", "Director"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/Schools/${CreatedSchool.id}`)
        .json(CreatedSchool)
}
// READ
exports.getAll = async (req, res) => {
    const result = await UserSchools.findAll({
        include: [db.Schools, db.players]
    })
    res.json(result)
}
exports.getById = async (req, res) => {
    const FoundSchool = await UserSchools.findByPk(req.params.id)
    if (FoundSchool === null) {
        return res.status(404).send({ error: `Game not found` })
    }
    res.json(FoundSchool)
}
// UPDATE
exports.editById = async (req, res) => {
    const updateResult = await UserSchools.update({ ...req.body }, {
        where: { id: req.params.id },
        fields: ["name", "Director"]
    })
    if (updateResult[0] == 0) {
        return res.status(404).send({ error: "School not found" })
    }
    res.status(204)
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