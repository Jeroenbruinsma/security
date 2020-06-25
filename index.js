const express = require("express")
const port = process.env.PORT || 4000
const imageRouter =  require("./routers/image")
const userRouter = require("./routers/user")
const authRouter = require("./auth/router")

const app = express()

app.use(express.json())//bodyparser

app.listen(port, console.log("server running", port))


app.get("/", (request, response)=> {
    console.log("got here!")
    response.send("Server running")
    
})
app.use(authRouter)
app.use("/image" ,imageRouter)
app.use("/user", userRouter)
