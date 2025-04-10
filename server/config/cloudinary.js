const cloudinary = require("cloudinary").v2
require("dotenv").config();

cloudinary.config({
    cloud_name: 'dyz0ncdw0',
    api_key: '614752597711886',
    api_secret: "bR-h_yjhxGary7Fra8zw-36BGJg",
})

module.exports = cloudinary