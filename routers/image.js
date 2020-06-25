const {Router} = require("express")
const Image = require("../models").image
const auth = require('../auth/middleware')

const router = new Router()

router.get("/", async (request, response) =>{
    console.log("Got a request on /image", request.body)
    const images = await Image.findAll()
    response.json({images})
} )

router.post("/",    async (request, response) =>{
    console.log("Got a post request on /image", request.body)
    console.log("who is posting something?", request.user)
    try{
        const demoImg = await Image.create({title: `some demo title from ${request.user.dataValues.fullName}`, url: "someurl.com/mountain.png"})
        response.send("it works for image")
    }
    catch(err){
        console.log("err", err)
        response.send("inserting img didn't")
    }
} )

module.exports =  router