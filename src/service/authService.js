const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByEmail, createUser } = require("../model/userModel");

const JWT_SECRET = process.env.JWT_SECRET || "simple-secret";

function register({ name, email, password }) {
  if (!name || !email || !password) {
    throw new Error("Name, email and password are required");
  }

  const existingUser = findUserByEmail(email);
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = createUser({ name, email, password: hashedPassword });

  return {
    id: user.id,
    name: user.name,
    email: user.email
  };
}

function login({ email, password }) {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValidPassword = bcrypt.compareSync(password, user.password);
  if (!isValidPassword) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
  return { token };
}

module.exports = {
  register,
  login,
  JWT_SECRET
};
