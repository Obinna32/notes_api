//Use to test creation of user

require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./src/models/User");
(async () => {
 await mongoose.connect(process.env.MONGODB_URI);
 const u = await User.create({ name: "Ada", email: "ADA@mail.com", password: "password123" });
 console.log(u); // email is lower-case, no password shown
 const raw = await User.findOne({ email: "ada@mail.com" }).select("+password");
 console.log(raw.password); // a long $2a$12$... hash
 await User.deleteMany({}); // clean up
 await mongoose.disconnect();
})();