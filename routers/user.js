const {Router} = require("express")
const router = new Router()
const User = require("../models").user
const bcrypt = require("bcrypt")

router.get("/", (request, response) =>{
    console.log("Got a request on /user", request.body)
    response.send("it also works for users")
} )


router.post("/", async (request, response) => {
    console.log("Got a post request on /user", request.body)
    //prevent this from happening when there is no password or name or.. .....
    const {email, password, fullName} = request.body
    if(!email || !password || !fullName){
        return response.send("missing some info! please supply email, pass, name")
    }
    try{
    
        const encryptedPassword =  bcrypt.hashSync( password,  10)
        const newUser = await User.create({email, password: encryptedPassword, fullName}) 

        const user =  {...newUser.dataValues}
        delete user.password
        response.json(user)

    }catch(err){
        response.send("something went wrong")
    }

    


}) 




module.exports =  router