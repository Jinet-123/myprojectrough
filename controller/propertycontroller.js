
const properties = require("../models/propertymodel");
const Wishlist = require("../models/wishlistmodel");

//add property 
exports.addpropertycontroller = async (req,res) =>{
        console.log(`inside addpropery controller`);
        const {propertytitle,propertytype,description,selecttype,area,plotwidth,plotlength,facingdirection,roadwidth,price,priceperunit,location,wateravailability,electricity,fencing,address,bhk,builtuparea,carpetarea,plotarea,bedrooms,bathrooms,balconies,floors,ageofprop,furnishing,carparking,totalfloor,floornumber,maintanancefee,lift,security,clubhouse,rent,deposit,preferredtenant,availablefrom,foodfacility,washrooms,electricityloadcapacity,loadingorunloadingzone,ceilingheight,flooringtype,cranefacility,noofrooms,firesafety,negotiable} = req.body
        console.log(propertytitle,propertytype,description,selecttype,area,plotwidth,plotlength,facingdirection,roadwidth,price,priceperunit,location,wateravailability,electricity,fencing,address,bhk,builtuparea,carpetarea,plotarea,bedrooms,bathrooms,balconies,floors,ageofprop,furnishing,carparking,totalfloor,floornumber,maintanancefee,lift,security,clubhouse,rent,deposit,preferredtenant,availablefrom,foodfacility,washrooms,electricityloadcapacity,loadingorunloadingzone,ceilingheight,flooringtype,cranefacility,noofrooms,firesafety,negotiable);
        

        // console.log(req.files);

        var uploadimages = []
        req.files.map((item) => uploadimages.push(item.filename))
        console.log(uploadimages);
        const usermail = req.payload
        console.log(usermail);
        
        try {
                const existingproperty = await properties.findOne({propertytitle,usermail})
                if(existingproperty){
                        res.status(401).json("you already added this")
                }else{
                        const newproperty = new properties({
                                propertytitle,propertytype,description,selecttype,area,plotwidth,plotlength,facingdirection,roadwidth,price,priceperunit,location,wateravailability,electricity,fencing,address,bhk,builtuparea,carpetarea,plotarea,bedrooms,bathrooms,balconies,floors,ageofprop,furnishing,carparking,totalfloor,floornumber,maintanancefee,lift,security,clubhouse,rent,deposit,preferredtenant,availablefrom,foodfacility,washrooms,electricityloadcapacity,loadingorunloadingzone,ceilingheight,flooringtype,cranefacility,noofrooms,firesafety,negotiable,uploadimages,usermail

                        })
                        await newproperty.save()
                        res.status(200).json(newproperty)
                }
        }catch(error){
                res.status(500).json(error)
                console.log("ERROR in addpropertycontroller:", error);
        }
        
} 

//get all added properties in property homepg
exports.getpropertiesathomecontroller = async (req,res) =>{
        console.log(`inside homeprops controller`);
        try {
                const homeprops = await properties.find().sort({_id : -1})
                res.status(200).json(homeprops)
        }catch (error){
                res.status(500).json(error)

        }
        
}

// get a property controller(view details of a particular property)
exports.getapropertycontroller = async (req,res) =>{
        console.log(`get a property controller`);

        const {id} = req.params
        console.log(id);
        

       try {
        const property = await properties.findById({_id : id})
        res.status(200).json(property)
        
       } catch (error) {
        res.status(500).json(error)
        
       }      
        
}

// search properties
exports.getsearchpropscontroller = async (req, res) => {
  const { location, propertytype } = req.query

  const query = {}

  if (location) {
    query.location = { $regex: location, $options: "i" }
  }

  if (propertytype && propertytype !== "all") {
    query.propertytype = { $regex: propertytype, $options: "i" }
  }

  try {
    const allprops = await properties.find(query)
    res.status(200).json(allprops)
  } catch (error) {
    res.status(500).json(error)
  }
}

// get seller added props
exports.getselleraddedpropscontroller = async (req, res) => {
        console.log(`inside get seller added props controller`);
        const usermail = req.payload

        try {
                const sellerprops = await properties.find({ usermail })
                res.status(200).json(sellerprops)

        } catch (error) {
                res.status(500).json(error)

        }

}

//update property on sellerpage 
exports.updatepropertycontroller = async (req, res) => {
  console.log("inside update property controller")

  const { id } = req.params
  const usermail = req.payload

  const {
    propertytitle, propertytype, description, selecttype, area,
    plotwidth, plotlength, facingdirection, roadwidth, price,
    priceperunit, location, wateravailability, electricity,
    fencing, address, bhk, builtuparea, carpetarea, plotarea,
    bedrooms, bathrooms, balconies, floors, ageofprop,
    furnishing, carparking, totalfloor, floornumber,
    maintanancefee, lift, security, clubhouse, rent, deposit,
    preferredtenant, availablefrom, foodfacility, washrooms,
    electricityloadcapacity, loadingorunloadingzone,
    ceilingheight, flooringtype, cranefacility, noofrooms,
    firesafety, negotiable
  } = req.body

  try {

    
    let images = []

    
    if (req.body.existingImages) {
      images = JSON.parse(req.body.existingImages)
    }

    
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => file.filename)
      images = [...images, ...newImages]
    }

    console.log("REQ FILES:", req.files);
console.log("REQ BODY:", req.body);


    const updateprop = await properties.findOneAndUpdate(
      { _id: id, usermail },
      {
        propertytitle, propertytype, description, selecttype, area,
        plotwidth, plotlength, facingdirection, roadwidth, price,
        priceperunit, location, wateravailability, electricity,
        fencing, address, bhk, builtuparea, carpetarea, plotarea,
        bedrooms, bathrooms, balconies, floors, ageofprop,
        furnishing, carparking, totalfloor, floornumber,
        maintanancefee, lift, security, clubhouse, rent, deposit,
        preferredtenant, availablefrom, foodfacility, washrooms,
        electricityloadcapacity, loadingorunloadingzone,
        ceilingheight, flooringtype, cranefacility, noofrooms,
        firesafety, negotiable,
        uploadimages: images
      },
      { new: true }
    )

    if (!updateprop) {
      return res.status(403).json("Not authorized to update this property")
    }

    res.status(200).json(updateprop)

  } catch (error) {
    res.status(500).json(error)
  }
}

// delete a property 
exports.deletepropertycontroller = async (req, res) => {
        console.log(`Inside delete a property controller`);
        const { id } = req.params

        try {
                await properties.findByIdAndDelete({ _id: id })
                res.status(200).json(`Property deleted successfully`)

        } catch (error) {
                res.status(500).json(error)
        }

}

// Mark as sold
exports.updatepropertystatuscontroller = async (req, res) => {
        console.log(`inside update property status controller`);
        const { id } = req.params

        const updatepropertystatus = {
                ...req.body, sellstatus: "sold"
        }

        try {
                const updateprop = await properties.findByIdAndUpdate({ _id: id }, updatepropertystatus, { new: true })
                res.status(200).json(updateprop)

        } catch (error) {

                res.status(500).json(error)
        }

}   

// add to wishlist
exports.addToWishlistController = async (req, res) => {
  try {
    const wishlistItem = new Wishlist(req.body) 
    await wishlistItem.save()                   

    res.status(201).json(wishlistItem)
    console.log("WISHLIST BODY RECEIVED:", req.body)

  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}

// get user wislist
exports.getWishlistController = async (req, res) => {
  const { userEmail } = req.params

  try {
    const wishlist = await Wishlist.find({ userEmail })
    res.status(200).json(wishlist)
  } catch (error) {
    res.status(500).json(error)
  }
}

// delete from wishlist
exports.deleteWishlistController = async (req, res) => {
  const { id } = req.params

  try {
    await Wishlist.findByIdAndDelete(id)
    res.status(200).json( "Wishlist item removed" )
  } catch (error) {
    res.status(500).json(error)
  }
}

// home properties in landing
exports.getlandingPropertiescontroller = async (req, res) => {
  try {
    const allproperties = await properties.find().limit(6).sort({ createdAt: -1 });
    res.status(200).json(allproperties);
  } catch (error) {
    res.status(500).json(error);
  }
};

