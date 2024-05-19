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

  "POST /login": "StaffController.login",
  
  "POST /addMember": "UsersController.addMember",
  "POST /updateMember": "UsersController.updateMember",
  "POST /deleteMember": "UsersController.deleteMember",
  "POST /getMember": "UsersController.getMember",
  "POST /getListMember": "UsersController.getListMember",

  "POST /changeProduct": "StaffController.changeProduct",
  "POST /changeCategory": "StaffController.changeCategory",
  "POST /changeSupplier": "StaffController.changeSupplier",

  // "POST /user/logout": "StaffController.logout",
  // "POST /user/sendReview": "StaffController.sendReview",
  // "POST /user/getReview": "StaffController.getReview",
  // "POST /user/addFavourite": "StaffController.addFavourite",
  // "POST /user/getFavourite": "StaffController.getFavourite",

  // "POST /product/getCategory": "ProductController.getCategory",
  // "POST /product/getProductByCategory": "ProductController.getProductByCategory",
  // "POST /product/searchProduct": "ProductController.searchProduct",
  // "POST /product/viewProduct": "ProductController.viewProduct",
  // "POST /product/sendFeedback": "ProductController.sendFeedback",
  // "POST /product/getFeedback": "ProductController.getFeedback",

  // "POST /cart/addProductToCart": "CartController.addProductToCart",
  // "POST /cart/viewCart": "CartController.viewCart",
  // "POST /cart/order": "CartController.order",
  // "POST /cart/viewOrder": "CartController.viewOrder",
  // "POST /cart/listAddress": "CartController.listAddress",
  // "POST /cart/addAddress": "CartController.addAddress",
  // "POST /cart/editAddress": "CartController.editAddress",
  // "POST /cart/deleteAddress": "CartController.deleteAddress",

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
