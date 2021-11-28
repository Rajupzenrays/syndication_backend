// const multer  = require('multer');

var Testimonial = require("../model/testimonial");



exports.createTestimonial = function (req, res, next) {
  var testimonialOb = new Testimonial({
    id: req.body.id,
    name: req.body.name,
    tDescription: req.body.tDescription,
    createdOn: req.body.createdOn,
    lastUpdatedOn: req.body.lastUpdatedOn,
    email: req.body.email,
  });
  testimonialOb.save((err) => {
    if (err) {
      console.log("Author cant save", err);
    } else console.log("Author saved successfully");
  });
};

exports.getTestimonial = function (req, res, next) {
  Testimonial.find().then((testimonial_list, err) => {
    console.log(testimonial_list);
    res.json({ data: testimonial_list });
  });
};




exports.updateTestimonial = (req, res) => {
  Testimonial.findByIdAndUpdate(
    req.params.id,
    {
      id: req.body.id,
      image: req.file.image,
      name: req.body.name,
      tDescription: req.body.tDescription,
      createdOn: req.body.createdOn,
      lastUpdatedOn: req.body.lastUpdatedOn,
      email: req.body.email,
    },
    { new: true }
  )
    .then((testimonialOb) => {
      if (!testimonialOb) {
        return res.status(404).send({
          message: "Testimonial not found with id " + req.params.id,
        });
      }
      res.send(testimonialOb);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Testimonial not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error updating testimonialOb with id " + req.params.id,
      });
    });
};



exports.deleteTestimonial = function (req, res, next) {
  Testimonial.findById(req.params.id)
    .remove()
    .exec(function () {
      res.json({ msg: "Testimonial Deleted" });
    });
};

