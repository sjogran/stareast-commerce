const express = require("express");
const authController = require("../controller/authController");
const checkoutController = require("../controller/checkoutController");
const healthController = require("../controller/healthController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/checkout", authMiddleware, checkoutController.checkout);
router.get("/healthcheck", healthController.healthcheck);

module.exports = router;
