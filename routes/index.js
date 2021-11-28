var express = require("express");
var router = express.Router();
var testimonialController = require("../controller/testimonialcontroller");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/testimonial", testimonialController.createTestimonial);
router.get("/testimonial", testimonialController.getTestimonial);
router.delete('/testimonial/:id',testimonialController.deleteTestimonial);
router.put("/testimonial/:id", testimonialController.updateTestimonial);

module.exports = router;
