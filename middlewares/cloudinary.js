// IMPORT REQUIRE MODULE HERE
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: "nassec",
  api_key: "834263683184984",
  api_secret: "jkLLW7EsyCE-HwC-QIA2s9GYU9M",
  secure: true,
});

module.exports = cloudinary;
