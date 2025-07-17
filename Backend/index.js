import express from 'express';
import cors from 'cors';
import  dotenv  from 'dotenv';
import ConnectDB from './src/config/Db.js';
import AuthRoutes from './src/routes/user.routes.js';
import ImageRoutes from './src/routes/image.routes.js';
import FormRouter from './src/routes/form.routes.js';

const app = express()
const port = 8080
app.use(express.json())

app.use(cors())

dotenv.config()
ConnectDB()

// AUTHROUTES API
app.use('/api',AuthRoutes)

// IMAGEROUTES API
app.use('/api',ImageRoutes)

// FROMROUTES API
app.use("/api",FormRouter)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})