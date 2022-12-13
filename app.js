const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const ejs = require("ejs");
const methodOverride = require("method-override");

const authRouter = require("./server/routes/apiRoutes/authRoutes");
const userRouter = require("./server/routes/apiRoutes/userRoutes.js");
const donorRouter = require("./server/routes/apiRoutes/donorRoutes.js");
const appointmentRouter = require("./server/routes/apiRoutes/appointmentRoutes");
const contactRouter = require("./server/routes/apiRoutes/contactRoutes");
const hospitalRouter = require("./server/routes/apiRoutes/hospitalRoutes");
const adminRouter = require("./server/routes/apiRoutes/adminRoutes.js");
const errorMiddlware = require("./server/middleware/error");

const renderRouter = require("./server/routes/renderRoutes/generalRoutes/routes.js");
const actionRouter = require("./server/routes/actionRoutes/actionRoutes");
const adminDashBoardRenderRouter = require("./server/routes/renderRoutes/dashboardRoutes/adminDashboardRouter");
const clientDashBoardRenderRouter = require("./server/routes/renderRoutes/dashboardRoutes/clientDashboardRouter");
const donorDashboardRenderRouter = require("./server/routes/renderRoutes/dashboardRoutes/donorDashboardRouter");
const hospitalDashboardRenderRouter = require("./server/routes/renderRoutes/dashboardRoutes/hospitalDashboardRouter");
const {
  isAuthenticatedUser,
  authorizeRoles,
  isClientUserOnly,
} = require("./server/middleware/auth.js");
// handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the sever due to uncaught exception `);
  process.exit(1);
});

const app = express();

//ERROR MIDDLEWARE
app.use(errorMiddlware);

//CONFIGURE DOTENV
dotenv.config({ path: "./config.env" });
//static files

// moment configuration

var moment = require("moment");
const User = require("./server/model/user");
var shortDateFormat = "ddd @ h:mmA";
app.locals.moment = moment;
app.locals.shortDateFormat = shortDateFormat;

//using static files
const staticPath = path.join(__dirname, "./static");
app.use(express.static(staticPath));
const PORT = process.env.PORT || 8000;

//view engine
const templatePath = path.join(__dirname, "./views/pages");

app.set("view engine", "ejs");
// ejs.views("views",templatePath)

//parse json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
app.use(express.json());

// cors

app.use(cors());
app.use(cookieParser());

//database connection
require("./server/database/conn");

// auth middleware isAuthenticatedUser

//all the routes

app.use("/api/auth", authRouter);
app.use("/api/user", isAuthenticatedUser, userRouter);
app.use("/api/donor", isAuthenticatedUser, donorRouter);
app.use("/api/appointment", isAuthenticatedUser, appointmentRouter);
app.use("/api/hospital", isAuthenticatedUser, hospitalRouter);
app.use("/api/contact", isAuthenticatedUser, contactRouter);
app.use("/api/admin", isAuthenticatedUser, adminRouter);

// render admin dashboard routes

app.use(
  "/dashboard/admin",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  adminDashBoardRenderRouter
);
app.use(
  "/dashboard/client",
  isAuthenticatedUser,
  isClientUserOnly,
  clientDashBoardRenderRouter
);
app.use(
  "/dashboard/donor",
  isAuthenticatedUser,
  authorizeRoles("donor"),
  donorDashboardRenderRouter
);
app.use(
  "/dashboard/hospital",
  isAuthenticatedUser,
  authorizeRoles("hospital"),
  hospitalDashboardRenderRouter
);

// use render routes

app.use(renderRouter);

//listening to the server

// action routes
app.use("/action", actionRouter);

app.listen(PORT, () => {
  console.log("server running in port " + PORT);
});

// handling unhandled rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the sever due to unhandled promise  rejection `);
  app.close(() => {
    process.exit(1);
  });
});
