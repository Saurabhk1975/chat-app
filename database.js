const mongoose = require("mongoose");
// here nodejstutorial is the name of database which  will be created in database
mongoose
  .connect("mongodb://127.0.0.1:27017/chatForInternship")
  .then(() => {
    console.log("connection established to database");
  })
  .catch((e) => {
    console.log(e);
  });

const schema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  correctedMessage: {
    type: String,
  },
});

// user details is inside the database name of collection
const user = mongoose.model("user_details", schema);
module.exports = user;
