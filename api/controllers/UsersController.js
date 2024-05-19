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
  addMember: async (req, res) => {
    log("Signup from addMember: " + JSON.stringify(req.body));
    let name = req.body.name;
    let gender = req.body.gender;
    let dob = req.body.dob;
    try {
      let sql = sqlString.format("select * from Member where name = ?", [name]);
      let data = await sails
        .getDatastore(process.env.MYSQL_DATASTORE)
        .sendNativeQuery(sql);
      if(data["rows"].length != 0){
        response = new HttpResponse(
          { msg: "Name existed" },
          { statusCode: 402, error: true }
        );
        res.status(402);
        return res.send(response);
      }
      else{
        let sqlInsertUser = sqlString.format("insert into Member(name,gender,dob) values(?,?,?)", [name,gender,dob]);
        await sails
          .getDatastore(process.env.MYSQL_DATASTORE)
          .sendNativeQuery(sqlInsertUser);
        response = new HttpResponse(
          { msg: "Add Member successful" },
          { statusCode: 200, error: false }
        );
        return res.ok(response);
      }
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },
  updateMember: async (req, res) => {
    let response;
    let name = req.body.name;
    let gender = req.body.gender;
    let dob = req.body.dob;
    let point = req.body.point;
    let member_id = req.body.member_id;
    try {
      let sqlUpdate = sqlString.format("update Member set name = ?,gender = ?,dob = ?,point = ? where id = ?", [name,gender,dob,point,member_id]);
      await sails
        .getDatastore(process.env.MYSQL_DATASTORE)
        .sendNativeQuery(sqlUpdate);
      response = new HttpResponse(
        "Change Info Successful",
        { statusCode: 200, error: false }
      );
      return res.ok(response);
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },
  deleteMember: async (req, res) => {
    console.log(123);
    let response;
    let member_id = req.body.member_id;
    try {
      let sql = sqlString.format("delete from Member where id = ?", [member_id]);
      await sails
        .getDatastore(process.env.MYSQL_DATASTORE)
        .sendNativeQuery(sql);
      response = new HttpResponse(
        "Delete Successful",
        { statusCode: 200, error: false }
      );
      return res.ok(response);
    } catch (error) {
      return res.serverError("Something bad happened on the server: " + error);
    }
  },
  getMember: async (req, res) => {
    let response;
    let name = req.body.name;
    try {
      let sql = sqlString.format("select * from Member where name = ?", [name]);
      let data = await sails
        .getDatastore(process.env.MYSQL_DATASTORE)
        .sendNativeQuery(sql);
      if (data["rows"].length == 0) {
        response = new HttpResponse(
          "No User Existed",
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
  getListMember: async (req, res) => {
    let response;
    try {
      let sql = sqlString.format("select * from Member");
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
  }
};
