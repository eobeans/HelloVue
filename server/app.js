const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
let Promise = require('promise')
let patient = require('./utiles/patient')
let asset = require('./utiles/asset')
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

app.get('/getDoctorIdList.json',(req,res)=>{
    asset.getDoctorIdList((result)=>{
        let obj={
            code:0,
            doctorIdList:result,
        }
        res.json(obj)
    })
})

app.post('/getDoctorById.json',(req,res)=>{
    asset.getDoctorById(req.body.doctorId,(result)=>{
        let obj={
            code:0,
            name:result.name,
            department:result.department,
            remain:result.remain,
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
    new Promise((reslove,reject)=>{
        patient.selectOrderByIdTime(order,(result)=>{
            if(result[0] != null){
                let obj={
                    code:0,
                    codeNum:0,
                    result:result,
                }
                reslove(obj)
            }else{
                let obj={
                    code:0,
                    codeNum:1,
                }
                reslove(obj)
            }
            
        })
    }).then(orderObj=>{
        patient.selectAssetByWorkTime(order.doctorId,order.accessTime,(result)=>{
            // console.log(result)
            if(result[0] != null){
                let obj={
                    code:0,
                    orderObj:orderObj,
                }
                res.json(obj)
            }else{
                let obj={
                    code:1,
                    orderObj:orderObj
                }
                res.json(obj)
            }
        })
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

app.post('/newAsset.json',(req,res)=>{
    asset.addAsset(req.body.doctorId,req.body.addAsset,(result)=>{
        let obj = {
            code:0,
        }
        res.json(obj)
    })
})

app.get('/getAsset.json',(req,res)=>{
    asset.getAsset(result=>{
        let obj={
            code:0,
            allData:result,
        }
        res.json(obj)
    })
})

app.post('/getAssetBySearch.json',(req,res)=>{
    asset.getAssetBySearch(req.body.strValue,(result)=>{
        let obj={
            code:0,
            data:result,
        }
        res.json(obj)
    })
})

app.post('/selectAssetById.json',(req,res)=>{
    asset.selectAssetById(req.body.strValue,(result)=>{
        if(result != null){
            let obj={
                code:0,
                data:result,        
            }
            res.json(obj)
        }else{
            let obj={
                code:1,
                data:result,        
            }
            res.json(obj)
        }
        
    })
})

app.post('/selectAssetByName.json',(req,res)=>{
    asset.selectAssetByName(req.body.strValue,(result)=>{
        if(result != null){
            let obj={
                code:0,
                data:result,        
            }
            res.json(obj)
        }else{
            let obj={
                code:1,
                data:result,        
            }
            res.json(obj)
        }
    })
})
app.listen(3000,()=>{
    console.log('server run at port 3000!')
})