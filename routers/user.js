const {Router} = require("express")

const router = new Router()

router.get("/", (request, response) =>{
    console.log("Got a request on /user", request.body)
    response.send("it also works for users")
} )


module.exports =  router