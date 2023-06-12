import express from 'express'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import path from 'path'
import { users } from './users.js'
import 'dotenv/config'
const app=express()
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
const options = {
    root: path.join("../authdemo1/")
};
app.get("/register",(req,res)=>{
          res.sendFile('index.html',options,(err)=>{
            if(err)console.log(err)
            console.log("registration form")
          })

})
app.post("/register",(req,res)=>{
       const user=req.body
       const token=jwt.sign(req.body,process.env.SECRET_KEY,/*{ algorithm: 'RS256' }*/)
       users.push(token)
       console.log(users)
       res.send('<h3>User Registered</h3>')

})
app.get("/login",(req,res)=>{
    res.sendFile('login.html',options,(err)=>{
        if(err)console.log(err)
        console.log("login form")
      })

})
app.post("/login",(req,res)=>{
    const user=req.body
    users.forEach((e)=>{
     const validation=   jwt.verify(e,process.env.SECRET_KEY)
     if(req.body.username==validation.username && req.body.password==validation.password)
     {
        res.send("user validated")
     }
    
     console.log(validation)
    })
    try
    {
    res.sendStatus(403)
    }
    catch(err)
    {
        console.log("user exists!response already sent ")
    }
})
app.listen(4000,()=>{
    console.log('app listening')
})
