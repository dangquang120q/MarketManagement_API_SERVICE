/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const sqlString = require("sqlstring");
const { HttpResponse } = require("../services/http-response");
const { log } = require("../services/log");
const { sync } = require("load-json-file");

module.exports = {
  login: async (req, res) => {
    log("Login from user: " + JSON.stringify(req.body));
    let username = req.body.username;
    let password = req.body.password;
    try {
      let sql = sqlString.format(
        "select * from Staff where username = ? and password = ?",
        [username, password]
      );
      let data = await sails
        .getDatastore(process.env.MYSQL_DATASTORE)
        .sendNativeQuery(sql);
      if (data["rows"].length == 0) {
        response = new HttpResponse(
          { msg: "Wrong username or password" },
          { statusCode: 401, error: true }
        );
        res.status(401);
        return res.send(response);
      } else {
        response = new HttpResponse(data["rows"][0], {
          statusCode: 200,
          error: false,
        });
        return res.ok(response);
      }
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },
  changeStaff: async (req, res) => {
    let response;
    let type = req.body.type;
    let name = req.body.name;
    let phone = req.body.phone;
    let email = req.body.email;
    let role = req.body.role;
    let dob = req.body.dob;
    let id = req.body.id;
    let username = req.body.username;
    let password = req.body.password;
    try {
      if (type == 1) {
        let sql = sqlString.format(
          "insert into Staff(id,name,phone,email,role,username,password,dob) values(?,?,?,?,?,?,?,?)",
          [id, name, phone, email, role, username, password, dob]
        );
        log(sql);
        await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql);
      } else if (type == 2) {
        let sql = sqlString.format(
          "update Staff set name = ?,phone = ?,email = ?,role = ?,dob = ? where id = ?",
          [name, phone, email, role, dob, id]
        );
        log(sql);
        await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql);
      } else {
        let sql = sqlString.format("delete from Staff where id = ?", [id]);
        await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql);
      }
      response = new HttpResponse(
        { msg: "Change Staff Successful" },
        { statusCode: 200, error: false }
      );
      return res.ok(response);
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },
  changeCategory: async (req, res) => {
    let response;
    let type = req.body.type;
    let id = req.body.id;
    let name = req.body.name;
    let description = req.body.description;
    try {
      if (type == 1) {
        let sql = sqlString.format(
          "insert into Category(name,description) values(?,?)",
          [name, description]
        );
        log(sql);
        await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql);
      } else if (type == 2) {
        let sql = sqlString.format(
          "update Category set name = ?,description = ? where id = ?",
          [name, description, id]
        );
        log(sql);
        await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql);
      } else {
        let sql = sqlString.format("delete from Category where id = ?", [id]);
        await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql);
      }
      response = new HttpResponse(
        { msg: "Change Category Successful" },
        { statusCode: 200, error: false }
      );
      return res.ok(response);
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },
  changeBooth: async (req, res) => {
    let response;
    let type = req.body.type;
    let id = req.body.id;
    let name = req.body.name;
    let categoryId = req.body.categoryId;
    try {
      if (type == 1) {
        let sql = sqlString.format(
          "insert into Booth(id,name,categoryId) values(?,?,?)",
          [id, name, categoryId]
        );
        log(sql);
        await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql);
      } else if (type == 2) {
        let sql = sqlString.format(
          "update Booth set name = ?,categoryId = ? where id = ?",
          [name, categoryId, id]
        );
        log(sql);
        await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql);
      } else {
        let sql = sqlString.format("delete from Booth where id = ?", [id]);
        await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql);
      }
      response = new HttpResponse(
        { msg: "Change Booth Successful" },
        { statusCode: 200, error: false }
      );
      return res.ok(response);
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },
  changeProduct: async (req, res) => {
    let response;
    let type = req.body.type;
    let id = req.body.id;
    let name = req.body.name;
    let unit = req.body.unit;
    let total = req.body.total;
    let price = req.body.price;
    let categoryId = req.body.categoryId;
    try {
      if (type == 1) {
        let sql = sqlString.format(
          "insert into Product(name,unit,total,price,categoryId) values(?,?,?,?,?)",
          [name, unit, total, price, categoryId]
        );
        log(sql);
        await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql);
      } else if (type == 2) {
        let sql = sqlString.format(
          "update Product set name = ?,unit = ?,total = ?,price = ?,categoryId = ? where id = ?",
          [name, unit, total, price, categoryId, id]
        );
        log(sql);
        await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql);
      } else {
        let sql = sqlString.format("delete from Product where id = ?", [id]);
        await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql);
      }
      response = new HttpResponse(
        { msg: "Change Product Successful" },
        { statusCode: 200, error: false }
      );
      return res.ok(response);
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },
  changeSupplier: async (req, res) => {
    let response;
    let type = req.body.type;
    let id = req.body.id;
    let name = req.body.name;
    let address = req.body.address;
    let email = req.body.email;
    let phone = req.body.phone;
    let tax = req.body.tax;
    let website = req.body.website;
    try {
      if (type == 1) {
        let sql = sqlString.format(
          "insert into Supplier(name,address,email,phone,tax,website) values(?,?,?,?,?,?)",
          [name, address, email, phone, tax, website]
        );
        log(sql);
        await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql);
      } else if (type == 2) {
        let sql = sqlString.format(
          "update Supplier set name = ?,address = ?,email = ?,phone = ?,tax = ?,website = ? where id = ?",
          [name, address, email, phone, tax, website, id]
        );
        log(sql);
        await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql);
      } else {
        let sql = sqlString.format("delete from Supplier where id = ?", [id]);
        await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql);
      }
      response = new HttpResponse(
        { msg: "Change Supplier Successful" },
        { statusCode: 200, error: false }
      );
      return res.ok(response);
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },
  // changeSupplier: async (req, res) => {
  //   let response;
  //   let type = req.body.type;
  //   let id = req.body.id;
  //   let name = req.body.name;
  //   let address = req.body.address;
  //   let email = req.body.email;
  //   let phone = req.body.phone;
  //   let tax = req.body.tax;
  //   let website = req.body.website;
  //   try {
  //       if (type == 1) {
  //           let sql = sqlString.format("insert into Supplier(name,address,email,phone,tax,website) values(?,?,?,?,?,?)", [name,address,email,phone,tax,website]);
  //           log(sql);
  //           await sails
  //             .getDatastore(process.env.MYSQL_DATASTORE)
  //             .sendNativeQuery(sql);
  //       }
  //       else if(type == 2){
  //           let sql = sqlString.format("update Supplier set name = ?,address = ?,email = ?,phone = ?,tax = ?,website = ? where id = ?", [name,address,email,phone,tax,website,id]);
  //           log(sql);
  //           await sails
  //               .getDatastore(process.env.MYSQL_DATASTORE)
  //               .sendNativeQuery(sql);
  //       }
  //       else{
  //           let sql = sqlString.format("delete from Supplier where id = ?", [id]);
  //           await sails
  //               .getDatastore(process.env.MYSQL_DATASTORE)
  //               .sendNativeQuery(sql);
  //       }
  //       response = new HttpResponse(
  //           "Change Product Successful",
  //           { statusCode: 200, error: false }
  //       );
  //       return res.ok(response);
  //   } catch (error) {
  //     return res.serverError("Something bad happened on the server: " + error);
  //   }
  // },
  createInvoice: async (req, res) => {
    let response;
    let id = req.body.id;
    let staffId = req.body.staffId;
    let memberId = req.body.memberId || "";
    let products = req.body.products;
    let total = req.body.total;
    let reducedAmount = req.body.reducedAmount;

    try {
      let sql = sqlString.format(
        "insert into Invoice(id,staffId,memberId,reducedAmount,total) values(?,?,?,?,?)",
        [id, staffId, memberId, reducedAmount, total]
      );
      log(sql);
      await sails
        .getDatastore(process.env.MYSQL_DATASTORE)
        .sendNativeQuery(sql);
      for (let index = 0; index < products.length; index++) {
        const element = products[index];
        let sql3 = sqlString.format(
          "insert into ProductInvoice(productId,invoiceId,qty,price) values(?,?,?,?)",
          [element["id"], id, element["qty"], element["promoPrice"]]
        );
        log(sql3);
        await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql3);
        let sql4 = sqlString.format(
          "update Product set total = total - ? where id = ?",
          [element["qty"], element["id"]]
        );
        log(sql4);
        await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql4);
        let sql5 = sqlString.format(
          "update ProductReceipt set remain = remain - ? where id = ?",
          [element["qty"], element["ProductReceiptId"]]
        );
        log(sql5);
        await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql5);
      }
      if (memberId != "") {
        let priceAfter = total - reducedAmount * 1000;
        let pointEarn = Math.round(priceAfter / 10000) - reducedAmount;
        let sql2 = sqlString.format(
          "update Member set point = point + ? where id = ?",
          [pointEarn, memberId]
        );
        log(sql2);
        await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql2);
      }

      response = new HttpResponse(
        { msg: "Create Invoice Successful" },
        { statusCode: 200, error: false }
      );
      return res.ok(response);
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },

  createReceipt: async (req, res) => {
    let response;
    let id = req.body.id;
    let staffId = req.body.staffId;
    let supplierId = req.body.supplierId || "";
    let products = req.body.products;
    let total = req.body.total;

    try {
      let sql = sqlString.format(
        "insert into Receipt(id,staffId,supplierId,total) values(?,?,?,?)",
        [id, staffId, supplierId, total]
      );
      log(sql);
      await sails
        .getDatastore(process.env.MYSQL_DATASTORE)
        .sendNativeQuery(sql);
      for (let index = 0; index < products.length; index++) {
        const element = products[index];
        let sql3 = sqlString.format(
          "insert into ProductReceipt(productId,receiptId,qty,price,mfgDate,expDate,remain) values(?,?,?,?,?,?,?)",
          [
            element["id"],
            id,
            element["qty"],
            element["importPrice"],
            element["mfgDate"],
            element["expDate"],
            element["qty"],
          ]
        );
        log(sql3);
        await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql3);
        let sql4 = sqlString.format(
          "update Product set total = total + ? where id = ?",
          [element["qty"], element["id"]]
        );
        log(sql4);
        await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql4);
      }

      response = new HttpResponse(
        { msg: "Create Receipt Successful" },
        { statusCode: 200, error: false }
      );
      return res.ok(response);
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },

  getListStaff: async (req, res) => {
    let response;
    try {
      let sql = sqlString.format("select * from Staff");
      let data = await sails
        .getDatastore(process.env.MYSQL_DATASTORE)
        .sendNativeQuery(sql);
      response = new HttpResponse(data["rows"], {
        statusCode: 200,
        error: false,
      });
      return res.ok(response);
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },
  getListProduct: async (req, res) => {
    let response;
    try {
      let sql = sqlString.format("select * from Product");
      let data = await sails
        .getDatastore(process.env.MYSQL_DATASTORE)
        .sendNativeQuery(sql);
      for (let index = 0; index < data["rows"].length; index++) {
        const element = data["rows"][index];
        let sql2 = sqlString.format(
          `
          SELECT p.id AS productId, p.name, pp.promoPrice
          FROM Product AS p
          JOIN ProductPromotional AS pp ON p.id = pp.productId
          JOIN Promotional AS pr ON pp.promotionalId = pr.id
          WHERE p.id = ? AND CURRENT_TIMESTAMP() >= STR_TO_DATE(pr.startDate, '%m/%d/%Y') 
          and CURRENT_TIMESTAMP() <= STR_TO_DATE(pr.endDate, '%m/%d/%Y');
        `,
          [element["id"]]
        );
        let data2 = await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql2);
        if (data2["rows"].length > 0) {
          log(JSON.stringify(data2["rows"][0]));
          data["rows"][index].promoPrice = data2["rows"][0]["promoPrice"];
        }
        data["rows"][index].promoPrice = data["rows"][index]["price"];
      }
      response = new HttpResponse(data["rows"], {
        statusCode: 200,
        error: false,
      });
      return res.ok(response);
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },
  getListShipment: async (req, res) => {
    let response;
    let productId = req.body.productId;
    try {
      let sql = sqlString.format(
        "select * from ProductReceipt where productId = ? and isCancel = 0",
        [productId]
      );
      let data = await sails
        .getDatastore(process.env.MYSQL_DATASTORE)
        .sendNativeQuery(sql);
      response = new HttpResponse(data["rows"], {
        statusCode: 200,
        error: false,
      });
      return res.ok(response);
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },
  getListCategory: async (req, res) => {
    let response;
    try {
      let sql = sqlString.format("select * from Category");
      let data = await sails
        .getDatastore(process.env.MYSQL_DATASTORE)
        .sendNativeQuery(sql);
      response = new HttpResponse(data["rows"], {
        statusCode: 200,
        error: false,
      });
      return res.ok(response);
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },
  getListSupplier: async (req, res) => {
    let response;
    try {
      let sql = sqlString.format("select * from Supplier");
      let data = await sails
        .getDatastore(process.env.MYSQL_DATASTORE)
        .sendNativeQuery(sql);
      response = new HttpResponse(data["rows"], {
        statusCode: 200,
        error: false,
      });
      return res.ok(response);
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },
  getInvoice: async (req, res) => {
    let response;
    let id = req.body.id;
    try {
      let sql = sqlString.format("select * from Invoice where id = ?", [id]);
      let data = await sails
        .getDatastore(process.env.MYSQL_DATASTORE)
        .sendNativeQuery(sql);
      let response_data = data["rows"][0];
      if (data["rows"].length == 0) {
        response = new HttpResponse(
          { msg: "No Invoice Existed" },
          { statusCode: 200, error: false }
        );
      } else {
        let sqlStaff = sqlString.format("select * from Staff where id = ?", [
          data["rows"][0]["staffId"],
        ]);
        let dataStaff = await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sqlStaff);
        response_data.staff = dataStaff["rows"][0];
        let sqlMember = sqlString.format("select * from Member where id = ?", [
          data["rows"][0]["memberId"],
        ]);
        let dataMember = await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sqlMember);
        response_data.member = dataMember["rows"][0];
        let sqlProducts = sqlString.format(
          "select * from ProductInvoice where invoiceId = ?",
          [id]
        );
        let dataProducts = await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sqlProducts);
        let products = [];
        for (let index = 0; index < dataProducts["rows"].length; index++) {
          const element = dataProducts["rows"][index];
          let sqlProduct = sqlString.format(
            "select * from Product where id = ?",
            [element["productId"]]
          );
          let dataProduct = await sails
            .getDatastore(process.env.MYSQL_DATASTORE)
            .sendNativeQuery(sqlProduct);
          let product = {
            name: dataProduct["rows"][0]["name"],
            qty: element["qty"],
            unit: dataProduct["rows"][0]["unit"],
            price: element["price"],
          };
          products.push(product);
        }
        response_data.products = products;
      }
      response = new HttpResponse(response_data, {
        statusCode: 200,
        error: false,
      });
      return res.ok(response);
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },
  getListInvoice: async (req, res) => {
    let response;
    try {
      let sql = sqlString.format("select * from Invoice");
      let data = await sails
        .getDatastore(process.env.MYSQL_DATASTORE)
        .sendNativeQuery(sql);
      response = new HttpResponse(data["rows"], {
        statusCode: 200,
        error: false,
      });
      return res.ok(response);
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },
  getReceipt: async (req, res) => {
    let response;
    let id = req.body.id;
    try {
      let sql = sqlString.format("select * from Receipt where id = ?", [id]);
      let data = await sails
        .getDatastore(process.env.MYSQL_DATASTORE)
        .sendNativeQuery(sql);
      let response_data = data["rows"][0];
      if (data["rows"].length == 0) {
        response = new HttpResponse(
          { msg: "No Receipt Existed" },
          { statusCode: 200, error: false }
        );
      } else {
        let sqlStaff = sqlString.format("select * from Staff where id = ?", [
          data["rows"][0]["staffId"],
        ]);
        let dataStaff = await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sqlStaff);
        response_data.staff = dataStaff["rows"][0];
        let sqlSupplier = sqlString.format(
          "select * from Supplier where id = ?",
          [data["rows"][0]["supplierId"]]
        );
        let dataSupplier = await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sqlSupplier);
        response_data.supplier = dataSupplier["rows"][0];
        let sqlProducts = sqlString.format(
          "select * from ProductReceipt where receiptId = ? and isCancel = 0",
          [id]
        );
        let dataProducts = await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sqlProducts);
        let products = [];
        for (let index = 0; index < dataProducts["rows"].length; index++) {
          const element = dataProducts["rows"][index];
          let sqlProduct = sqlString.format(
            "select * from Product where id = ?",
            [element["productId"]]
          );
          let dataProduct = await sails
            .getDatastore(process.env.MYSQL_DATASTORE)
            .sendNativeQuery(sqlProduct);
          let product = {
            name: dataProduct["rows"][0]["name"],
            qty: element["qty"],
            unit: dataProduct["rows"][0]["unit"],
            price: dataProduct["rows"][0]["price"],
            importPrice: element["price"],
            mfgDate: element["mfgDate"],
            expDate: element["expDate"],
            remain: element["remain"],
          };
          products.push(product);
        }
        response_data.products = products;
      }
      response = new HttpResponse(response_data, {
        statusCode: 200,
        error: false,
      });
      return res.ok(response);
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },
  getListReceipt: async (req, res) => {
    let response;
    try {
      let sql = sqlString.format("select * from Receipt");
      let data = await sails
        .getDatastore(process.env.MYSQL_DATASTORE)
        .sendNativeQuery(sql);
      response = new HttpResponse(data["rows"], {
        statusCode: 200,
        error: false,
      });
      return res.ok(response);
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },
  statistics: async (req, res) => {
    let response;
    let type = req.body.type;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    try {
      if (type == 1) {
        let sql = sqlString.format(`SELECT 
        DATE_FORMAT(createdDate, '%Y-%m') AS month,
            SUM(qty * price) AS Revenue
        FROM 
            ProductInvoice
        WHERE 
            createdDate >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
        GROUP BY 
            DATE_FORMAT(createdDate, '%Y-%m')
        ORDER BY 
            month;
        `);
        let data = await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql);
        response = new HttpResponse(data["rows"], {
          statusCode: 200,
          error: false,
        });
        return res.ok(response);
      } else {
        let sql = sqlString.format(
          `SELECT 
              DATE(createdDate) AS date,
              SUM(qty * price) AS total_price
          FROM 
              ProductInvoice
          WHERE 
              createdDate BETWEEN ? AND ?
          GROUP BY 
              DATE(createdDate)
          ORDER BY 
              date;
        `,
          [startDate, endDate]
        );
        let data = await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql);
        response = new HttpResponse(data["rows"], {
          statusCode: 200,
          error: false,
        });
        return res.ok(response);
      }
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },
  productStatistics: async (req, res) => {
    let response;
    let type = req.body.type;
    try {
      if (type == 1) {
        let response_data = [];
        let sql = sqlString.format(`SELECT 
              productId,
              SUM(qty) AS total_sold
          FROM 
              ProductInvoice
          GROUP BY 
              productId
          ORDER BY 
            total_sold DESC ;    
        `);
        let data = await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql);
        for (let index = 0; index < data["rows"].length; index++) {
          const element = data["rows"][index];
          let sql2 = sqlString.format("select * from Product where id = ?", [
            element["productId"],
          ]);
          let data2 = await sails
            .getDatastore(process.env.MYSQL_DATASTORE)
            .sendNativeQuery(sql2);
          const product = data2["rows"][0];
          let obj = { ...product };
          obj.sum = element["total_sold"];
          response_data.push(obj);
        }
        response = new HttpResponse(response_data, {
          statusCode: 200,
          error: false,
        });
        return res.ok(response);
      } else {
        let response_data = [];
        let sql = sqlString.format(`SELECT 
            p.id,
            p.name,
            p.total
        FROM 
            Product p
        LEFT JOIN 
            ProductInvoice pi ON p.id = pi.productId 
            AND pi.createdDate >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)
        WHERE 
            pi.productId IS NULL;
        `);
        let data = await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql);
        for (let index = 0; index < data["rows"].length; index++) {
          const element = data["rows"][index];
          let sql2 = sqlString.format(
            `SELECT 
              SUM(qty) AS total_import
              FROM 
                  ProductReceipt
              WHERE
                productId = ? 
          `,
            [element["id"]]
          );
          let data2 = await sails
            .getDatastore(process.env.MYSQL_DATASTORE)
            .sendNativeQuery(sql2);
          if (data2["rows"][0]["total_import"] < element["total"] * 2) {
            let obj = {};
            obj.name = element["name"];
            obj.total = element["total"];
            obj.total_import = data2["rows"][0]["total_import"];
            response_data.push(obj);
          }
        }
        response = new HttpResponse(response_data, {
          statusCode: 200,
          error: false,
        });
        return res.ok(response);
      }
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },
  getListBooth: async (req, res) => {
    let response;
    try {
      let sql = sqlString.format("select * from Booth");
      let data = await sails
        .getDatastore(process.env.MYSQL_DATASTORE)
        .sendNativeQuery(sql);
      response = new HttpResponse(data["rows"], {
        statusCode: 200,
        error: false,
      });
      return res.ok(response);
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },
  getListExcessProduct: async (req, res) => {
    let response;
    try {
      let response_data = {};
      let sqlProducts = sqlString.format(
        `SELECT *
          FROM ProductReceipt
          WHERE isCancel = 0 and STR_TO_DATE(expDate, '%m/%d/%Y') <= DATE_ADD(CURDATE(), INTERVAL 10 DAY);                         
        `
      );
      let dataProducts = await sails
        .getDatastore(process.env.MYSQL_DATASTORE)
        .sendNativeQuery(sqlProducts);
      let products = [];
      for (let index = 0; index < dataProducts["rows"].length; index++) {
        const element = dataProducts["rows"][index];
        let sqlProduct = sqlString.format(
          "select * from Product where id = ?",
          [element["productId"]]
        );
        let dataProduct = await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sqlProduct);
        log(JSON.stringify(dataProduct["rows"][0]));
        let product = {
          id: element["id"],
          productId: dataProduct["rows"][0]["id"],
          name: dataProduct["rows"][0]["name"],
          qty: element["qty"],
          unit: dataProduct["rows"][0]["unit"],
          price: dataProduct["rows"][0]["price"],
          importPrice: element["price"],
          mfgDate: element["mfgDate"],
          expDate: element["expDate"],
          remain: element["remain"],
        };
        products.push(product);
      }
      log(products);
      response_data.products = products;
      response = new HttpResponse(products, {
        statusCode: 200,
        error: false,
      });
      return res.ok(response);
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },
  cancelProduct: async (req, res) => {
    let response;
    let id = req.body.id;
    let productId = req.body.productId;
    let remain = req.body.remain;
    try {
      let sql = sqlString.format(
        "update ProductReceipt set isCancel = 1 where id = ?",
        [id]
      );
      log(sql);
      await sails
        .getDatastore(process.env.MYSQL_DATASTORE)
        .sendNativeQuery(sql);
      let sql2 = sqlString.format(
        "update Product set total = total - ? where id = ?",
        [remain, productId]
      );
      log(sql2);
      await sails
        .getDatastore(process.env.MYSQL_DATASTORE)
        .sendNativeQuery(sql2);
      response = new HttpResponse({
        statusCode: 200,
        error: false,
      });
      return res.ok(response);
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },
  releaseProduct: async (req, res) => {
    let response;
    let productId = req.body.productId;
    let id = req.body.id;
    let count = req.body.count;
    try {
      let sql = sqlString.format(
        "update ProductReceipt set remain = remain - ? where id = ?",
        [count, id]
      );
      log(sql);
      await sails
        .getDatastore(process.env.MYSQL_DATASTORE)
        .sendNativeQuery(sql);
      let sql2 = sqlString.format(
        "update Product set saleTotal = saleTotal + ? where id = ?",
        [count, productId]
      );
      log(sql2);
      await sails
        .getDatastore(process.env.MYSQL_DATASTORE)
        .sendNativeQuery(sql2);
      response = new HttpResponse({
        statusCode: 200,
        error: false,
      });
      return res.ok(response);
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },
  changePromotional: async (req, res) => {
    let response;
    let type = req.body.type;
    let id = req.body.id;
    let name = req.body.name;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    try {
      if (type == 1) {
        let sql = sqlString.format(
          "insert into Promotional(name,startDate,endDate) values(?,?,?)",
          [name, startDate, endDate]
        );
        await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql);
        // for (let index = 0; index < listPromo.length; index++) {
        //   const element = listPromo[index];
        //   let sql2 = sqlString.format(
        //     "insert into ProductPromotional(promotionalId,productId,promoPrice) values(?,?,?)",
        //     [insertedId, element["productId"], element["promoPrice"]]
        //   );
        //   await sails
        //     .getDatastore(process.env.MYSQL_DATASTORE)
        //     .sendNativeQuery(sql2);
        // }
      } else if (type == 2) {
        let sql = sqlString.format(
          "update Promotional set name = ?,startDate = ?,endDate = ? where id = ?",
          [name, startDate, endDate, id]
        );
        log(sql);
        await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql);
      } else {
        let sql = sqlString.format("delete from Promotional where id = ?", [
          id,
        ]);
        await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql);
      }
      response = new HttpResponse(
        { msg: "Change Promotional Successful" },
        { statusCode: 200, error: false }
      );
      return res.ok(response);
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },
  changeProductPromotional: async (req, res) => {
    let response;
    let type = req.body.type;
    let id = req.body.id;
    let promotionalId = req.body.promotionalId;
    let productId = req.body.productId;
    let promoPrice = req.body.promoPrice;
    try {
      if (type == 1) {
        let sql = sqlString.format(
          "insert into ProductPromotional(promotionalId,productId,promoPrice) values(?,?,?)",
          [promotionalId, productId, promoPrice]
        );
        await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql);
      } else if (type == 2) {
        let sql = sqlString.format(
          "update ProductPromotional set promoPrice = ? where id = ?",
          [promoPrice, id]
        );
        log(sql);
        await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql);
      } else {
        let sql = sqlString.format(
          "delete from ProductPromotional where id = ?",
          [id]
        );
        await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql);
      }
      response = new HttpResponse(
        { msg: "Change ProductPromotional Successful" },
        { statusCode: 200, error: false }
      );
      return res.ok(response);
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },
  getListPromotional: async (req, res) => {
    let response;
    try {
      let sql = sqlString.format("select * from Promotional");
      let data = await sails
        .getDatastore(process.env.MYSQL_DATASTORE)
        .sendNativeQuery(sql);
      response = new HttpResponse(data["rows"], {
        statusCode: 200,
        error: false,
      });
      return res.ok(response);
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },
  getListProductPromotional: async (req, res) => {
    let response;
    let id = req.body.id;
    try {
      let sql = sqlString.format("CALL sp_get_list_promo_product(?)", [id]);
      let data = await sails
        .getDatastore(process.env.MYSQL_DATASTORE)
        .sendNativeQuery(sql);
      const resData = {
        list: data["rows"][0],
        promotional: data["rows"][1][0],
      };
      console.log(data["rows"]);
      response = new HttpResponse(resData, {
        statusCode: 200,
        error: false,
      });
      return res.ok(response);
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },
};
