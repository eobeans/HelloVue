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

new Promise(()=>{
    assetWork()
}).then(()=>{
    deleteAsset()
})