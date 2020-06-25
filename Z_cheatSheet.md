
"development": {
    "dialect": "postgres",
    "operatorsAliases": "0",
    "url": "postgres://nqgveffr:pGTs8YolHBq2KdMfMYQsXo8qHH6-bUNQ@kandula.db.elephantsql.com:5432/nqgveffr"
  },


const app = express();
const jsonParser = express.json();
CORSS
app.use(jsonParser);

app.use("/users", userRouter);
app.use("/images", imageRouter);


npx sequelize-cli model:generate --name user --attributes email:string,password:string,fullName:string
npx sequelize-cli model:generate --name image --attributes title:string,url:string


router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({
      message: "Please supply a valid email and password",
    });
  } else {
    // 1. find user based on email address
const user = await User.findOne({
  where: {
    email: email,
  },
});
if (!user) {
  res.status(400).send({
    message: "User with that email does not exist",
  });
}
// 2. use bcrypt.compareSync to check the password against the stored hash
else if (bcrypt.compareSync(password, user.password)) {
  // 3. if the password is correct, return a JWT with the userId of the user (user.id)
  const jwt = toJWT({ userId: user.id });
  res.send({
    jwt,
  });
} else {
  res.status(400).send({
    message: "Password was incorrect",
  });
}
 
  }
});


-------------

const { toData } = require("./jwt");
const User = require("../models").user;

const authMiddleware = async (req, res, next) => {
  try {
    // check if there is an authorization header.
    // cut the token out of there, somehow.
    const authHeader =
      req.headers.authorization && req.headers.authorization.split(" ");

    if (authHeader && authHeader[0] === "Bearer" && authHeader[1]) {
      // happy path

      const data = toData(authHeader[1]);
      console.log("decrypted token", data);

      const user = await User.findByPk(data.userId);

      req.user = user;

      next();
    } else {
      res.status(401).send("Wrong credentials or missing auth header");
    }

    // console.log("auth", authHeader);
  } catch (e) {
    console.log(e.message);
    res.status(401).send(e.message);
  }
};

module.exports = authMiddleware;