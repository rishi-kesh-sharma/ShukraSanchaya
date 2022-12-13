const { sendResponse } = require("./sendResponse");

// create token and saving in cookie
const sendToken = async (res) => {
  const token = await res.user.getJWTToken();
  payload = {
    success: true,
    message: "user logged in!!!",
    token,
    action: "login",
  };
  sendResponse(res, 200, payload);
};
module.exports = sendToken;
