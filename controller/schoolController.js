const { db } = require("../db")
const schools = require("../schools/data")
const { getBaseurl } = require("./helpers")

// CREATE
exports.createNew = (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({ error: "Required parameter 'name' is missing" })
    }
    const createdschool = schools.create({
        name: req.body.name
    })
    res.status(201)
        .location(`${getBaseurl(req)}/schools/${createdschool.id}`)
        .send(createdschool)
}
// READ
exports.getAll = async (req, res) => {
    const result = await schools.getAll({ attributes: [ "id","name","Director"] })
    res.json(result)
}
exports.getById = (req, res) => {
    const foundschool = schools.getById(req.params.id)
    if (foundschool === undefined) {
        return res.status(404).send({ error: `school not found` })
    }
    res.send(foundschool)
}
// UPDATE
exports.editById = async (req, res) => {
    const updateResult = await schools.update({ ...req.body }, {
        where: { id: req.params.id },
        fields: ["Name", "Director"]
    })
    if (updateResult[0] == 0) {
        return res.status(404).send({ error: "Player not found" })
    }
    res.status(202)
        .location(`${getBaseurl(req)}/schools/${req.params.id}`)
        .send()
}

// DELETE
exports.deleteById = async (req, res) => {
    const deletedAmount = await schools.destroy({
        where: { id: req.params.id }
    })
    if (deletedAmount === 0) {
        return res.status(404).send({ error: "Player not found" })
    }
    res.status(204).send()
}