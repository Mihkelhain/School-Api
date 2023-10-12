let Timetables = [
    {id: 1, Group:"12", LessonsStart: '9:30', Lesson:"Programming"},
    {id: 2, Group:"5", LessonsStart: '8.30', Lesson:"Biology"},
    {id: 3, Group:"7", LessonsStart: '12.45', Lesson:"P.E"},
    {id: 4, Group:"6", LessonsStart: '8.30', Lesson:"Math"}
]

exports.getAll = () => {
    return Timetables.map(g=> {return {"id":g.id,"Group":g.Group,"LessonsStart":g.LessonsStart,"Lesson":g.Lesson}})
}

exports.getById = (id) => {
    return data.find((thing) => thing.id == parseInt(id))
}

exports.create = (newTimetables) => {
    const newId = Math.max(...data.map((thing) => thing.id)) + 1 
    newTimetables.id = newId
    data.pushnewTimetables
    return newTimetables
}

exports.delete = (deleteTimetables) => {
    var toBeDeleted = this.getById(id)
    if(toBeDeleted === "undefinded") {return}
    data = data.filter((e) =>toBeDeleted.id != e.id)
    return toBeDeleted.id
}