const express = require("express");

const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all the books
 * Access: Public
 * Parmanters: none
 */
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: books,
    });
});

/**
 * Route: /books/:id
 * /users/2
 * Method: GET
 * Description: Get single book by their id
 * Access: Public
 * Parmanters: id
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === id);
  if (!book) {
    res.status(404).json({
      success: false,
      message: "book Not Found",
    });
  } else {
    res.status(200).json({
      success: true,
      data: book,
    });
  }
});

/**
 * Route: /books/issued/by-user
 * /users/2
 * Method: GET
 * Description: Get all issued book
 * Access: Public
 * Parmanters: none
 */

router.get('/issued/by-user',(req,res)=>{

const usersWithIssuedBook =users.filter((each)=>{
    if(each.issuedBook) return each;
});

const issuedBooks =[];
usersWithIssuedBook.forEach((each)=>{
    const book =books.find((book)=> book.id===each.issuedBook);
 
    book.issuedBy =each.name;
    book.issuedDate =each.issuedDate;
    book.returnDate =each.returnDate;

    issuedBooks.push(book);
});

if(issuedBooks.length===0){
    return res.status(404).json({success:false,message:"no books has been issued!!"});
}
return res.status(200).json({success:true,data:issuedBooks});
});

/**
 * Route: /books
 * /users/2
 * Method: POST
 * Description: insert new book
 * Access: Public
 * Parmanters: none
 */
router.post("/", (req, res) => {
  const {data} = req.body;

  if (!data) {
    return res.status(400).json({
      success: false,
      message: "No data has provided",
    });
  }
    const book = books.find((each) => each.id === data.id);
    if (book) {
      return res.status(400).json({
        success: false,
        message: "book already exist!!!!",
      });
    }


  const allBooks= [...books,data];

  return res.status(200).json({
    success: true,
    data: allBooks,
  });
});


/**
 * Route: /books/:id
 * Method: PUT
 * Description: Updating a book data
 * Access: Public
 * Parmanters: id
 */

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const book = books.find((each) => each.id === id);

  if (!book)
      return res.status(404).json({
          success: false,
          message: "book Not Found"
      });

  const UpdatedData = books.map((each) => {
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
    data: UpdatedData,
  });
});




// default export

module.exports = router;
