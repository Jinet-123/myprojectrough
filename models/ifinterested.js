const mongoose = require("mongoose")

const interestedSchema = new mongoose.Schema({
  sellerEmail: {
    type: String,
    required: true
  },
  propertyId: {
    type: String,
    required: true
  },
  interestedName: {
    type: String,
    required: true
  },
  interestedEmail: {
    type: String,
    required: true
  },
  interestedPhone: {
    type: String,
    required: true
  },
  interestedMessage: {
    type : String
  }
})

module.exports = mongoose.model("Interested", interestedSchema)
