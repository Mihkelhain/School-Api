const { db } = require("../db")
const Timetables = db.Timetables
const { getBaseurl } = require("./helpers")

// CREATE
exports.createNew = async (req, res) => {
    if (!req.body.lesson || !req.body.lenght) {
        return res.status(400).send({ error: "One or all required parameters are missing" })
    }
    const createdTimetables = await Timetables.create(req.body, {
        fields: ["Lesson", "Lenght"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/Timetables/${createdTimetables.id}`)
        .json(createdTimetables)
}
// READ
exports.getAll = async (req, res) => {
    const result = await Timetables.findAll({ attributes: ["id", "name"] })
    res.json(result)
}
exports.getById = async (req, res) => {
    const foundTimetables = await Timetables.findByPk(req.params.id)
    if (foundTimetables === null) {
        return res.status(404).send({ error: `Timetable not found` })
    }
    res.json(foundTimetables)
}
// UPDATE
exports.editById = async (req, res) => {
    console.log("Update:", req.params, req.body);
    const updateResult = await Timetables.update({ ...req.body }, {
        where: { id: req.params.id },
        fields: ["Lesson", "Lenght"]
    })
    if (updateResult[0] == 0) {
        return res.status(404).send({ "error": "Timetable not found" })
    }
    res.status(204)
        .location(`${getBaseurl(req)}/Timetables/${req.params.id}`)
        .send()
}
// DELETE
exports.deleteById = async (req, res) => {
    const deletedAmount = await Timetables.destroy({
        where: { id: req.params.id }
    })
    if (deletedAmount === 0) {
        return res.status(404).send({ error: "Timetable not found" })
    }
    res.status(204).send()
}