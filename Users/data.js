let users = [
    {id:1,name:"Bob",password:'1234',group:"GALpe20"},
    {id:2,name:"jebediah",password:'0987654321',group:"MELpe22"},
    {id:3,name:"martin",password:'b_phi<ibh',group:"TARpe21"},
    {id:4,name:"Hannes",password:'säsn',group:"TARpe21"}
]

exports.getAll = () => {
    return data.map(g => { return { "id": g.id, "name": g.name , "group": g.group} })
}
exports.getById = (id) => {
    return data.find((thing) => thing.id == parseInt(id))
}
exports.create = (newUser) => {
    const newId = Math.max(...data.map((thing) => thing.id)) + 1
    newUser.id = newId
    data.push(newUser)
    return newUser
}
exports.edit = (modifiedUser) => {
    var toBeUpdated = this.getById(modifiedUser.id)
    if (toBeUpdated === undefined) {
        return
    }
    updatedUser = { ...toBeUpdated, ...modifiedUser }
    return updatedUser
}

exports.delete = (id) => {
    var toBeDeleted = this.getById(id)
    if (toBeDeleted === undefined) {
        return
    }
    data = data.filter((e) => toBeDeleted.id != e.id)
    return toBeDeleted
}