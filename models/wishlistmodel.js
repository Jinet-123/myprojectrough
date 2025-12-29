const mongoose = require("mongoose")


const wishlistSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true
    },
    propertyId: {
      type: String,
      required: true
    },
    propertyTitle: String,
    propertyPrice: String,
    propertyImage: String
  },
  
)

module.exports = mongoose.model("wishlist", wishlistSchema)
