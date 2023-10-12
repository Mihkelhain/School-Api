const Timetables = require("../Timetables/data")
//create
exports.createNew = (req,res) => {
    if (!req.body.Group || !req.body.Lesson) {
        return res.status(400).send({error:"One or both paramaters are not filled or the wrong type of data"})
    }
    const createdTimetables = Timetables.create({
    
        Group: req.body.Group,
        Lesson:req.body,Lesson
    })
    res.status(201)
        .location(`${getBaseurl(req)}/Timetables/${createdTimetables.id}`)
        .send(createdTimetables)
    function getBaseurl(request) {
        return request.connection && request.connection.encrypted ? "https" : "http" + "://" + request.headers.host

    }
}

//read
exports.getAll = (req, res) => {
    res.send(Timetables.getAll())
}

exports.getById = (req, res) => {
    const foundthing = Timetables.getById(req.params.id)
    if (foundthing == undefined)
     {
        return res.status(404).send({error:"not found"})
    }
    res.send(foundthing)
}
//update
exports.editById = (req,res) =>  {

}
//delete
exports.deleteById = (req,res) => {
    if (Timetables.delete(req.params-id) === "undefined") {
        return res.status(400).send({error:"The user is not found"})
    }
    res.status(204).send()
}