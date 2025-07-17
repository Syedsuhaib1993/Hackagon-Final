import express  from 'express';
import { Login, Signup, Verifyotp } from '../controller/user.controller.js';

const AuthRoutes = express.Router()

AuthRoutes.post("/signup",Signup)
AuthRoutes.post("/login",Login)
AuthRoutes.post("/verify",Verifyotp)


export default AuthRoutes;