let schools = [
    {id:1,name:"TTHK",director: "Paul Alekand"},
    {id:2,name:"TSG",director:"Kaarel"},
    {id:3,name:"Tartu ülikool",director:"El ninio"},
    {id:4,name:"Nõmme gümnaasium",director:"Kisno nõmme"}
]

exports.getAll = () => {
    return data.map(g => { return { "id": g.id, "name": g.name, "director": g.director } })
}
exports.getById = (id) => {
    return data.find((thing) => thing.id == parseInt(id))
}
exports.create = (newSchool) => {
    const newId = Math.max(...data.map((thing) => thing.id)) + 1
    newSchool.id = newId
    data.push(newSchool)
    return newSchool
}
exports.edit = (modifiedSchool) => {
    var toBeUpdated = this.getById(modifiedSchool.id)
    if (toBeUpdated === undefined) {
        return
    }
    UpdatedSchool = { ...toBeUpdated, ...modifiedSchool }
    return UpdatedSchool
}
exports.delete = (id) => {
    var toBeDeleted = this.getById(id)
    if (toBeDeleted === undefined) {
        return
    }
    data = data.filter((e) => toBeDeleted.id != e.id)
    return toBeDeleted
}