const express = require('express');
const app = express()
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");  
const rentModel = require('../models/rent')

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


app.post('/addRent', upload.fields([
    { name: 'photo1', maxCount: 1 },
    { name: 'photo2', maxCount: 1 },
    { name: 'photo3', maxCount: 1 },
    { name: 'photo4', maxCount: 1 },
    { name: 'photo5', maxCount: 1 }
]), async (req, res) => {
    try {
        const photos = [];
        for (let i = 1; i <= 5; i++) {
            if (req.files[`photo${i}`]) {
                photos.push(req.files[`photo${i}`][0].filename);
            }
        }

        const itemData = new rentModel({
            ...req.body,
            photo1: photos[0] || '',
            photo2: photos[1] || '',
            photo3: photos[2] || '',
            photo4: photos[3] || '',
            photo5: photos[4] || ''
        });
        console.log(itemData)
        await itemData.save();
        res.status(200).send(itemData);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error adding rental property: " + err);
    }
});

app.get('/rent', async(req,res) => {
    try{
        const allItem = await rentModel.find({})
        console.log(allItem)
        res.status(200).send(allItem)
    }catch(err){
        console.log(err)
        res.status(500).send("Data not read."+err)
    }
})

app.get("/searchrent", async (req, res) => {
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
  
      const results = await rentModel.find(searchQuery);
      console.log("Results:", results);
      res.status(200).json(results);
    } catch (error) {
      console.error("Error searching properties:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


app.get('/readOneRent/:slug', async (req, res) => {
    try {
        const itemSlug = req.params.slug
        const itemData = await rentModel.findOne({ slug: itemSlug })
        console.log(itemData)
        res.status(200).send(itemData)
    } catch (err) {
        console.log(err)
        res.status(500).send("Data one not read" + err)
    }
})

app.delete('/deleteRent/:id', async(req,res) =>{
    try{
        const itemId = req.params.id
        await rentModel.deleteOne({_id:itemId})
        console.log("Deleted Item")
        res.status(200).send("Deleted item")
    }catch (err){
        console.log(err)
        res.status(500).send("Item not deleted"+err)
    }
})

app.patch("/updateRent/:slug", upload.fields([
    { name: 'photo1', maxCount: 1 },
    { name: 'photo2', maxCount: 1 },
    { name: 'photo3', maxCount: 1 },
    { name: 'photo4', maxCount: 1 },
    { name: 'photo5', maxCount: 1 }
]), async (req, res) => {
    try {
        const itemSlug = req.params.slug;
        
        const existingItem = await rentModel.findOne({ slug: itemSlug });
        
        if (!existingItem) {
            return res.status(404).send("Rental property not found.");
        }

        const photos = [];
        for (let i = 1; i <= 5; i++) {
            if (req.files[`photo${i}`]) {
                photos.push(req.files[`photo${i}`][0].filename);
            }
        }

        
        const itemInfo = {
            ...existingItem.toObject(), 
            ...req.body,
            photo1: photos[0] || existingItem.photo1 || '',
            photo2: photos[1] || existingItem.photo2 || '',
            photo3: photos[2] || existingItem.photo3 || '',
            photo4: photos[3] || existingItem.photo4 || '',
            photo5: photos[4] || existingItem.photo5 || ''
        };

        
        const itemUpdated = await rentModel.findOneAndUpdate({ slug: itemSlug },{$set:itemInfo}, { new: true });

        console.log(itemUpdated);
        res.status(200).send(itemUpdated);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error updating rental property: " + err);
    }
});


module.exports = app;
