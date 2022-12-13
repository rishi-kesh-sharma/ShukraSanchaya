// const axios=require("axios")
const catchAsyncErrors = require("../../../middleware/catchAsyncErrors");
const axios = require("axios");

const showAdminDashBoardOverview = (req, res, next) => {
  axios
    .get(`http://localhost:3000/api/admin/overview`, {
      withCredentials: true,
      headers: {
        Cookie: `token=${req.cookies.token}`,
      },
    })
    .then((response) => {
      const overview = response.data;
      console.log(overview);
      res.render("./pages/dashboard/adminDashboard/overview", {
        user: req.user,
        overview,
        showSearchBox: false,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
const showAdminDashBoardAllUser = (req, res, next) => {
  axios
    .get(
      `http://localhost:3000/api/user/admin/all?keyword=${
        req.query.keyword || ""
      }&page=${req.query.page || 1}`,
      {
        withCredentials: true,
        headers: {
          Cookie: `token=${req.cookies.token}`,
        },
      }
    )
    .then((response) => {
      const { users, next, prev, skip } = response.data;
      console.log(response.data);
      res.render("./pages/dashboard/adminDashboard/allUser", {
        user: req.user,
        users,
        next,
        prev,
        skip,
        showSearchBox: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
const showAdminDashBoardAllAppointments = (req, res, next) => {
  axios
    .get(
      `http://localhost:3000/api/appointment/admin/all?keyword=${
        req.query.keyword || ""
      }&page=${req.query.page || 1}`,
      {
        withCredentials: true,
        headers: {
          Cookie: `token=${req.cookies.token}`,
        },
      }
    )
    .then((appointmentResponse) => {
      const { appointments, prev, next, skip } = appointmentResponse.data;
      //    console.log(appointments)
      res.render("./pages/dashboard/adminDashboard/allAppointments", {
        user: req.user,
        appointments,
        prev,
        next,
        skip,
        showSearchBox: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
const showAdminDashBoardAllHospitals = (req, res, next) => {
  axios
    .get(
      `http://localhost:3000/api/hospital/all?keyword=${
        req.query.keyword || ""
      }&page=${req.query.page || 1}`,
      {
        withCredentials: true,
        headers: {
          Cookie: `token=${req.cookies.token}`,
        },
      }
    )
    .then((response) => {
      const { hospitals, prev, next, skip } = response.data;
      res.render("./pages/dashboard/adminDashboard/allHospitals", {
        user: req.user,
        hospitals,
        next,
        prev,
        skip,
        showSearchBox: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
const showAdminDashBoardAllDonors = (req, res, next) => {
  axios
    .get(
      `http://localhost:3000/api/donor/admin/all?keyword=${
        req.query.keyword || ""
      }&page=${req.query.page || 1}`,
      {
        withCredentials: true,
        headers: {
          Cookie: `token=${req.cookies.token}`,
        },
      }
    )
    .then((response) => {
      const { donors, prev, next, skip } = response.data;
      res.render("./pages/dashboard/adminDashboard/allDonors", {
        user: req.user,
        donors,
        next,
        prev,
        skip,
        showSearchBox: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
const showAdminDashBoardAllContacts = (req, res, next) => {
  axios
    .get(
      `http://localhost:3000/api/contact/admin/all?keyword=${
        req.query.keyword || ""
      }&page=${req.query.page || 1}`,
      {
        withCredentials: true,
        headers: {
          Cookie: `token=${req.cookies.token}`,
        },
      }
    )
    .then((response) => {
      const { contacts, next, prev, skip } = response.data;
      res.render("./pages/dashboard/adminDashboard/allContacts", {
        user: req.user,
        contacts,
        next,
        prev,
        skip,
        showSearchBox: false,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const showAdminDashBoardRegisterHospital = (req, res, next) => {
  res.render("./pages/dashboard/adminDashboard/registerHospital", {
    user: req.user,
    showSearchBox: false,
  });
};

//    register hospital form process
const processRegisterHospitalForm = (req, res, next) => {
  const {
    name,
    email,
    phone,
    address,
    avatar,
    estd,
    description,
    password,
    confirmPassword,
  } = req.body;
  const userInfo = {
    name,
    email,
    phone,
    address,
    avatar,
    password,
    confirmPassword,
  };
  const hospitalInfo = { estd, description };
  req.body.hospitalInfo = hospitalInfo;
  req.body.userInfo = userInfo;
  axios
    .post(`http://localhost:3000/api/hospital/admin/register`, req.body, {
      withCredentials: true,
      headers: {
        Cookie: `token=${req.cookies.token}`,
      },
    })
    .then((response) => {
      res.redirect("/dashboard/admin/users/all?page=1");
    })
    .catch((err) => {
      console.log(err.response);
      console.log("error message is here " + +err.response.status);
      res.render("./pages/error/error", {
        message: "this is error",
        status: err.response.status,
      });
    });
};
module.exports = {
  showAdminDashBoardOverview,
  showAdminDashBoardAllUser,
  showAdminDashBoardAllAppointments,
  showAdminDashBoardAllHospitals,
  showAdminDashBoardAllDonors,
  showAdminDashBoardAllContacts,
  showAdminDashBoardRegisterHospital,
  processRegisterHospitalForm,
};
