const { db } = require("../db")
const users = db.users
const { getBaseurl } = require("./helpers")

// CREATE
exports.createNew = async (req, res) => {
    if (!req.body.name || !req.body.group) {
        return res.status(400).send({ error: "One or all required parameters are missing" })
    }
    const createduser = await users.create(req.body, {
        fields: ["id", "name","group"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/users/${createduser.id}`)
        .json(createduser)
}
// READ
exports.getAll = async (req, res) => {
    const result = await users.findAll({ attributes: ["id", "name","group"] })
    res.json(result)
}
exports.getById = async (req, res) => {
    const founduser = await users.findByPk(req.params.id)
    if (founduser === null) {
        return res.status(404).send({ error: `user not found` })
    }
    res.json(founduser)
}
// UPDATE
exports.editById = async (req, res) => {
    console.log("Update:", req.params, req.body);
    const updateResult = await users.update({ ...req.body }, {
        where: { id: req.params.id },
        fields: ["id", "name","group"]
    })
    if (updateResult[0] == 0) {
        return res.status(404).send({ "error": "user not found" })
    }
    res.status(204)
        .location(`${getBaseurl(req)}/users/${req.params.id}`)
        .send()
}
// DELETE
exports.deleteById = async (req, res) => {
    const deletedAmount = await users.destroy({
        where: { id: req.params.id }
    })
    if (deletedAmount === 0) {
        return res.status(404).send({ error: "user not found" })
    }
    res.status(204).send()
}