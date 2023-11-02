const { db } = require("../db")
const GroupLessons = db.GroupLessons
const { getBaseurl } = require("./helpers")

// CREATE
exports.createNew = async (req, res) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({ error: "One or all required parameters are missing" })
    }
    const createdLesson = await GroupLessons.create(req.body, {
        fields: ["name", "price"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/Lessons/${createdLesson.id}`)
        .json(createdLesson)
}
// READ
exports.getAll = async (req, res) => {
    const result = await GroupLessons.findAll({
        include: [db.Lessons, db.players]
    })
    res.json(result)
}
exports.getById = async (req, res) => {
    const foundLesson = await GroupLessons.findByPk(req.params.id)
    if (foundLesson === null) {
        return res.status(404).send({ error: `Lesson not found` })
    }
    res.json(foundLesson)
}
// UPDATE
exports.editById = async (req, res) => {
    const updateResult = await GroupLessons.update({ ...req.body }, {
        where: { id: req.params.id },
        fields: ["name", "price"]
    })
    if (updateResult[0] == 0) {
        return res.status(404).send({ error: "Lesson not found" })
    }
    res.status(204)
        .location(`${getBaseurl(req)}/Lessons/${req.params.id}`)
        .send()
}
// DELETE
exports.deleteById = async (req, res) => {
    const deletedAmount = await GroupLessons.destroy({
        where: { id: req.params.id }
    })
    if (deletedAmount === 0) {
        return res.status(404).send({ error: "Lesson not found" })
    }
    res.status(204).send()
}