require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./utils/connectDB");
const config = require("./configurations/config");
app.use(express.json());
const router = require("./router/CreateUser");
const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", router);

connectDB()
  .then(() => {
    console.log("Connected to database...");

    // const foodCollection = mongoose.connection.db.collection("food_items");
    // foodCollection.find({}).toArray(function (err, data) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log(data);
    //   }
    // });

    const port = config.PORT || 4000;
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log("Error!! connecting database....");
    console.error(err.message);
  });
