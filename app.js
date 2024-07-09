const app = require("express");
const mongoose = require("mongoose");
const cors =require("cors");
const server = app();
const port = 3000;
const AppRoutes = require("./router/Approute");
const MONGODB_URL = `mongodb+srv://riya_singh_13:admin13@zomato-clone.ky1hcxs.mongodb.net/clone?retryWrites=true&w=majority&appName=Zomato-clone`;
// when post data is disable post body so enable is use middleware
server.use(cors())
server.use(app.json()); // for json type
server.use(app.urlencoded({ extended: false })); // from data and other format
server.use("/api", AppRoutes);
mongoose.connect(MONGODB_URL)
  .then(() => {
    console.log("connected to database");
    server.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });


