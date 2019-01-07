let mysql = require('mysql')
let Promise = require('promise')
// let connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'mayongjie',
//     database : 'appointment',
//     port: 3306
// })

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

function selectUserbyUser(userName,password,callback) {
    sql="SELECT userName,password,userId,name FROM user WHERE userName='"+userName+"'and passWord='"+password+"'"   
    pool.getConnection(function(err,connection){
      if(err) throw err

      connection.query(sql,(err,result)=>{
        if(err) throw err
  
        let a=dataJson(result)
        callback(a[0])
      })
      connection.release()
    })
}

function getDoctorInfo(callback){
  sql="SELECT name,doctorId,department FROM doctor"
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

function selectDoctorById(doctorId,callback){
  sql="SELECT name,position,remain FROM doctor where doctorId='"+doctorId+"'"
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

function selectOrderByIdTime(order,callback){
  sql="SELECT number,state FROM `order` where cancel=0 AND accessTime='"+order.accessTime+"' AND doctorId='"+order.doctorId+"'"
  pool.getConnection((err,connection)=>{
    if(err) throw err

    connection.query(sql,(err,result)=>{
      if(err)  throw err

      let a = dataJson(result)
      callback(a)
    })
    connection.release()
  })
}

function insertUser(registerForm,callback){
  sql="INSERT INTO `user` (name,sex,age,address,phoneNumber,idCard,userName,passWord) VALUES ('"+registerForm.name+"',"+registerForm.sex+","+registerForm.age+",'"+registerForm.address+"','"+registerForm.phoneNumber+"','"+registerForm.idCard+"','"+registerForm.userName+"','"+registerForm.passWord+"')"
  pool.getConnection((err,connection)=>{
    if(err) throw err

    connection.query(sql,(err,result)=>{
      if(err)  throw err

      callback()
    })
    connection.release()
  })
}

function selectOrderByOrder(order,callback){
  sql="SELECT number,state FROM `order` where appointTime='"+order.appointTime+"' AND doctorId='"+order.doctorId+"'"
  pool.getConnection((err,connection)=>{
    if(err) throw err

    connection.query(sql,(err,result)=>{
      if(err)  throw err

      let a = dataJson(result)
      callback(a)
    })
    connection.release()
  })
}

function insertOrder(order,callback){
  sql="INSERT INTO `order` (serial,number,userId,doctorId,state,appointTime,accessTime,timeLine) VALUES ('"+order.serial+"',"+order.number+",'"+order.userId+"','"+order.doctorId+"',"+order.appointState+",'"+order.appointTime+"','"+order.accessTime+"','"+order.timeLine+"')"
  pool.getConnection((err,connection)=>{
    if(err) throw err

    connection.query(sql,(err,result)=>{
      if(err)  throw err

      callback()
    })
    connection.release()
  })
}

function updatetOrder(cancleOrder,callback){
  sql="UPDATE `order` SET cancel = 1 WHERE serial = '"+cancleOrder.serial+"'"
  pool.getConnection((err,connection)=>{
    if(err) throw err

    connection.query(sql,(err,result)=>{
      if(err)  throw err

      callback()
    })
    connection.release()
  })
}
// getDoctorInfo((result)=>{
//   console.log(result[1].name)
//   console.log(result)
// })

module.exports={
  selectUserbyUser:selectUserbyUser,
  getDoctorInfo:getDoctorInfo,
  selectDoctorById:selectDoctorById,
  selectOrderByIdTime:selectOrderByIdTime,
  insertUser:insertUser,
  selectOrderByOrder:selectOrderByOrder,
  insertOrder:insertOrder,
  updatetOrder:updatetOrder,
}
