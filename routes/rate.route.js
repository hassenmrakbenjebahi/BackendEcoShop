const express = require("express");
const router = express.Router();
const {
  getRates,
  getRatesByUser,
  getRatesByProduct,
  getRateById,
  createRate,
  editRate,
  deleteRate,
} = require("../controllers/rate.controller");

router.get("/", getRates);

router.get("/getRatesByUser/:user", getRatesByUser);

router.get("/getRatesByProduct/:product", getRatesByProduct);

router.get("/:id", getRateById);

router.post("/", createRate);

router.put("/:id", editRate);

router.delete("/:id", deleteRate);

module.exports = router;
