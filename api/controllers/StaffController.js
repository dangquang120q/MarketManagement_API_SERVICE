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
    let id = "NV" + phone.slice(0,8);
    try {
        if (type == 1) {
            let sql = sqlString.format("insert into Staff(id,name,phone,email,role,username,password,dob) values(?,?,?,?,?,?,?,?)", [id,name,phone,email,role,id,dob,dob]);
            log(sql);
            await sails
              .getDatastore(process.env.MYSQL_DATASTORE)
              .sendNativeQuery(sql);
        }
        else if(type == 2){
            let sql = sqlString.format("update Staff set name = ?,phone = ?,email = ?,role = ?,username = ?,password = ?,dob = ? where id = ?", [name,phone,email,role,username,password,dob,id]);
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
  changeProduct: async (req, res) => {
    let response;
    let type = req.body.type;
    let id = req.body.id;
    let name = req.body.name;
    let unit = req.body.unit;
    let total = req.body.total;
    let price = req.body.price;
    let category_id = req.body.category_id;
    try {
        if (type == 1) {
            let sql = sqlString.format("insert into Product(name,unit,total,price,category_id) values(?,?,?,?,?)", [name,unit,total,price,category_id]);
            log(sql);
            await sails
              .getDatastore(process.env.MYSQL_DATASTORE)
              .sendNativeQuery(sql);
        }
        else if(type == 2){
            let sql = sqlString.format("update Product set name = ?,unit = ?,total = ?,price = ?,category_id = ? where id = ?", [name,unit,total,price,category_id,id]);
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
          log(element);
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
          log(element);
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

};
