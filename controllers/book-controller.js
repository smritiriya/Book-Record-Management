const { UserModel, BookModel } = require("../models");

const IssuedBook = require("./dtos/book-dto");


   exports.getAllbooks = async (req, res) => {
     const books = await BookModel.find();

     if (books.length === 0) {
       return res.status(404).json({
         success: false,
         message: "NO BOOK FOUND!",
       });
     }
     res.status(200).json({
       success: true,
       data: books,
     });
   };

 exports.getSingleBookbyId = async (req, res) => {
  const { id } = req.params;
//   const book = books.find((each) => each.id === id);
     
   const book = await BookModel.findById(id);
     
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
};


 exports.getAllIssuedbooks = async (req, res) => {
     const users = await BookModel.find({
       issuedBook: { $exists: true },
     }).populate("issuedBook");
    
     const issuedBooks = users.map((each) => new IssuedBook(each));
     




    if (issuedBooks.length === 0) {
        return res.status(404).json({ success: false, message: "no books has been issued!!" });
    }
    return res.status(200).json({ success: true, data: issuedBooks });
};

 exports.addNewBook = async (req, res) => {
   const { data } = req.body;

   if (!data) {
     return res.status(400).json({
       success: false,
       message: "No data has provided",
     });
   }
   await BookModel.create(data);

   const allBooks = await BookModel.find();

  //  if (book) {
  //    return res.status(400).json({
  //      success: false,
  //      message: "book already exist!!!!",
  //    });
  //  }
   return res.status(200).json({
     success: true,
     data: allBooks,
   });
 };

 exports.updateBookById = async (req, res) => {
   const { id } = req.params;
   const { data } = req.body;
   
   const updatedBook = await BookModel.findOneAndUpdate({ _id: id }, data, {
     new: true,
   });

   return res.status(200).json({
     success: true,
     data: updatedBook,
   });
 };



// module.exports = { getAllbooks, getSingleBookbyId };
