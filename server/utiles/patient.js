let mysql = require('mysql')
let Promise = require('promise')
let moment = require('moment')
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
    // maxActive=30,
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
  sql="SELECT number,state FROM `orders` where cancel=0 AND accessTime='"+order.accessTime+"' AND doctorId='"+order.doctorId+"'"
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
  sql="SELECT number,state FROM `orders` where appointTime='"+order.appointTime+"' AND doctorId='"+order.doctorId+"'"
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

function selectAssetByWorkTime(doctorId,workTime,callback){
  sql="SELECT * FROM `asset` where workTime='"+workTime+"' and doctorId='"+doctorId+"'"
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
  sql="INSERT INTO `orders` (serial,number,userId,doctorId,state,appointTime,accessTime,timeLine) VALUES ('"+order.serial+"',"+order.number+",'"+order.userId+"','"+order.doctorId+"',"+order.appointState+",'"+order.appointTime+"','"+order.accessTime+"','"+order.timeLine+"')"
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
  sql="UPDATE `orders` SET cancel = 1 WHERE serial = '"+cancleOrder.serial+"'"
  pool.getConnection((err,connection)=>{
    if(err) throw err

    connection.query(sql,(err,result)=>{
      if(err)  throw err

      callback()
    })
    connection.release()
  })
}

function selectOrderCountByIdTime(countOrder,callback){
  let minTime = moment(countOrder.appointTime).subtract(7, 'days').format('YYYY-MM-DD')
  // console.log(minTime)
  // console.log(countOrder)
  sql="SELECT COUNT(*) as c from orders WHERE cancel=1 AND userId='"+countOrder.userId+"' AND appointTime<='"+countOrder.appointTime+"'AND appointTime>='"+minTime+"'"
  pool.getConnection((err,connection)=>{
    if(err) throw err

    connection.query(sql,(err,row)=>{
      if(err)  throw err

      let a = dataJson(row)
      callback(row[0])
    })
    connection.release()
  })
}

function selectIrregularityByIdTime(countOrder,callback){
  sql="SELECT * from `irregularity` WHERE userId='"+countOrder.userId+"' AND endTime>='"+countOrder.appointTime+"'"
  pool.getConnection((err,connection)=>{
    if(err) throw err

    connection.query(sql,(err,result)=>{
      if(err)  throw err

      let a = dataJson(result)
      callback(a[0])
    })
    connection.release()
  })
}

function inserIrrigulatrity(orders){
  //INSERT INTO `irregularity` (`userId`, `beginTime`, `endTime`) VALUES ('3', '2019-01-09 22:29:57', '2019-01-11 22:29:59')
  sql="INSERT INTO 'irregularity'('userId','beginTime','endTime') VALUES('"+orders.userId+"','"+orders.beginTime+"','"+orders.endTime+"')"
  pool.getConnection((err,connection)=>{
    if(err) throw err

    connection.query(sql,(err,result)=>{
      if(err)  throw err

    })
    connection.release()
  })
}

function selectOrderByUserId(userId,callback){
  sql="SELECT orders.*,doctor.`name` from orders,doctor WHERE orders.userId='"+userId+"' and orders.doctorId=doctor.doctorId and orders.cancel=0 and orders.finish=0"
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

function cancelOrderByserial(serial,callback){
  sql="UPDATE `orders` SET cancel = 1 WHERE serial = '"+serial+"'"
  pool.getConnection((err,connection)=>{
    if(err) throw err

    connection.query(sql,(err,result)=>{
      if(err)  throw err

      callback()
    })
    connection.release()
  })
}

module.exports={
  selectUserbyUser:selectUserbyUser,
  getDoctorInfo:getDoctorInfo,
  selectDoctorById:selectDoctorById,
  selectOrderByIdTime:selectOrderByIdTime,
  insertUser:insertUser,
  selectOrderByOrder:selectOrderByOrder,
  insertOrder:insertOrder,
  updatetOrder:updatetOrder,
  selectAssetByWorkTime:selectAssetByWorkTime,
  selectOrderCountByIdTime:selectOrderCountByIdTime,
  selectIrregularityByIdTime:selectIrregularityByIdTime,
  inserIrrigulatrity:inserIrrigulatrity,
  selectOrderByUserId:selectOrderByUserId,
  cancelOrderByserial:cancelOrderByserial,
}
