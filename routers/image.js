const {Router} = require("express")
const Image = require("../models").image


const router = new Router()

router.get("/", (request, response) =>{
    console.log("Got a request on /image", request.body)
    response.send("it works for image")
} )

router.post("/", async (request, response) =>{
    console.log("Got a post request on /image", request.body)
    try{
        const demoImg = await Image.create({title: "some demo title", url: "someurl.com/mountain.png"})
        console.log("what is demoImg", demoImg)
        response.send("it works for image")
    }
    catch(err){
        console.log("err", err)
        response.send("inserting img didn't")
    }

} )


module.exports =  router