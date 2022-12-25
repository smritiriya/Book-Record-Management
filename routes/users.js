 // const express = require("express");
// const { users } = require("./data/users.json");

// const router = express.Router();

// // router.get("", () => {
    
// // })  

// /* 
// route:/users
// method :/GET
// description:get all the users
// access:public
// parameters:none

// */
// router.get("/users", (req, res) => {
//   res.status(200).json({
//     success: true,
//     data: users,
//   });
// });
// /*
// route:/users/:id
// method :/GET
// description:get single  user by their id
// access:public
// parameters:id

// */
// router.get("/users/:id", (req, res) => {
//   const { id } = req.params;
//   const user = users.find((each) => each.id === id);
//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "user not found!!!",
//     });
//   } else {
//     return res.status(200).json({
//       success: true,
//       data: user,
//     });
//   }
// });
// /*
// route:/users
// method :POST
// description:create new  user by their id
// access:public
// parameters:none
// */
// router.post("/users", (req, res) => {
//   const { id, name, surname, email, subscriptionType, subscriptionDate } =
//     req.body;
//   const user = users.find((each) => each.id === id);

//   if (user) {
//     return res.status(404).json({
//       success: false,
//       message: "User already exist!!!",
//     });
//   } else {
//     users.push({
//       id,
//       name,
//       surname,
//       email,
//       subscriptionType,
//       subscriptionDate,
//     });
//     return res.status(200).json({
//       success: true,
//       data: users,
//     });
//   }
// });

// /*
// route:/users/:id
// method :PUT
// description:updating    user data by their id
// access:public
// parameters:id

// */

// router.put("/users/:id", (req, res) => {
//   const { id } = req.params;
//   const { data } = req.body;
//   const user = users.find((each) => each.id === id);

//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "User NOT found!!!",
//     });
//   }

//   const updatedUser = users.map((each) => {
//     if (each.id === id) {
//       return {
//         ...each,
//         ...data,
//       };
//     }
//     return each;
//   });
//   return res.status(200).json({
//     success: true,
//     data: updatedUser,
//   });
// });
      

// /*
// route:/users/:id
// method :DELETE
// description:deleting    user data by their id
// access:public
// parameters:id

// */
// router.delete("/users/:id", (req, res) => {
//   const { id } = req.params;
//   const { data } = req.body;
//   const user = users.find((each) => each.id === id);

//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "User to be deleted  NOT found!!!",
//     });
//   }
//   const index = users.indexOf(user);
//   users.splice(index, 1);

//   return res.status(200).json({ success: true, data: users });
// });


// // default export
// module.exports = router;



//---------------------------------------------------------------------------------

const express = require("express");
// const { append } = require("express/lib/response");
const { users } = require("../data/users.json");

const router = express.Router();

/**
 * Route: /users
 * Method: GET
 * Description: Get all the users
 * Access: Public
 * Parmanters: none
 */
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

/**
 * Route: /users/:id
 * /users/2
 * Method: GET
 * Description: Get single user by their id
 * Access: Public
 * Parmanters: id
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    res.status(404).json({
      success: false,
      message: "User Not Found",
    });
  } else {
    res.status(200).json({
      success: true,
      data: user,
    });
  }
});

/**
 * Route: /users
 * Method: POST
 * Description: Create a new user
 * Access: Public
 * Parmanters: none
 */
router.post("/", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;
  const user = users.find((each) => each.id === id);

  if (user) {
    return res.status(404).json({
      success: false,
      message: "User alreadry exist",
    });
  }
  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });
  return res.status(201).json({
    success: true,
    data: users,
  });
});


/**
 * Route: /users/:id
 * Method: PUT
 * Description: Updating a user data
 * Access: Public
 * Parmanters: id
 */

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const user = users.find((each) => each.id === id);

  if (!user)
    return res.status(404).json({ success: false, message: "User Not Found" });

  const UpdatedUser = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    data: UpdatedUser,
  });
});

/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Deleting a user by their id
 * Access: Public
 * Parmanters: id
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User to be deleted is not found",
    });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);

  return res.status(200).json({ success: true, data: users });
});

router.get("/subscription-details/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((each) => each.id === id);

  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });

  const getDateInDays = (data = "") => {
    let date;
    if (data === "") {
      // current data
      date = new Date();
    } else {
      // getting date on basics of variable
      date = new Date(data);
    }
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };

  const subscriptionType = (date) => {
    if (user.subscriptionType === "Basic") {
      date = date + 90;
    } else if (user.subscriptionType === "Standard") {
      date = date + 180;
    } else if (user.subscriptionType === "Premium") {
      date = date + 365;
    }
    return date;
  };
  // subscription calc here
  // Jan 1, 1970
  let returnDate = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);

  const data = {
    ...user,
    subscriptionExpired: subscriptionExpiration < currentDate,
    daysLeftForExpiration:
      subscriptionExpiration <= currentDate
        ? 0
        : subscriptionExpiration - currentDate,
    fine:
      returnDate < currentDate
        ? subscriptionExpiration <= currentDate
          ? 200
          : 100
        : 0,
  };
  return res.status(200).json({ success: true, data });
});





// deafult export
module.exports = router;