const express = require("express")
const port = process.env.PORT || 4000
const imageRouter =  require("./routers/image")
const userRouter = require("./routers/user")
const authRouter = require("./auth/router")
const auth = require("./auth/middleware")
const cors = require("cors")

const app = express()

app.use(express.json())//bodyparser
app.use(cors()) // only needed if you want to make front end! (react)

app.listen(port, console.log("server running", port))


app.get("/", (request, response)=> {
    console.log("got here!")
    response.send("Server running v2.1")
    
})


app.use(authRouter)
app.use("/image" ,auth   ,imageRouter)
app.use("/user", auth , userRouter)
