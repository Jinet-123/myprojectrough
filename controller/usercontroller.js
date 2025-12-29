const Interested = require("../models/ifinterested");
const properties = require("../models/propertymodel");
const users = require("../models/usermodel")
const jwt = require('jsonwebtoken')

exports.registercontroller = async (req, res) => {
  console.log("inside reg controller");
  // console.log(req);
  const { username, password, email } = req.body
  console.log(username, password, email);


  // register
  try {
    const existinguser = await users.findOne({ email })
    if (existinguser) {
      res.status(404).json(`user existed..add new one`)
    } else {
      const newuser = new users({
        username,
        email,
        password
      })
      await newuser.save()
      res.status(200).json(newuser)
    }
  } catch (error) {
    res.status(500).json(error)
  }

}

// login
exports.logincontroller = async (req, res) => {
  console.log(`inside login controller`);
  const { password, email } = req.body
  console.log(password, email);

  try {
    const existinguser = await users.findOne({ email })
    if (existinguser) {
      if (existinguser.password == password) {
        const token = jwt.sign({ usermail: existinguser.email, role: existinguser.role }, process.env.JWTsecretkey)
        res.status(200).json({ existinguser, token })
      } else {
        res.status(401).json(`invalid credentials`)
      }
    } else {
      res.status(404).json(`user not found ... please register`)
    }
  } catch (error) {
    res.status(500).json(error)


  }

}

// edit user and seller profile
exports.updateuserprofilecontroller = async (req, res) => {
  console.log(`inside update user profile controller`);
  //get data
  const { username, password, bio, role, profile } = req.body
  const email = req.payload
  console.log(username, password, bio, role);


  const uploadprofile = req.file ? req.file.filename : profile
  console.log(uploadprofile);


  try {

    const updateuser = await users.findOneAndUpdate({ email }, { username, email, password, profile: uploadprofile, bio, role }, { new: true })
    res.status(200).json(updateuser)

  } catch (error) {
    res.status(500).json(error)
  }


}

// become seller
exports.becomeSellerController = async (req, res) => {
  try {
    const userEmail = req.payload
    const { name, email, phone } = req.body



    const idProofImages = req.files?.map(file => file.filename)

    if (!idProofImages || idProofImages.length === 0) {
      return res.status(400).json("ID proof is required")
    }

    const updatedUser = await users.findOneAndUpdate(
      { email: userEmail },
      {
        isseller: "pending",
        idproof: idProofImages,
        sellerinfo: { name, email, phone }
      },
      { new: true }
    )

    res.status(200).json(updatedUser)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

// if user interrested
exports.ifinterrestedcontroller = async (req, res) => {
  try {
    const interested = new Interested(req.body)
    await interested.save()
    res.status(201).json(interested)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}

// get interested users for seller
exports.getSellerInterestedController = async (req, res) => {
  const { sellerEmail } = req.params

  try {
    const interestedUsers = await Interested.find({ sellerEmail })

    res.status(200).json(interestedUsers)
  } catch (error) {
    res.status(500).json(error)
  }
}

// delete user interest requests
exports.deleteuseraddedrequestscontroller = async (req, res) => {
  console.log(`Inside delete requests controller`);
  const { id } = req.params

  try {
    await Interested.findByIdAndDelete({ _id: id })
    res.status(200).json(`Request deleted successfully`)

  } catch (error) {
    res.status(500).json(error)
  }

}



//.................admin..............................................//
exports.getallrequestsforadmincontroller = async (req, res) => {
  try {
    console.log("Fetching all pending seller requests for admin")
    const allrequests = await users.find({ isseller: "pending" })

    res.status(200).json(allrequests)
  } catch (error) {

    res.status(500).json({ error: "Server error" })
  }
}

// approve seller
exports.approvesellercontroller = async (req, res) => {
  try {
    const { id } = req.params

    const updatedUser = await users.findByIdAndUpdate(id, { isseller: "approved", role: "seller" }, { new: true })

    res.status(200).json(updatedUser)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

// reject seller
exports.rejectsellercontroller = async (req, res) => {
  try {
    const { id } = req.params

    const updatedUser = await users.findByIdAndUpdate(
      id,
      { isseller: "rejected", sellerinfo: null, idproof: [] },
      { new: true }
    )

    res.status(200).json(updatedUser)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

// seller status check
exports.checkSellerStatusController = async (req, res) => {
  try {
    const userEmail = req.payload

    const user = await users.findOne(
      { email: userEmail },
      { isseller: 1, role: 1 }
    )

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

// get counts for admin
exports.getAdminDashboardCounts = async (req, res) => {
  try {
    const totalUsers = await users.countDocuments();
    const totalSellers = await users.countDocuments({ role: "seller" });
    const totalProperties = await properties.countDocuments();

    const land = await properties.countDocuments({
  propertytype: { $regex: "^land$", $options: "i" }
});

const house = await properties.countDocuments({
  propertytype: { $regex: "^house$", $options: "i" }
});

const flat = await properties.countDocuments({
  propertytype: { $regex: "^flat$", $options: "i" }
});

const rental = await properties.countDocuments({
  propertytype: { $regex: "rental", $options: "i" }
});

const commercial = await properties.countDocuments({
  propertytype: { $regex: "commercial", $options: "i" }
});

const industrial = await properties.countDocuments({
  propertytype: { $regex: "industrial", $options: "i" }
});



    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalSellers,
        totalProperties,
        land,
        house,
        flat,
        rental,
        commercial,
        industrial
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get users for admin
exports.getAllUsersForAdmincontroller = async (req, res) => {
  try {
    
    const allusers = await users.find({},{ username: 1, email: 1, role: 1, _id: 1 });

    res.status(200).json(allusers);

  } catch (error) {
    res.status(500).json(error);
  }
};