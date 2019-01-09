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

function updateAssetByIdTime(updateAsset,callback){
    sql="UPDATE asset SET workState='"+updateAsset.workState+"',workTime='"+updateAsset.workTime+"',remain='"+updateAsset.remain+"' WHERE doctorId='"+updateAsset.doctorId+"' AND workTime='"+updateAsset.workTime+"'"
    pool.getConnection(function(err,connection){
        if(err) throw err
    
        connection.query(sql,(err,result)=>{
          if(err) throw err

          callback()
        })
        connection.release()
    })
}

function deleteAssetByIdTime(updateAsset,callback){
    sql="DELETE FROM asset WHERE doctorId='"+updateAsset.doctorId+"' And workTime='"+updateAsset.workTime+"'"
    pool.getConnection(function(err,connection){
        if(err) throw err
    
        connection.query(sql,(err,result)=>{
          if(err) throw err

          callback()
        })
        connection.release()
    })
}


module.exports={
    getDoctorIdList:getDoctorIdList,
    getDoctorById:getDoctorById,
    addAsset:addAsset,
    getAsset:getAsset,
    getAssetBySearch:getAssetBySearch,
    selectAssetById:selectAssetById,
    selectAssetByName:selectAssetByName,
    updateAssetByIdTime:updateAssetByIdTime,
    deleteAssetByIdTime:deleteAssetByIdTime,
  }
  