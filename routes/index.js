const User = require("../models/user.model");
const Product = require("../models/product.model");
var express = require("express");

var router = express.Router();

router.get("/generateUsers", async function (req, res, next) {
  const newUser1 = new User({
    Firstname: "amine",
    Lastname: "ennour",
    email: "amine@gmail.com",
    password: "123456789789",
    confirmPassword: "123456789789",
    phone: "123456789789",
  });
  const newUser2 = new User({
    Firstname: "mohamed",
    Lastname: "ennour",
    email: "mohamed@gmail.com",
    password: "123456789789",
    confirmPassword: "123456789789",
    phone: "1234567897894",
  });
  const newUser3 = new User({
    Firstname: "med amine",
    Lastname: "nour",
    email: "med.amine@gmail.com",
    password: "123456789789",
    confirmPassword: "123456789789",
    phone: "1234567897893",
  });
  await newUser1.save();
  await newUser2.save();
  await newUser3.save();
  res.json({ status: "Generate Users Done" });
});

router.get("/generateProducts", async function (req, res, next) {
  const newProduct1 = new Product({
    name: "product1",
    description: "product1",
    image: "product1.png",
    code: "123",
  });
  const newProduct2 = new Product({
    name: "product2",
    description: "product2",
    image: "product2.png",
    code: "456",
  });
  const newProduct3 = new Product({
    name: "product3",
    description: "product3",
    image: "product3.png",
    code: "789",
  });
  await newProduct1.save();
  await newProduct2.save();
  await newProduct3.save();
  res.json({ status: "Generate Products Done" });
});

module.exports = router;
