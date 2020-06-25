const {Router} = require("express")
const Image = require("../models").image

const router = new Router()

router.get("/", async (request, response) =>{
    console.log("Got a request on /image", request.body)
    const limit = Math.min( [request.query.limit, 30  ])
    const offset = request.query.offset  
    const images = await Image.findAll({limit, offset})
    response.json({images})
} )

router.post("/", async (request, response) =>{
    console.log("Got a post request on /image", request.body)
    try{
        const demoImg = await Image.create({title: "some demo title", url: "someurl.com/mountain.png"})
        response.send("it works for image")
    }
    catch(err){
        console.log("err", err)
        response.send("inserting img didn't")
    }
} )

module.exports =  router