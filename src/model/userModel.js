const bcrypt = require("bcryptjs");

let users = [
  { id: 1, name: "Alice", email: "alice@example.com", password: bcrypt.hashSync("alice123", 10) },
  { id: 2, name: "Bob", email: "bob@example.com", password: bcrypt.hashSync("bob123", 10) },
  { id: 3, name: "Carol", email: "carol@example.com", password: bcrypt.hashSync("carol123", 10) }
];

function getUsers() {
  return users;
}

function findUserByEmail(email) {
  return users.find((user) => user.email === email);
}

function createUser({ name, email, password }) {
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password
  };

  users.push(newUser);
  return newUser;
}

module.exports = {
  getUsers,
  findUserByEmail,
  createUser
};
