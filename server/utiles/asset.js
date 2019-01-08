let mysql = require('mysql')
let moment = require('moment')
let Promise = require('promise')

let pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'mayongjie',
    database : 'appointment',
    port: 3306,
})

function dataJson(data){
    a=JSON.stringify(data)
    b=JSON.parse(a)
    return b
}

function assetWork(){
    new Promise((resolve,reject)=>{
        sql="SELECT doctorId,department,remain,lastWorkTime FROM doctor"
        pool.getConnection(function(err,connection){
            if(err) throw err

            connection.query(sql,(err,result)=>{
                if(err) throw err

                let a=dataJson(result)
                resolve(a)
            })
            connection.release()
        })
    }).then((result)=>{
        let date = result
        let len = date.length
        for(let i = 0;i<len;i++){
            if(momoment(date[i].lastWorkTime).isAfter('2019-1-7')){
                console.log('no')
            }
        }
    }).catch(err=>{
        console.log(err)
    })
}

function getDoctorIdList(callback){
    sql="SELECT doctorId FROM doctor"
    pool.getConnection(function(err,connection){
      if(err) throw err
  
      connection.query(sql,(err,result)=>{
        if(err) throw err
  
        let a = dataJson(result)
        callback(a)
      })
      connection.release()
    })
}

function getDoctorById(doctorId,callback){
    sql="SELECT name,department,remain FROM doctor where doctorId='"+doctorId+"'"
    pool.getConnection(function(err,connection){
        if(err) throw err
    
        connection.query(sql,(err,result)=>{
          if(err) throw err
    
          let a = dataJson(result)
          callback(a[0])
        })
        connection.release()
    })
}

function addAsset(doctorId,addAsset,callback){
    sql="INSERT INTO `asset` (doctorId,name,department,workState,workTime,remain) VALUES ('"+doctorId+"','"+addAsset.name+"','"+addAsset.department+"','"+addAsset.workState+"','"+addAsset.workTime+"','"+addAsset.remain+"')"
    pool.getConnection(function(err,connection){
        if(err) throw err
    
        connection.query(sql,(err)=>{
          if(err) throw err
    
          callback()
        })
        connection.release()
    })
}

module.exports={
    // selectUserbyUser:selectUserbyUser,
    getDoctorIdList:getDoctorIdList,
    getDoctorById:getDoctorById,
    addAsset:addAsset,
  }
  