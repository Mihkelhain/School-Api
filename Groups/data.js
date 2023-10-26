let data = [
    { id: 1, name: "Tarpe21", Students: 16 },
    { id: 2, name: "Iot", Students:24  },
    { id: 3, name: "Mvcpe20", Students: 12 },
    { id: 4, name: "Tatge22", Students: 18 },
    { id: 5, name: "SoT", Students: 5 }
]

exports.getAll = () => {
    return data.map(sapi => { return { "id": sapi.id, "name": sapi.name, "students": sapi.students } })
}
exports.getById = (id) => {
    return data.find((thing) => thing.id == parseInt(id))
}
exports.create = (newGroup) => {
    const newId = Math.max(...data.map((thing) => thing.id)) + 1
    newGroup.id = newId
    data.push(newGroup)
    return newGroup
}
exports.edit = (modifiedGroup) => {
    var toBeUpdated = this.getById(modifiedGroup.id)
    if (toBeUpdated === undefined) {
        return
    }
    updatedGroup = { ...toBeUpdated, ...modifiedGroup }
    return updatedGroup
}

exports.delete = (id) => {
    var toBeDeleted = this.getById(id)
    if (toBeDeleted === undefined) {
        return
    }
    data = data.filter((e) => toBeDeleted.id != e.id)
    return toBeDeleted
}