const { db } = require("../db")
const Groups = db.Groups
const { getBaseurl } = require("./helpers")

// CREATE
exports.createNew = async (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({ error: "Required parameter 'name' is missing" })
    }
    const createdGroup = await Groups.create({ ...req.body }, {
        fields: ["name", "Students"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/Groups/${createdGroup.id}`)
        .send(createdGroup)
}
// READ
exports.getAll = async (req, res) => {
    const result = await Groups.findAll({ attributes: ["id", "name"] })
    res.json(result)
}
exports.getById = async (req, res) => {
    const foundGroup = await Groups.findByPk(req.params.id)
    if (foundGroup === null) {
        return res.status(404).send({ error: `Group not found` })
    }
    res.json(foundGroup)
}
// UPDATE
exports.editById = async (req, res) => {
    const updateResult = await Groups.update({ ...req.body }, {
        where: { id: req.params.id },
        fields: ["name", "Students"]
    })
    if (updateResult[0] == 0) {
        return res.status(404).send({ error: "Group not found" })
    }
    res.status(202)
        .location(`${getBaseurl(req)}/Groups/${req.params.id}`)
        .send()
}
// DELETE
exports.deleteById = async (req, res) => {
    const deletedAmount = await Groups.destroy({
        where: { id: req.params.id }
    })
    if (deletedAmount === 0) {
        return res.status(404).send({ error: "Group not found" })
    }
    res.status(204).send()
}