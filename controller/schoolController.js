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
exports.getAll = (req, res) => {
    res.send(schools.getAll())
}
exports.getById = (req, res) => {
    const foundschool = schools.getById(req.params.id)
    if (foundschool === undefined) {
        return res.status(404).send({ error: `school not found` })
    }
    res.send(foundschool)
}
// UPDATE
exports.editById = (req, res) => {

}


// DELETE
exports.deleteById = (req, res) => {
    if (schools.delete(req.params.id) === undefined) {
        return res.status(404).send({ error: "Shool not found" })
    }
    res.status(204).send()
}