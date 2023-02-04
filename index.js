// declare express app and app.listen
const express = require('express')
const app= express()
  //Datastore is a function class?
  const Datastore = require('nedb')

let portNum= Math.floor(Math.random()*3000+1000)
app.listen(portNum, ()=> console.log( "listening at "+portNum))

//serve static content
app.use(express.static('public'))

//post request from client
// via fetch()  -routing- JSON Parse - POST with fetch

   //app use()
app.use(express.json({ limit: "1mb"}))

const database = new Datastore('datafile.db')
const worksDb = new Datastore('works.db')
database.loadDatabase()
worksDb.loadDatabase()

const dbData=[]

function getDB(){
  database.find(  {} , function (err, docs)
    {  
//   console.log(docs)
              })
}

getDB()

//console.log(docs)

insertToDb()




  //define route and function
    //app.post(route, func)
                      //func(request, respons) =>
app.post("/myroute", (request, response)=>{
  const data= request.body //body takes the info 
  response.json({
    status: "success",
    your_artist: data.artist,
  })
})
//                  const dataFromServer={content:"lots of data"}
//the GET in server
app.get("/myroute",
       (request, response) =>          
         {     
           //mongodb query find(  , fnc   )
         database.find({}, (err,dcs)=>  {
           if (err){
             response.end()
             return
           }
           //response.send() fnc
          response.send(dcs)
             
           })
         
         
       }//fnc  
        )//GET

app.post('/works', (request, response)=>{
  const doc = request.body
  response.json({
    status: "doc  entered"})
  worksDb.insert(doc)
})

app.get('/works',
       (request,response)=>{
         // err comes first!!!!!!
         worksDb.find( {}, (err,dcs)=>{ 
           if (err) {
             console.log("error server")
             response.end()
             return             
           }//err
           //response.send
           response.send(dcs)
         })
       }
       )//app.get



function insertToDb(){ 
    database.insert({_id:101,name:"Dionisio Aguado",Birth: 1784  ,Death:1849, url:"https://upload.wikimedia.org/wikipedia/commons/2/20/Dionisio_Aguado_001.jpg"} )
  database.insert({_id:102,name:"Matteo Carcassi",Birth: 1792  ,Death:1853, url:"https://upload.wikimedia.org/wikipedia/commons/e/ef/Matteo_Carcassi_%281792-1853%29.jpg"}  )//database.insert
  database.insert({_id:103,name:'Ferdinando Carulli',Birth: 1770, Death: 1841, url:"https://upload.wikimedia.org/wikipedia/commons/c/cc/Ferdinando_Carulli.jpg"})
}