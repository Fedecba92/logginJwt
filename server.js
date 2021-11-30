const express = require("express");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");


const app = express();

app.use(helmet());
app.use(express.json());
app.use(compression());

const rateLimitPolicy = rateLimit({
  message: "maximo numero de peticiones intente en 1min",
  max: 10,
  windowMs: 60 * 1000,
});

const users = [
  {
    username: "laura2020",
    password: "laura123",
    nombre : "laura",
    rol: "admin"
  },
  {
    username: "fede2021",
    password: "Federico!",
    nombre: "federico",
    rol: "usuario"
  },
];

//1. proteger todos los endpoints menos el de login usando expressJwt
const secretJwt = "poneralgomuycomplicadocomosupassdecorreo";
app.use(
  expressJwt({
    secret:secretJwt ,
    algorithms: ['HS256'] 
  }).unless({ path: ["/login"] })
);

//2. escribir un endpoint sin auth para retornar JWT (/login)

app.post("/login",(req,res)=> {

    const usernamePost = req.body.username;
    const passwordPost = req.body.password;

    console.log(req.body)

    const existeUsuario = users.find (user => {
        return user.username == usernamePost && user.password == passwordPost
    });

    if ( !existeUsuario ) {

        res.status(401).json( {
                error: "usuario o contrasena invalida"
        })
    }else {

        console.log(existeUsuario);

        const token = jwt.sign({
            username: existeUsuario.username,
            rol: existeUsuario.rol,
            nombre: existeUsuario.nombre
        },secretJwt , {expiresIn: "1m"});
        res.json(token);

    }
})

//3. endpoint prueba

app.get ("/seguro", (req,res) => {

    res.json({
        data: "data muy segura de " + req.user.username
    })
})

app.listen(3001, () => {
  console.log("iniciado en 3001");
});

