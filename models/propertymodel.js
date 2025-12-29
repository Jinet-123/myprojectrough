const mongoose = require("mongoose")

const propertyschema = new mongoose.Schema({
    propertytitle : {
        type : String,
        required : true,
    },
    propertytype : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true
    },
    selecttype : {
        type : String,
        required : false
    },
    area : {
        type : String,
        required : false
    },
    plotwidth : {
        type : String,
        required : false
    },
    plotlength : {
        type : String,
        required : false
    },
    facingdirection : {
        type : String,
        required : false
    },
    roadwidth : {
        type : String,
        required : false
    },
    price : {
        type : String,
        required : false
    },
    priceperunit : {
        type : String,
        required : false
    },
    location : {
        type : String,
        required : false
    },
    wateravailability : {
        type : String,
        required : false
    },
    electricity : {
        type : String,
        required : false
    },
    fencing : {
        type : String,
        required : false
    },
    address : {
        type : String,
        required : false
    },
    bhk : {
        type : String,
        required : false
    },
    builtuparea : {
        type : String,
        required : false
    },
    carpetarea : {
        type : String,
        required : false
    },
    plotarea : {
        type : String,
        required : false
    },
    bedrooms : {
        type : String,
        required : false
    },
    bathrooms : {
        type : String,
        required : false
    },
    balconies : {
        type : String,
        required : false
    },
    floors : {
        type : String,
        required : false
    },
    ageofprop : {
        type : String,
        required : false
    },
    furnishing : {
        type : String,
        required : false
    },
    carparking : {
        type : String,
        required : false
    },
    totalfloor : {
        type : String,
        required : false
    },
    floornumber : {
        type : String,
        required : false
    },
    maintanancefee : {
        type : String,
        required : false
    },
    lift : {
        type : String,
        required : false
    },
    security : {
        type : String,
        required : false
    },
    clubhouse : {
        type : String,
        required : false
    },
    rent : {
        type : String,
        required : false
    },
    deposit : {
        type : String,
        required : false
    },
    preferredtenant : {
        type : String,
        required : false
    },
    availablefrom : {
        type : String,
        required : false
    },
    foodfacility : {
        type : String,
        required : false
    },
    washrooms : {
        type : String,
        required : false
    },
    electricityloadcapacity : {
        type : String,
        required : false
    },
    loadingorunloadingzone : {
        type : String,
        required : false
    },
    ceilingheight : {
        type : String,
        required : false
    },
    flooringtype : {
        type : String,
        required : false
    },
    cranefacility : {
        type : String,
        required : false
    },
    noofrooms : {
        type : String,
        required : false
    },
    firesafety : {
        type : String,
        required : false
    },
    negotiable : {
        type : String,
        required : false
    },
    usermail : {
        type : String,
        required : true
    },
    uploadimages : {
        type : Array,
        required : true
    },
    sellstatus : {
        type : String,
        default : "For Sale"
    }
    
    
    

})

const properties = mongoose.model("properties",propertyschema)
module.exports = properties