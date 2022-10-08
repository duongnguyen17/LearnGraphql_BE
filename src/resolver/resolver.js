const Author = require("../models/Author");
const Book = require("../models/Book");
const resolver = {
  //Query
  Query: {
    books: async () => {
      return await Book.find();
    },
    book: async (parent, args) => {
      const allBooks = await Book.find();
      return allBooks.find((book) => book.id == args.id);
    },
    authors: async () => {
      return await Author.find();
    },
    author: async (parent, args) => {
      const allAuthors = await Author.find();
      return allAuthors.find((author) => author.id == args.id);
    },
  },
  Book: {
    author: async (parent, args) => {
      const allAuthors = await Author.find();
      return allAuthors.find((author) => author.id == parent.authorId);
    },
  },
  Author: {
    books: async (parent, args) => {
      const allBooks = await Book.find();
      return allBooks.filter((book) => book.authorId == parent.id);
    },
  },

  // Mutation
  Mutation: {
    createAuthor: async (parent, args) => {
      try {
        //kiểm tra nhà văn không được trùng tên
        const allAuthors = await Author.find();
        // console.log("allAutohr", allAuthors);
        const isHas = allAuthors.find((author) => author.name === args.name);
        if (!!isHas) {
          return Error("Tác giả này đã có trong hệ thống");
        }
        const newAuthor = new Author(args);
        await newAuthor.save();
        return { id: newAuthor._id.toString() };
      } catch (error) {
        return Error(error.message);
      }
    },
    createBook: async (parent, args) => {
      try {
        //kiểm tra sách không được trùng tên
        const allBooks = await Book.find();
        // console.log("allAutohr", allAuthor);
        const isHasBook = allBooks.find((book) => book.name === args.name);
        if (!!isHasBook) {
          return Error("Sách này đã có trong hệ thống");
        }
        //kiểm tra tác giả có trong hệ thống khoong
        const author = await Author.findById(args.authorId);

        if (!author) {
          return Error("Tác giả này không có trong hệ thống");
        }
        const newBook = new Book(args);
        await newBook.save();
        return { id: newBook._id.toString() };
      } catch (error) {
        return Error(error.message);
      }
    },
  },
};

module.exports = resolver;
