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
        sql="SELECT * FROM doctor"
        pool.getConnection(function(err,connection){
            if(err) throw err
        
            connection.query(sql,(err,result)=>{
                if(err) throw err
        
                let a = dataJson(result)
                resolve(a)
            })
        connection.release()
        })
    }).then((result)=>{
        let date = result
        let len = date.length
        pool.getConnection(function(err,connection){
            for(let i = 0;i<len;i++){
                for(let j = 0;j<21;j++){
                    let workTime=moment().add(j, 'd').format('YYYY-MM-DD')
                    sql="INSERT INTO `asset` (doctorId,name,department,workState,workTime,remain) VALUES ('"+date[i].doctorId+"','"+date[i].name+"','"+date[i].department+"','"+1+"','"+workTime+"','"+date[i].remain+"')"
                    connection.query(sql,(err,result)=>{
                        if(err) throw err
                        
                        console.log('success add:'+date[i].doctorId)
                    })
                }

            }
            connection.release()
        })
    }).catch(err=>{
        console.log(err)
    })
}

function deleteAsset(){
    pool.getConnection(function(err,connection){
        if(err) throw err
        
        let j = 0
        for(let i = 0;i<60;i++){
            j =   j + 5
            sql="DELETE FROM `asset` WHERE ID = ' "+j+"'"
            connection.query(sql,(err,result)=>{
                if(err) throw err
          
                console.log('delete where ID ='+j)
            })
        }
        connection.release()
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

function getAsset(callback){
    sql="SELECT * FROM asset"
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

function getAssetBySearch(strValue,callback){
    sql="SELECT * FROM asset where department='"+strValue+"'"
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

function selectAssetById(strValue,callback){
    sql="SELECT * FROM asset where doctorId='"+strValue+"'"
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

function selectAssetByName(strValue,callback){
    sql="SELECT * FROM asset where `name`='"+strValue+"'"
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
module.exports={
    // selectUserbyUser:selectUserbyUser,
    getDoctorIdList:getDoctorIdList,
    getDoctorById:getDoctorById,
    addAsset:addAsset,
    getAsset:getAsset,
    getAssetBySearch:getAssetBySearch,
    selectAssetById:selectAssetById,
    selectAssetByName:selectAssetByName,
  }
  