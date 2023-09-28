let users = [
    {id:1,name:"Bob",password:'1234',group:"GALpe20"},
    {id:2,name:"jebediah",password:'0987654321',group:"MELpe22"},
    {id:3,name:"martin",password:'b_phi<ibh',group:"TARpe21"},
    {id:4,name:"Hannes",password:'säsn',group:"TARpe21"}
]

exports.getAll = () => {
    return users.map(g=> {return {"id":g.id,"name":g.id,"group":g.id}})
}

exports.getById = (id) => {
    return data.find((thing) => thing.id == parseInt(id))
}

exports