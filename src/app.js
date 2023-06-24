const expres = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3001;
const app = expres();
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./db/dbConnection");

connectDb();
app.use(expres.json());
app.use("/api/contacts/", require("./routes/ContactRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use(errorHandler);

app.listen(port, () => {
  console.log("successfully started:" + port);
});
