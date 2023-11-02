let data = [
    {id: 1, LessonsStart: '9:30', Lesson:"Programming"},
    {id: 2, LessonsStart: '8:30', Lesson:"Biology"},
    {id: 3, LessonsStart: '12:45', Lesson:"P.E"},
    {id: 4, LessonsStart: '8:30', Lesson:"Math"}
]

exports.getAll = () => {
    return data.map(sapi => { return { "id": sapi.id, "lessonStart": sapi.lessonsStart ,"lesson": sapi.lesson, "lenght": sapi.lenght } })
}
exports.getById = (id) => {
    return data.find((thing) => thing.id == parseInt(id))
}
exports.create = (newLesson) => {
    const newId = Math.max(...data.map((thing) => thing.id)) + 1
    newLesson.id = newId
    data.push(newLesson)
    return newLesson
}
exports.delete = (id) => {
    var toBeDeleted = this.getById(id)
    if (toBeDeleted === undefined) {
        return
    }
    data = data.filter((e) => toBeDeleted.id != e.id)
    return toBeDeleted
}