const express = require("express");
const {
  getAllbooks,
  getSingleBookbyId,
  getAllIssuedbooks,
  addNewBook,
  updateBookById,
} = require("../controllers/book-controller");

const { books } = require("../data/books.json");
const { users } = require("../data/users.json");


const { UserModel, BookModel } = require("../models");


const router = express.Router();




/**
 * Route: /books
 * Method: GET
 * Description: Get all the books
 * Access: Public
 * Parmanters: none
 */
// router.get("/", (req, res) => {
//     res.status(200).json({
//         success: true,
//         data: books,
//     });
// });

router.get("/", getAllbooks);

/**
 * Route: /books/:id
 * /users/2
 * Method: GET
 * Description: Get single book by their id
 * Access: Public
 * Parmanters: id
 */
// router.get("/:id", (req, res) => {
//   const { id } = req.params;
//   const book = books.find((each) => each.id === id);
//   if (!book) {
//     res.status(404).json({
//       success: false,
//       message: "book Not Found",
//     });
//   } else {
//     res.status(200).json({
//       success: true,
//       data: book,
//     });
//   }
// });


router.get("/:id",getSingleBookbyId );

/**
 * Route: /books/issued/by-user
 * /users/2
 * Method: GET
 * Description: Get all issued book
 * Access: Public
 * Parmanters: none
 */


router.get("/issued/by-user",getAllIssuedbooks);

/**
 * Route: /books
 * /users/2
 * Method: POST
 * Description: insert new book
 * Access: Public
 * Parmanters: none
 */
router.post("/", addNewBook);


/**
 * Route: /books/:id
 * Method: PUT
 * Description: Updating a book data
 * Access: Public
 * Parmanters: id
 */

router.put("/:id", updateBookById);




// default export

module.exports = router;
