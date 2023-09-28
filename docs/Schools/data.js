let Schools = [
    {id:1,name:"TTHK",Director:'juqim',group:"GALpe20"},
    {id:2,name:"TSG",Director:'Kaarel',group:"MELpe22"},
    {id:3,name:"Tartu ülikool",Director:'El ninio',group:"TARpe21"},
    {id:4,name:"Nõmme gümnaasium",Director:'Kisno nõmme',group:"TARpe21"}
]

exports.getAll = () => {
    return Schools.map(g=> {return {"id":g.id,"name":g.id,"group":g.id}})
}

exports.getById = (id) => {
    return data.find((thing) => thing.id == parseInt(id))
}

exports