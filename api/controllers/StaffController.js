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
      let sql = sqlString.format("select * from Staff where username = ? and password = ?", [username, password]);
      let data = await sails
        .getDatastore(process.env.MYSQL_DATASTORE)
        .sendNativeQuery(sql);
      if(data["rows"].length == 0){
        response = new HttpResponse(
          { msg: "Wrong username or password" },
          { statusCode: 401, error: true }
        );
        res.status(401);
        return res.send(response);
      }
      else{
        response = new HttpResponse(
          data["rows"][0],
          { statusCode: 200, error: false }
        );
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
            let sql = sqlString.format("insert into Staff(id,name,phone,email,role,username,password,dob) values(?,?,?,?,?,?,?,?)", [id,name,phone,email,role,username,password,dob]);
            log(sql);
            await sails
              .getDatastore(process.env.MYSQL_DATASTORE)
              .sendNativeQuery(sql);
        }
        else if(type == 2){
            let sql = sqlString.format("update Staff set name = ?,phone = ?,email = ?,role = ?,dob = ? where id = ?", [name,phone,email,role,dob,id]);
            log(sql);
            await sails
                .getDatastore(process.env.MYSQL_DATASTORE)
                .sendNativeQuery(sql);
        }
        else{
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
            let sql = sqlString.format("insert into Category(name,description) values(?,?)", [name,description]);
            log(sql);
            await sails
              .getDatastore(process.env.MYSQL_DATASTORE)
              .sendNativeQuery(sql);
        }
        else if(type == 2){
            let sql = sqlString.format("update Category set name = ?,description = ? where id = ?", [name,description,id]);
            log(sql);
            await sails
                .getDatastore(process.env.MYSQL_DATASTORE)
                .sendNativeQuery(sql);
        }
        else{
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
    let productId = req.body.productId;
    try {
        if (type == 1) {
            let sql = sqlString.format("insert into Booth(id,name,productId) values(?,?,?)", [id,name,productId]);
            log(sql);
            await sails
              .getDatastore(process.env.MYSQL_DATASTORE)
              .sendNativeQuery(sql);
        }
        else if(type == 2){
            let sql = sqlString.format("update Booth set name = ?,productId = ? where id = ?", [name,productId,id]);
            log(sql);
            await sails
                .getDatastore(process.env.MYSQL_DATASTORE)
                .sendNativeQuery(sql);
        }
        else{
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
            let sql = sqlString.format("insert into Product(name,unit,total,price,categoryId) values(?,?,?,?,?)", [name,unit,total,price,categoryId]);
            log(sql);
            await sails
              .getDatastore(process.env.MYSQL_DATASTORE)
              .sendNativeQuery(sql);
        }
        else if(type == 2){
            let sql = sqlString.format("update Product set name = ?,unit = ?,total = ?,price = ?,categoryId = ? where id = ?", [name,unit,total,price,categoryId,id]);
            log(sql);
            await sails
                .getDatastore(process.env.MYSQL_DATASTORE)
                .sendNativeQuery(sql);
        }
        else{
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
            let sql = sqlString.format("insert into Supplier(name,address,email,phone,tax,website) values(?,?,?,?,?,?)", [name,address,email,phone,tax,website]);
            log(sql);
            await sails
              .getDatastore(process.env.MYSQL_DATASTORE)
              .sendNativeQuery(sql);
        }
        else if(type == 2){
            let sql = sqlString.format("update Supplier set name = ?,address = ?,email = ?,phone = ?,tax = ?,website = ? where id = ?", [name,address,email,phone,tax,website,id]);
            log(sql);
            await sails
                .getDatastore(process.env.MYSQL_DATASTORE)
                .sendNativeQuery(sql);
        }
        else{
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
        let sql = sqlString.format("insert into Invoice(id,staffId,memberId,reducedAmount,total) values(?,?,?,?.?)", [id,staffId,memberId,reducedAmount,total]);
        log(sql);
        let data = await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql);
        let invoiceId = data[insertId];
        for (let index = 0; index < products.length; index++) {
          const element = products[index];
          let sql3 = sqlString.format("insert into ProductInvoice(productId,invoiceId,qty,price) values(?,?,?,?)", [element["id"],invoiceId,element["qty"],element["price"]]);
          log(sql3);
          await sails
            .getDatastore(process.env.MYSQL_DATASTORE)
            .sendNativeQuery(sql3);
          let sql4 = sqlString.format("update Product set total = total - ? where id = ?", [total,id]);
          log(sql4);
          await sails
              .getDatastore(process.env.MYSQL_DATASTORE)
              .sendNativeQuery(sql4);
        }
        if (memberId != "") {
          let priceAfter = total - reducedAmount * 1000;
          let pointEarn = Math.round(priceAfter / 10000) - reducedAmount;
          let sql2 = sqlString.format("update Member set point = point + ? where memberId = ?", [pointEarn, memberId]);
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
        let sql = sqlString.format("insert into Receipt(id,staffId,supplierId,total) values(?,?,?,?)", [id,staffId,supplierId,total]);
        log(sql);
        let data = await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql);
        let receiptId = data[insertId];
        for (let index = 0; index < products.length; index++) {
          const element = products[index];
          let sql3 = sqlString.format("insert into ProductReceipt(productId,receiptId,qty,price) values(?,?,?,?)", [element["id"],receiptId,element["qty"],element["price"]]);
          log(sql3);
          await sails
            .getDatastore(process.env.MYSQL_DATASTORE)
            .sendNativeQuery(sql3);
          let sql4 = sqlString.format("update Product set total = total + ? where id = ?", [total,id]);
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
      response = new HttpResponse(
        data["rows"],
        { statusCode: 200, error: false }
      );
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
      response = new HttpResponse(
        data["rows"],
        { statusCode: 200, error: false }
      );
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
      response = new HttpResponse(
        data["rows"],
        { statusCode: 200, error: false }
      );
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
      response = new HttpResponse(
        data["rows"],
        { statusCode: 200, error: false }
      );
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
      if (data["rows"].length == 0) {
        response = new HttpResponse(
          { msg: "No Invoice Existed" },
          { statusCode: 200, error: false }
        );
      }
      response = new HttpResponse(
        data["rows"][0],
        { statusCode: 200, error: false }
      );
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
      response = new HttpResponse(
        data["rows"],
        { statusCode: 200, error: false }
      );
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
      if (data["rows"].length == 0) {
        response = new HttpResponse(
          { msg: "No Receipt Existed" },
          { statusCode: 200, error: false }
        );
      }
      response = new HttpResponse(
        data["rows"][0],
        { statusCode: 200, error: false }
      );
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
      response = new HttpResponse(
        data["rows"],
        { statusCode: 200, error: false }
      );
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
      if(type == 1){
        let sql = sqlString.format(`SELECT 
        DATE_FORMAT(createdDate, '%Y-%m') AS month,
            SUM(price) AS Revenue
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
        response = new HttpResponse(
          data["rows"],
          { statusCode: 200, error: false }
        );
        return res.ok(response);
      }
      else{
        let sql = sqlString.format(`SELECT 
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
        `,[startDate,endDate]);
        let data = await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql);
        response = new HttpResponse(
          data["rows"],
          { statusCode: 200, error: false }
        );
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
      if(type == 1){
        let response_data = [];
        let sql = sqlString.format(`SELECT 
              productId,
              SUM(qty) AS total_sold
          FROM 
              ProductInvoice
          GROUP BY 
              productId
          ORDER BY 
            total_sold DESC LIMIT 10;    
        `);
        let data = await sails
        .getDatastore(process.env.MYSQL_DATASTORE)
        .sendNativeQuery(sql);
        for (let index = 0; index < data["rows"].length; index++) {
          const element = data["rows"][index];
          let sql2 = sqlString.format("select * from Product where id = ?", [element["productId"]]);
          let data2 = await sails
            .getDatastore(process.env.MYSQL_DATASTORE)
            .sendNativeQuery(sql2);
          let name = data2["rows"][0]["name"];
          let obj = {};
          obj.name = name;
          obj.sum = element["total_sold"];
          response_data.push(obj);
        }
        response = new HttpResponse(
          response_data,
          { statusCode: 200, error: false }
        );
        return res.ok(response);
      }
      else{
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
            let sql2 = sqlString.format(`SELECT 
              SUM(qty) AS total_import
              FROM 
                  ProductReceipt
              WHERE
                productId = ? 
          `,[element["id"]]);
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
        response = new HttpResponse(
          response_data,
          { statusCode: 200, error: false }
        );
        return res.ok(response);
      }
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },
};
