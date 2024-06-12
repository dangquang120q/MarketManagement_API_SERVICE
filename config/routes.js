/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  "/": { view: "pages/homepage" },

  
  "POST /addMember": "UsersController.addMember",
  "POST /updateMember": "UsersController.updateMember",
  "POST /deleteMember": "UsersController.deleteMember",
  "POST /getMember": "UsersController.getMember",
  "POST /getListMember": "UsersController.getListMember",
  
  "POST /login": "StaffController.login",
  "POST /changeProduct": "StaffController.changeProduct",
  "POST /changeCategory": "StaffController.changeCategory",
  "POST /changeBooth": "StaffController.changeBooth",
  "POST /changeSupplier": "StaffController.changeSupplier",
  "POST /changeStaff": "StaffController.changeStaff",

  "POST /createInvoice": "StaffController.createInvoice",
  "POST /createReceipt": "StaffController.createReceipt",

  "POST /getListStaff": "StaffController.getListStaff",
  "POST /getListProduct": "StaffController.getListProduct",
  "POST /getListShipment": "StaffController.getListShipment",
  "POST /getListCategory": "StaffController.getListCategory",
  "POST /getListSupplier": "StaffController.getListSupplier",
  "POST /getListInvoice": "StaffController.getListInvoice",
  "POST /getListReceipt": "StaffController.getListReceipt",
  "POST /getInvoice": "StaffController.getInvoice",
  "POST /getReceipt": "StaffController.getReceipt",
  "POST /getListBooth": "StaffController.getListBooth",
  "POST /getListExcessProduct": "StaffController.getListExcessProduct",
  "POST /cancelProduct": "StaffController.cancelProduct",
  "POST /releaseProduct": "StaffController.releaseProduct",
  "POST /changeProductPromotional": "StaffController.changeProductPromotional",
  "POST /changePromotional": "StaffController.changePromotional",

  "POST /statistics": "StaffController.statistics",
  "POST /productStatistics": "StaffController.productStatistics",
  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
