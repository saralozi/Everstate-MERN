const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const BuyModel = require("../models/buy");
const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

app.use(express.json());

app.post("/addbuy", upload.single("photo"), async (req, res) => {
  try {
    const itemData = new BuyModel({
      ...req.body,
      photo: req.file.filename,
    });
    await itemData.save();
    res.status(200).send(itemData);
  } catch (err) {
    console.log(err);
    res.status(500).send("Message" + err);
  }
});

app.get("/buy", async (req, res) => {
  try {
    const allItem = await BuyModel.find({});
    res.status(200).send(allItem);
  } catch (err) {
    console.log(err);
    res.status(500).send("Data not read." + err);
  }
});

app.get("/search", async (req, res) => {
  try {
    const { title, price, location, beds, baths, sqft } = req.query;
    console.log("Title:", title);
    console.log("Price:", price); // Check the formatted price with commas

    // Convert the formatted price with commas back to a numeric value without commas
    const numericPrice = price ? parseInt(price.replace(/\D/g, "")) : undefined;

    console.log("Numeric Price:", numericPrice); // Check the numeric price without commas

    let searchQuery = {};
    if (title && title.trim() !== '') {
      searchQuery.title = { $regex: new RegExp(title, "i") };
    }
    if (location && location.trim() !== '') {
      searchQuery.location = { $regex: new RegExp(location, "i") };
    }
    if (!isNaN(numericPrice)) {
      searchQuery.price = { $gte: numericPrice };
    }
    if (beds && !isNaN(beds)) {
      searchQuery.beds = { $gte: parseInt(beds) };
    }
    if (baths && !isNaN(baths)) {
      searchQuery.baths = { $gte: parseInt(baths) };
    }
    if (sqft && !isNaN(sqft)) {
      searchQuery.sqft = { $gte: parseInt(sqft) };
    }

    const results = await BuyModel.find(searchQuery);
    // console.log("Results:", results);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error searching properties:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get('/buyreadOne/:slug', async (req, res) => {
  try {
    const itemSlug = req.params.slug
    const itemData = await BuyModel.findOne({ slug: itemSlug })
    console.log(itemData)
    res.status(200).send(itemData)
  } catch (err) {
    console.log(err)
    res.status(500).send("Data one not read" + err)
  }
})

app.delete("/buydelete/:slug", async (req, res) => {
  try {
    const itemSlug = req.params.slug;
    await BuyModel.deleteOne({ slug: itemSlug });
    console.log("Deleted Item");
    res.status(200).send("Deleted item");
  } catch (err) {
    console.log(err);
    res.status(500).send("Item not deleted" + err);
  }
});

app.patch("/buyupdate/:slug", upload.single("photo"), async (req, res) => {
  try {
    const itemSlug = req.params.slug;
    const itemInfo = { ...req.body };

    if (req.file) {
      itemInfo.photo = req.file.filename;
    }
    const itemUpdated = await BuyModel.findOneAndUpdate(
      { slug: itemSlug },
      { $set: itemInfo },
      { new: true }
    );

    console.log(itemUpdated);
    res.status(200).send(itemUpdated);
  } catch (err) {
    console.log(err);
    res.status(500).send("Message" + err);
  }
});

module.exports = app;