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
    let id = req.body.id;
    let name = req.body.name;
    let phone = req.body.phone;
    let email = req.body.email;
    let role = req.body.role;
    let username = req.body.username;
    let password = req.body.password;
    let dob = req.body.dob;

    try {
        if (type == 1) {
            let sql = sqlString.format("insert into Staff(name,phone,email,role,username,password,dob) values(?,?,?,?,?,?,?)", [name,phone,email,role,username,password,dob]);
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
            "Change Staff Successful",
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
            "Change Category Successful",
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
            "Change Product Successful",
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
            "Change Product Successful",
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
    let staffId = req.body.staffId;
    let memberId = req.body.memberId;
    let reduceAmount = req.body.reduceAmount;

    try {
        let sql = sqlString.format("insert into Invoice(staffId,memberId,reduceAmount) values(?,?,?,?,?,?)", [name,address,email,phone,tax,website]);
        log(sql);
        await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sql);
      
        response = new HttpResponse(
            "Change Product Successful",
            { statusCode: 200, error: false }
        );
        return res.ok(response);
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },
};
