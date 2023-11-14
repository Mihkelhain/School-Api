const { db } = require("../db")
const schools = db.schools
const { getBaseurl } = require("./helpers")

// CREATE
exports.createNew = async (req, res) => {
    if (!req.body.name || !req.body.director) {
        return res.status(400).send({ error: "One or all required parameters are missing" })
    }
    const createdSchool = await schools.create(req.body, {
        fields: ["name","director"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/schools/${createdSchool.id}`)
        .json(createdSchool)
}
// READ
exports.getAll = async (req, res) => {
    const result = await schools.findAll({ attributes: [ "id","name","director"] })
    res.json(result)
}
exports.getById = async (req, res) => {
    const foundschool = await schools.findByPk(req.params.id)
    if (foundschool === null) {
        return res.status(404).send({ error: `school not found` })
    }
    res.json(foundschool)
}
// UPDATE
exports.editById = async (req, res) => {
    const updateResult = await schools.update({ ...req.body }, {
        where: { id: req.params.id },
        fields: ["id","name", "director"]
    })
    if (updateResult[0] == 0) {
        return res.status(404).send({ error: "School not found" })
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
        return res.status(404).send({ error: "School not found" })
    }
    res.status(204).send()
}