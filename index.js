import bodyParser from 'body-parser'
import express from 'express'
import { connectDB } from './db.js'
import { PORT } from './config.js'
import { userRouter } from './src/routes/userRoute.js';
import session from 'express-session';
const app = express();
//Parsear el cuerpo de la solicitud para que pueda ser leída
//Parsear a JSON las solicitudes 
app.use(bodyParser.json())
//parsear el cuerpo de la solicitud para que pueda ser leida
app.use(bodyParser.urlencoded({extended: true}))

//middleware para el uso de la sesion
app.use(
    session({
        secret: "secret", //es un dato/clave secreta de nuestro sistema que usa la libreria para firmar y verificar
        resave: false,//evita que la session se vuelva a guardar si no hay datos
        saveUninitialized: false,// evita que se guarde una session no inicializada
    })
)
    


//rutas
app.use("/api/user", userRouter)

//conexion a la DB
connectDB()
app.listen(PORT, () =>{
    console.log(`Server running at 8080`)
    console.log('DataBase Connected')
})

// Middlewares > entre dos sistemas
