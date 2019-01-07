const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
let Promise = require('promise')
let patient = require('./utiles/patient')

const app = express()

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type")
    res.header('Access-Control-Allow-Methods', 'GET,POST')
    res.header('Access-Control-Allow-Credentials','true')
    res.header("X-Powered-By",'*')
    res.header("Content-Type", "application/json;charset=utf-8")

    next();
}

app.use(allowCrossDomain)
app.use(cookieParser())
app.use(bodyParser.json())

app.get('/getDoctor.json',(req,res)=>{
    patient.getDoctorInfo((result)=>{
        let obj={
            code:0,
            doctor:result,
        }
        res.json(obj)
        
    })
})

app.post('/postUser',(req,res)=>{
    Username=req.body.loginForm.username
    Password=req.body.loginForm.password
    patient.selectUserbyUser(Username,Password,(result)=>{
        if(result!=null){
            let obj={
                code:0,
                username:result.name,
                userId:result.userId,
                //password:result.password,
            }
            res.cookie('username',result.userName,{ expires: new Date(Date.now() + 900000), httpOnly: true , domain: 'localhost'})
            res.json(obj)
        }else{
            let obj={
                code:1,
            }
            res.json(obj)
        }
    })
})

app.post('/selectDoctorById.json',(req,res)=>{
    doctorId=req.body.doctorId
    patient.selectDoctorById(doctorId,(result)=>{
        if(result!=null){
            let obj={
                code:0,
                doctor:result
            }
            res.json(obj)
        }else{
            let obj={
                code:1,
            }
            res.json(obj)
        }
    })
})

app.post('/selectTime.json',(req,res)=>{
    let time='2019-'+req.body.accessTime
    let order={
        doctorId:req.body.doctorId,
        accessTime:time
    }
    patient.selectOrderByIdTime(order,(result)=>{
        if(result[0] != null){
            let obj={
                code:0,
                codeNum:0,
                result:result,
            }
            res.json(obj)
        }else{
            let obj={
                code:0,
                codeNum:1,
            }
            res.json(obj)
        }
        
    })
})

app.post('/postRegisterForm.json',(req,res)=>{
    patient.insertUser(req.body.registerForm,result=>{
        let obj={
            code:0,
        }
        res.json(obj)
    })
})

app.post('/postAppointment.json',(req,res)=>{
    let order = req.body.order
    patient.insertOrder(order,result=>{
        let obj = {
            code:0,
            count:1,
        }
        res.json(obj)
    })
})

app.post('/cancelAppointment.json',(req,res)=>{
    let cancleOrder = req.body.cancleOrder
    //console.log(cancleOrder.serial)
    patient.updatetOrder(cancleOrder,result=>{
        let obj = {
            code:0,
        }
        res.json(obj)
    })
})

app.listen(3000,()=>{
    console.log('server run at port 3000!')
})