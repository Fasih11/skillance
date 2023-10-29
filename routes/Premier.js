const express = require("express");

const multer = require("multer");


const router = express.Router();
const controller = require("../controller")
const { premierController } = controller;


const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const imageFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// upload image destination
const upload = multer({
  storage: fileStorage,
  limits: {
    // file Sie of 5MB
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: imageFilter,
}).fields(
  [
    { 
      name: 'verified_by_passport', 
      maxCount: 1 
    }, 
    { 
      name: 'utility_bill', 
      maxCount: 1 
    },
    { 
      name: 'driving_license', 
      maxCount: 1 
    },
    { 
      name: 'consent', 
      maxCount: 1 
    },
    { 
      name: 'recent_photo', 
      maxCount: 1 
    },
    { 
      name: 'resume', 
      maxCount: 1 
    }
  ]
);
router.post("/",upload,
  premierController.storePremier
  );

exports.router = router;
