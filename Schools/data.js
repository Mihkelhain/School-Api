let Schools = [
    {id:1,name:"TTHK",Director:'juqim'},
    {id:2,name:"TSG",Director:'Kaarel'},
    {id:3,name:"Tartu ülikool",Director:'El ninio'},
    {id:4,name:"Nõmme gümnaasium",Director:'Kisno nõmme'}
]

exports.getAll = () => {
    return Schools.map(g=> {return {"id":g.id,"name":g.name,"Director":g.Director}})
}

exports.getById = (id) => {
    return data.find((thing) => thing.id == parseInt(id))
}

exports.create = (NewSchool) => {
    const newId = Math.max(...data.map((thing) => thing.id)) + 1 
    NewSchool.id = newId
    data.push(NewSchool)
    return NewSchool
}