let data = [
    { id: 1, name: "Tarpe21", studentCount: 16 },
    { id: 2, name: "Iot", studentCount:24  },
    { id: 3, name: "Mvcpe20", studentCount: 12 },
    { id: 4, name: "Tatge22", studentCount: 18 },
    { id: 5, name: "SoT", studentCount: 5 }
]

exports.getAll = () => {
    return data.map(sapi => { return { "id": sapi.id, "name": sapi.name, "studentCount": sapi.studentCount } })
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