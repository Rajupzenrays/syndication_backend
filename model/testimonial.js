var mongoose = require("mongoose");

var TestimonialSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
  name: { type: String, required:true },
  tDescription:{type: String},
  createdOn:{type: Date},
  lastUpdatedOn:{type: Date},
  email: { type: String, required: true },
});

module.exports = mongoose.model("Testimonial", TestimonialSchema);
