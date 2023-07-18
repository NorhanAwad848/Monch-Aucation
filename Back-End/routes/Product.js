const router = require("express").Router();
const upload = require("../middlewares/upload");
const { Product,Category,Auction ,User,Role } = require("../models");
const { Op } = require("sequelize");

router.get("/product", async (req, res) => {
  const search = req.query.search;
  const products = await Product.findAll({
    attributes: [
            "id", "productName","sellerID","productImage","CategoryID","desc","min_bid","state","duration","start","end"],
         where: {
          [Op.and]:[
            {	state : 0},
            {[Op.or]: [
              {
                productName: {
                  [Op.startsWith]: search,
                },
              },
              {
                "$Category.name$": {
                  [Op.startsWith]: search,
                },
              },
            ],
          },
          ],
                  

      },

      include: [{
                model: Category,
                attributes: ["id", "name"],
      },],

  });

  products.map( (product)=>{
      product.productImage = `http://localhost:4000/${product.productImage}`;
  });

  res.status(200);
  res.json({products:products});
  console.log(products);
});

//get all products
router.get("", async (req, res) => {
    const search = req.query.search;
    const products = await Product.findAll({ attributes: ["id", "productName","sellerID","productImage","CategoryID","desc","min_bid","state","duration","start","end"],
    include: [
    {
      model: User,
      attributes: ["id", "name"],
      include: [{
        model: Role,
      attributes: ["id", "name"],
    },],
  },],
  });
    const category = await Category.findAll({ attributes: ["id", "name"] });
    products.map( (product)=>{
        product.productImage = `http://localhost:4000/${product.productImage}`;
    });
  
    res.status(200);
    res.json({products:products,category:category});
    console.log(products);
  });



  router.post("", upload.single("productImage"), async (req, res) => {
    const data = req.body;
  
    try {
  
      if (!req.file) {
        data.productImage = "course-default.jpg";
      } else {
        data.productImage = req.file.filename;
      }
  
      // Get logged in user userId (Professor Id) from request (revise token-verify.js => line 18 => "middlewares" folder)
      // Instead of sending userId (Professor Id) from the front-end
      const product = await Product.create(data);
      res.status(201);
      res.json({ message: `product is created. product id: ${product.id}` });
    } catch (err) {
      res.status(400);
      res.json({ message: `There is a problem: ${err}` });
    }
  });
  
  //get specific product
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id: id },
      attributes: ["productName","sellerID","CategoryID","desc","min_bid","state","duration","productImage","start","end"],
    });
    
      product.productImage = `http://localhost:4000/${product.productImage}`;
 
    // con
    const category = await Category.findOne({
      where: { id: product.CategoryID },
      attributes: ["id","name"],
    });
      
    if (product === null) {
      res.status(404);
      res.json({ message: `product not found` });
    } else {
      res.status(200);
      res.json({product:product,category:category});
    }
  });
  // Update specific product
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id: id },
    });
    if (product === null) {
      res.status(404);
      res.json({ message: "product not found" });
    } else {
      try {
        const data = req.body;
        await Product.update(
          {
            productName: data.productName,
            desc:data.desc,
            min_bid:data.min_bid,
            state:data.state,
            duration:data.duration,
            productImage:data.productImage,
            start:data.start,
            end:data.end,
  
          },
          {
            where: { id: id },
          }
        );
        res.status(200);
        res.json({ message: "product is updated" });
      } catch (err) {
        res.status(400);
        res.json({ message: `There is a problem: ${err}` });
      }
    }
  });
  
  router.put("/end/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id: id },
    });
    if (product === null) {
      res.status(404);
      res.json({ message: "product not found" });
    } else {
      try {
        const data = req.body;
        await Product.update(
          {
            productName: data.productName,
            desc:data.desc,
            min_bid:data.min_bid,
            state:data.state,
            duration:data.duration,
            productImage:data.productImage,
            start:data.start,
            end:data.end,
  
          },
          {
            where: { id: id },
          }
        );
        res.status(200);
        res.json({ message: "product is updated" });
      } catch (err) {
        res.status(400);
        res.json({ message: `There is a problem: ${err}` });
      }
    }
  });
  
  // Delete specific product
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id: id },
    });
    if (product === null) {
      res.status(404);
      res.json({ message: "product not found" });
    } else {
      try {
        await Product.destroy(
          {
            where: { id: id },
          }
        );
        res.status(200);
        res.json({ message: "product is deleted" });
      } catch (err) {
        res.status(400);
        res.json({ message: `There is a problem: ${err}` });
      }
    }
  });
  module.exports = router;