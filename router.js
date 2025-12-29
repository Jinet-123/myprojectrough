const express = require("express")
const { registercontroller, logincontroller, updateuserprofilecontroller, becomeSellerController, getallrequestsforadmincontroller, approvesellercontroller, rejectsellercontroller, getupdatedprofilecontroller, checkSellerStatusController, ifinterrestedcontroller, getSellerInterestedController, deleteInterestedrequestsController, deleteuseraddedrequestscontroller, getAdminDashboardCounts, getAllUsersForAdmincontroller } = require("./controller/usercontroller")
const jwtmiddleware = require("./middlewares/jwtmiddleware")
const multerconfig = require("./middlewares/imgmultermiddleware")
const { addpropertycontroller, getpropertiesathomecontroller, getapropertycontroller, getsearchpropscontroller, getselleraddedpropscontroller, updatepropertycontroller, deletepropertycontroller, updatepropertystatuscontroller, getPropertiesWithSortFiltercontroller, sortFilterProperties, updatePropertyController, addToWishlistController, getWishlistController, deleteWishlistController } = require("./controller/propertycontroller")
const adminjwtmiddlewarenew = require("./middlewares/adminjwtmiddlewarenew")

const router = express.Router()

//register
router.post("/register", registercontroller)

//login
router.post("/login",logincontroller)

//addproperty
router.post("/addprops",jwtmiddleware,multerconfig.array("uploadimages",6),addpropertycontroller)

//get added properties in prophomepg
router.get("/homeprops",getpropertiesathomecontroller)

//get a property(view prop)
router.get("/viewproperty/:id",jwtmiddleware,getapropertycontroller)

//update user profile
router.put("/updateuserprofile",jwtmiddleware,multerconfig.single("profile"),updateuserprofilecontroller)

// search props
router.get("/searchprops",getsearchpropscontroller)

// get selller added props
router.get("/selleraddedprops",jwtmiddleware,getselleraddedpropscontroller)

// update property by seller
router.put("/updateprop/:id",jwtmiddleware,multerconfig.array("uploadimages",6),updatepropertycontroller)

// delete a property by seller
router.delete("/deleteproperty/:id",deletepropertycontroller)

// update status to sold
router.put("/markassold/:id",updatepropertystatuscontroller)

// become seller 
router.post("/becomeseller",jwtmiddleware,multerconfig.array("idproof",2),becomeSellerController)

// sort and filter
router.post("/sort-filter-properties", sortFilterProperties);

// if interested
router.post("/interested",ifinterrestedcontroller)

// interested users for seller
router.get("/interestedinseller/:sellerEmail", getSellerInterestedController)

// delete user interest requests
router.delete("/deleterequest/:id",deleteuseraddedrequestscontroller)

// add to wishlist
router.post("/addtowishlist", addToWishlistController)

// get user wishlist
router.get("/wishlist/:userEmail", getWishlistController)

// delete from wishlist
router.delete("/wishlist/:id", deleteWishlistController)

//......................admin...............................//

// get all become seller requests
router.get("/getallbecomesellerinadmin",adminjwtmiddlewarenew,getallrequestsforadmincontroller)

// approve seller
router.put("/approveseller/:id",adminjwtmiddlewarenew,approvesellercontroller)

// reject seller
router.put("/rejectseller/:id",adminjwtmiddlewarenew,rejectsellercontroller)

// check seller status
router.get("/check-seller-status",jwtmiddleware,checkSellerStatusController)

// counts in dashboard
router.get("/dashboardcounts", getAdminDashboardCounts);

// get all users for admin
router.get("/allusers", getAllUsersForAdmincontroller);


module.exports = router