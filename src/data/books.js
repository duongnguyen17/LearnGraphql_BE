const { Genre } = require("../common/constants");

const books = [
  {
    id: 1,
    name: "sherlock homels",
    genre: Genre.Adventure,
    authorId: 1,
  },
  {
    id: 2,
    name: "50 sắc thái",
    genre: Genre.Sex,
    authorId: 3,
  },
  {
    id: 3,
    name: "Nhà giả kim",
    genre: Genre.Adventure,
    authorId: 2,
  },
  {
    id: 4,
    name: "Kim Bình Mai",
    genre: Genre.Sex,
    authorId: 2,
  },
];

module.exports = books;
