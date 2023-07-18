// API ENDPOINTS (CRUD OPERATIONS)

const router = require("express").Router();
// import Course table to execute CRUD operations
const { Category } = require("../models");

// get  all category
router.get("", async (req, res) => {
    const category = await Category.findAll({ attributes: ["id", "name",] });
    res.status(200);
    res.json({category:category});
  });

//post new category
router.post("", async (req, res) => {
  const data = req.body;
  
  try {
    const category = await Category.create(data);
    res.status(201);
    res.json({ message: `category is done. category id: ${category.id}` ,});
  } catch (err) {
    res.status(400);
    res.json({ message: "there is a problem creating new category" });
    
  }
});
//get specific category
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const category = await Category.findOne({
    where: { id: id },
    attributes: ["name"],
  });
  if (category === null) {
    res.status(404);
    res.json({ message: `category not found` });
  } else {
    res.status(200);
    res.json(category);
  }
});
// Update specific category
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const category = await Category.findOne({
    where: { id: id },
  });
  if (category === null) {
    res.status(404);
    res.json({ message: "catrgory not found" });
  } else {
    try {
      const data = req.body;
      await Category.update(
        {
          name: data.name,
        },
        {
          where: { id: id },
        }
      );
      res.status(200);
      res.json({ message: "Category is updated" });
    } catch (err) {
      res.status(400);
      res.json({ message: `There is a problem: ${err}` });
    }
  }
});

// Delete specific category
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const category = await Category.findOne({
    where: { id: id },
  });
  if (category === null) {
    res.status(404);
    res.json({ message: "category not found" });
  } else {
    try {
      await Category.destroy(
        {
          where: { id: id },
        }
      );
      res.status(200);
      res.json({ message: "Category is deleted" });
    } catch (err) {
      res.status(400);
      res.json({ message: `There is a problem: ${err}` });
    }
  }
});
// export
module.exports = router;