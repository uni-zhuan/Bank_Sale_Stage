const express = require("express");
const con = require("../modul/db.js");

const router = express.Router();

let db = con.handleDisconnection();

// 处理数据的函数
// data 数据
// root 顶级数据

// 用户表
// 判断此用户是否存在
router.get("/login", (req, res) => {
  let name = req.query.uname;
  let password = req.query.password;
  let sql = `SELECT * FROM user WHERE uname = '${name}' AND password='${password}'`;
  db.query(
    {
      sql: sql,
    },
    (err, results, fields) => {
      res.send(results);
    }
  );
});
// 根据用户id请求对应用户信息
router.get("/getUser", (req, res) => {
  let id = req.query.iduser;
  let sql = `SELECT * FROM user WHERE iduser = '${id}'`;
  db.query(
    {
      sql: sql,
    },
    (err, results, fields) => {
      res.send(results);
    }
  );
});
//添加用户信息
router.get("/addUser", (req, res) => {
  //用户名、密码、身份证号
  let sql = `INSERT INTO user (uname,password,idcard) values ('${req.query.uname}','${req.query.password}','${req.query.idcard}')`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({
        code: 200,
      });
    }
  });
});
// 删除用户
router.get("/delUser", (req, res) => {
  let id = req.query.iduser;
  let sql = `DELETE FROM user WHERE iduser = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({
        code: 200,
      });
    }
  });
});
// 修改用户信息
router.get("/modUser", (req, res) => {
  let id = req.query.iduser,
    useri = req.query,
    //用户信息(用户名、密码、身份证号)
    newUser = [useri.uname, useri.idcard];
  let sql = `UPDATE user SET uname = ?,idcard = ? WHERE iduser = ${id}`;
  db.query(sql, newUser, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({
        code: 200,
      });
    }
  });
});
//根据参数搜索符合要求的用户信息
router.get("/findUser", (req, res) => {
  //用户信息(用户名、用户ID)
  let sql = `SELECT * FROM user WHERE iduser='${req.query.iduser}' AND uname ='${req.query.uname}'`;
  db.query(
    {
      sql: sql,
    },
    (err, results, fields) => {
      res.send(results);
    }
  );
});

//秒杀产品表
//获取所有秒杀产品信息
router.get("/getALLMPro", (req, res) => {
  let sql = `SELECT * FROM mspdt`;
  db.query(
    {
      sql: sql,
    },
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
});
//按产品id获取秒杀产品信息
router.get("/getMPro", (req, res) => {
  let id = req.query.idms;
  let sql = `SELECT * FROM mspdt WHERE idms = '${id}'`;
  db.query(
    {
      sql: sql,
    },
    (err, results, fields) => {
      res.send(results);
    }
  );
});

//添加秒杀产品信息
// router.get('/addMPro', (req, res) => {
//   //插入
//   let sql = `INSERT INTO mspdt(price,storage,idms,pname) SELECT ${req.query.price},${req.query.storage},idproducts as idms,pname FROM products WHERE idproducts='${req.query.idproducts}'`
//   db.query(sql, (err, result) => {
//     if (err) {
//       console.log(err)
//     } else {
//       res.json({
//         code: 200
//       })
//     }
//   })
router.get("/addMPro", (req, res) => {
  //插入
  let sql = `INSERT INTO mspdt(price,storage,stime,etime,type,idms,pname) SELECT ${req.query.price},${req.query.storage},'${req.query.stime}','${req.query.etime}',type,idproducts as idms,pname FROM products WHERE idproducts='${req.query.idproducts}'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({
        code: 200,
      });
    }
  });
  //删除库存
  // sql = `UPDATE products SET storage=storage-${req.query.storage} WHERE idproducts='${req.query.idproducts}`
  // db.query(sql, (err, result) => {
  //   if (err) {
  //     console.log(err)
  //   } else {
  //     res.json({
  //       code: 200
  //     })
  //   }
  // })
});

// router.get('/addMPro', (req, res) => {
//   //插入
//   let sql = `INSERT INTO mspdt(idms,pname,price,storage,stime,etime) SELECT ${req.query.price} as price,${req.query.storage} as storage,${req.query.stime} as stime,
//   ${req.query.etime} as etime,idms,pname FROM products WHERE idproducts='${req.query.idproducts}'`
//   db.query(sql, (err, result) => {
//     if (err) {
//       console.log(err)
//     } else {
//       res.json({
//         code: 200
//       })
//     }
//   })
//   //删除库存
//   sql = `UPDATE products SET storage=storage-${req.query.storage} FROM products WHERE idproducts='${req.query.idproducts}`
//   db.query(sql, (err, result) => {
//     if (err) {
//       console.log(err)
//     } else {
//       res.json({
//         code: 200
//       })
//     }
//   })
// })
// 修改产品信息
router.get("/modMPro", (req, res) => {
  let id = req.query.idms,
    proi = req.query,
    //商品名称、价格、库存、详情、类型
    // UTC时间格式转换——2019-10-14 12:20:12
    newPro = [proi.price, proi.storage, proi.stime, proi.etime];
  let time1 = new Date(proi.stime.delayTime).toJSON();
  proi.stime.delayTime = new Date(+new Date(time1) + 8 * 3600 * 1000)
    .toISOString()
    .replace(/T/g, " ")
    .replace(/\.[\d]{3}Z/, "");
  let time2 = new Date(proi.etime.delayTime).toJSON();
  proi.etime.delayTime = new Date(+new Date(time2) + 8 * 3600 * 1000)
    .toISOString()
    .replace(/T/g, " ")
    .replace(/\.[\d]{3}Z/, "");
  let sql = `UPDATE mspdt SET price = ?,storage = ?,stime = ?,etime = ? WHERE idms = ${id}`;
  db.query(
    sql,
    [proi.price, proi.storage, proi.stime, proi.etime],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({
          code: 200,
        });
      }
    }
  );
});
// 删除产品
router.get("/delMPro", (req, res) => {
  let id = req.query.idms;
  let sql = `DELETE FROM mspdt WHERE idms = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({
        code: 200,
      });
    }
  });
});

//产品表
// 获取所有产品信息
router.get("/getAllPro", (req, res) => {
  let sql = `SELECT * FROM products`;
  db.query(
    {
      sql: sql,
    },
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
});
//按产品id获取产品信息
router.get("/getPro", (req, res) => {
  let id = req.query.idproducts;
  let sql = `SELECT * FROM products WHERE idproducts = '${id}'`;
  db.query(
    {
      sql: sql,
    },
    (err, results, fields) => {
      res.send(results);
    }
  );
});

// 修改产品信息
router.get("/modPro", (req, res) => {
  let id = req.query.idproducts,
    proi = req.query,
    //商品名称、价格、库存、详情、类型
    newPro = [proi.pname, proi.price, proi.storage, proi.detail, proi.type];
  let sql = `UPDATE products SET pname = ?, price = ?,storage = ?,detail = ?,type = ? WHERE idproducts = ${id}`;
  db.query(sql, newPro, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({
        code: 200,
      });
    }
  });
});

// 删除产品
router.get("/delPro", (req, res) => {
  let id = req.query.idproducts;
  let sql = `DELETE FROM products WHERE idproducts = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({
        code: 200,
      });
    }
  });
});
//添加产品信息
router.get("/addPro", (req, res) => {
  let sql = `INSERT INTO products (pname,price,storage,detail,type) values ('${req.query.pname}','${req.query.price}','${req.query.storage}','${req.query.detail}','${req.query.type}')`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({
        code: 200,
      });
    }
  });
});
//根据参数搜索符合要求的商品信息
router.get("/findPro", (req, res) => {
  //0-名字，1-价格，2-类型，3-全部
  //商品名称、商品价格、商品类型pname,price,type
  let sql;
  if (req.query.choice == 0) {
    sql = `SELECT * FROM products WHERE pname ='${req.query.pname}'`;
  }
  if (req.query.choice == 1) {
    sql = `SELECT * FROM products WHERE price ='${req.query.price}'`;
  }
  if (req.query.choice == 2) {
    sql = `SELECT * FROM products WHERE type='${req.query.type}'`;
  }
  if (req.query.choice == 3) {
    sql = `SELECT * FROM products WHERE pname ='${req.query.pname}',price ='${req.query.price}',type='${req.query.type}'`;
  }
  db.query(
    {
      sql: sql,
    },
    (err, results, fields) => {
      res.send(results);
    }
  );
});

//订单表
//按用户id获取该用户的订单信息
router.get("/getOrder", (req, res) => {
  let id = req.query.uid;
  let sql = `SELECT * FROM \`order\` WHERE uid = '${id}'`;
  db.query(
    {
      sql: sql,
    },
    (err, results, fields) => {
      res.send(results);
    }
  );
});
//按订单pid获取订单信息
router.get("/getOrderByPid", (req, res) => {
  let id = req.query.pid;
  let sql = `SELECT * FROM \`order\` WHERE pid = '${id}'`;
  db.query(
    {
      sql: sql,
    },
    (err, results, fields) => {
      res.send(results);
    }
  );
});
router.get("/getOrderById", (req, res) => {
  let id = req.query.idorder;
  let sql = `SELECT * FROM \`order\` WHERE idorder = '${id}'`;
  db.query(
    {
      sql: sql,
    },
    (err, results, fields) => {
      res.send(results);
    }
  );
});
//添加订单信息-用户id,产品id,购买数量, 购买时间
router.get("/addOrder", (req, res) => {
  let sql = `INSERT INTO \`order\` (uid,pid,number,time,pay) values ('${req.query.uid}','${req.query.pid}','${req.query.number}',NOW(),'0')`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({
        code: 200,
      });
    }
  });
});
//修改订单信息
router.get("/modOrder", (req, res) => {
  let id = req.query.idorder,
    ordi = req.query,
    //用户id、产品id、购买数量
    newOrd = [ordi.uid, ordi.pid, ordi.number];
  let sql = `UPDATE \`order\` SET uid = ?, pid= ?,number = ? WHERE idorder = ${id}`;
  db.query(sql, newOrd, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({
        code: 200,
      });
    }
  });
});
//修改支付状态(未支付改已支付)
router.get("/modPay", (req, res) => {
  let id = req.query.idorder,
    payStatus = req.query.pay;

  let sql = `UPDATE \`order\` SET pay = ? WHERE idorder = ${id}`;
  db.query(sql, payStatus, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({
        code: 200,
      });
    }
  });
});
// 删除对应id的订单
router.get("/delOrder", (req, res) => {
  let id = req.query.idorder;
  let sql = `DELETE FROM \`order\` WHERE idorder = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({
        code: 200,
      });
    }
  });
});

module.exports = router;
