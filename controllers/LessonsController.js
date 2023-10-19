const { db } = require("../db")
const Lessons = db.Lessons
const { getBaseurl } = require("./helpers")

// CREATE
exports.createNew = async (req, res) => {
    if (!req.body.lesson || !req.body.lenght) {
        return res.status(400).send({ error: "One or all required parameters are missing" })
    }
    const createdLessons = await Lessons.create(req.body, {
        fields: ["Lesson", "Lenght"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/Lessons/${createdLessons.id}`)
        .json(createdLessons)
}
// READ
exports.getAll = async (req, res) => {
    const result = await Lessons.findAll({ attributes: ["id", "name"] })
    res.json(result)
}
exports.getById = async (req, res) => {
    const foundLessons = await Lessons.findByPk(req.params.id)
    if (foundLessons === null) {
        return res.status(404).send({ error: `Lesson not found` })
    }
    res.json(foundLessons)
}
// UPDATE
exports.editById = async (req, res) => {
    console.log("Update:", req.params, req.body);
    const updateResult = await Lessons.update({ ...req.body }, {
        where: { id: req.params.id },
        fields: ["Lesson", "Lenght"]
    })
    if (updateResult[0] == 0) {
        return res.status(404).send({ "error": "Lesson not found" })
    }
    res.status(204)
        .location(`${getBaseurl(req)}/Lessons/${req.params.id}`)
        .send()
}
// DELETE
exports.deleteById = async (req, res) => {
    const deletedAmount = await Lessons.destroy({
        where: { id: req.params.id }
    })
    if (deletedAmount === 0) {
        return res.status(404).send({ error: "Lesson not found" })
    }
    res.status(204).send()
}