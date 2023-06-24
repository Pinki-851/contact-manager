const { default: mongoose } = require("mongoose");
const mongose = require("mongoose");

const contactSchema = mongose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: { type: String, required: [true, "please enter name"] },
    email: { type: String, required: [true, "please enter name"] },
    mobile: { type: Number, required: [true, "please enter valid number"] },
  },
  { timestamps: true }
);
module.exports = mongose.model("Contact", contactSchema);
