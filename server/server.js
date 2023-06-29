const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://peyz21:qwert12345@recipedb.1yr5yi7.mongodb.net/recipedb?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Could not connect to MongoDB...", error);
  }
};

connectDB(); // Connect to MongoDB

const recipeSchema = new mongoose.Schema(
  {
    recipeName: { type: String },
    ingredients: { type: [String] },
    instructions: { type: String },
    difficulty: { type: String },
    recipeImage: { type: String },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);


app.get("/recipes", async (req, res) => {
  try {
    const skip = Number(req.query.skip) || 0;
    const limit = Number(req.query.limit) || 100;
    const search = req.query.search || "";

    const recipes = await Recipe.find({
      recipeName: { $regex: new RegExp(search, "i") },
    })
      .skip(skip)
      .limit(limit);

    res.json(recipes);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


app.post("/recipes", upload.single("recipeImage"), async (req, res) => {
  try {
    if (req.file) {
      const image = Buffer.from(req.file.buffer).toString("base64");
      req.body.recipeImage = image;
    }

    if (typeof req.body.ingredients === 'string') {
      req.body.ingredients = req.body.ingredients.split(",");
    }

    const newRecipe = new Recipe(req.body);
    const savedRecipe = await newRecipe.save();
    res.json(savedRecipe);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).send({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.put("/recipes/:id", upload.single("recipeImage"), async (req, res) => {
  const { id } = req.params;
  try {
    let updatedData = req.body;

    // If a new image file is uploaded, handle the upload process
    if (req.file) {
      const image = Buffer.from(req.file.buffer).toString("base64");
      updatedData.recipeImage = image;
    }

    if (typeof updatedData.ingredients === 'string') {
      updatedData.ingredients = updatedData.ingredients.split(",");
    }

    // Update the recipe data
    const updateRecipe = await Recipe.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updateRecipe) {
      return res.status(404).send({ message: "Recipe not found" });
    }

    res.json(updateRecipe);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.delete("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    if (!deletedRecipe) {
      return res.status(404).send({ message: "Recipe not found" });
    }
    res.json(deletedRecipe);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log("Server is running on port 3002");
});
