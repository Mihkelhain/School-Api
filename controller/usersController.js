const users = require("../users/data")
const schools = require("../schools/data")
//create
exports.createNew = (req,res) => {
    if (!req.body.name || !req.body.group) {
        return res.status(400).send({error:"One or both paramaters are not filled or the wrong type of data"})
    }
    const createdUser = users.create({
    
        name: req.body.name,
        group:req.body,group
    })
    res.status(201)
        .location(`${getBaseurl(req)}/users/${createdUser.id}`)
        .send(createdUser)
    function getBaseurl(request) {
        return request.connection && request.connection.encrypted ? "https" : "http" + "://" + request.headers.host

    }
}

exports.createSchool = (req,res) => {
    if (!req.body.name || !req.body.director) {
        return res.status(400).send({error:"One or both paramaters are not filled or the wrong type of data"})
    }
    const createdSchool = schools.create({
    
        name: req.body.name,
        group:req.body,director
    })
    res.status(201)
        .location(`${getBaseurl(req)}/Schools/${createdSchool.id}`)
        .send(createdSchool)
    function getBaseurl(request) {
        return request.connection && request.connection.encrypted ? "https" : "http" + "://" + request.headers.host

    }
}
//read
exports.getAll = (req, res) => {
    res.send(users.getAll())
}

app.get("/Schools",(req, res) => {
     res.send(schools.getAll())
 })


exports.getById = (req, res) => {
    const foundthing = users.getById(req.params.id)
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
    if (users.delete(req.params-id) === "undefined") {
        return res.status(400).send({error:"The user is not found"})
    }
    res.status(204).send()
}