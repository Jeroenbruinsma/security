const {Router} = require("express")
const User = require('../models').user
const router = new Router()
const bcrypt = require("bcrypt")
const { toJWT } = require("./jwt")


router.post("/login", async (request, response) => {
    console.log("somebody tries to login", request.body)
    try{
        const {email, password} = request.body
        if(!email || !password){
            return response.status(400).send("missing email or password")
        }

        const user = await User.findOne({where: {email}}) 
        
        if(!user){
            response.status(400).send("user unknown")
        }

        const passwordsMatch = bcrypt.compareSync(password , user.dataValues.password)
        if(passwordsMatch){
            const token = toJWT({userId: user.id})
            response.json( {token: token })
        }else{
            response.status(401).send("password was wrong")
        }
        
        
    }catch(err){
        console.log(err)
        response.send("something went wrong")
    }

})


module.exports =  router