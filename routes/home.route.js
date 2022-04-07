const router = require("express").Router();
const { homeGetController, homePostController } = require("../controllers/home.controller");

router.get("/", homeGetController);
router.post("/add", homePostController);

module.exports = router;
