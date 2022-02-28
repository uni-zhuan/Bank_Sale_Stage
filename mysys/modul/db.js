

var mysql = require('mysql')

var mysql_config = {

  host: 'localhost',

  user: 'root',

  password: '123456',

  database: 'bank'

}

function handleDisconnection() {

  var dbServer = mysql.createConnection(mysql_config)

  dbServer.connect(function (err) {
    console.log('数据库链接成功')
    if (err) {

      setTimeout(handleDisconnection, 2000)

    }

  })

  dbServer.on('error', function (err) {

    console.log('db error', err)

    if (err.code === 'PROTOCOL_CONNECTION_LOST') {

      console.log('db error执行重连:' + err.message)

      handleDisconnection()

    } else {

      throw err

    }

  })

  return dbServer //返回一个connection对象，用于调用它的其他方法

  exports.dbServer = dbServer

}

exports.handleDisconnection = handleDisconnection
