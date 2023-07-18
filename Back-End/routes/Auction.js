// API ENDPOINTS (CRUD OPERATIONS)

let alert = require('alert');
const router = require("express").Router();
// import Auction table to execute CRUD operations
const { Auction, Product, User } = require("../models");


//Norhan Apis
router.get("", async (req, res) => {

  const aucation = await Auction.findAll({ attributes: ["id", "productID","price","bidderID"],
  include: [{
          model: User,
          attributes: ["id", "name"]
        },
        {
          model: Product,
          attributes:[ "productName","productImage","desc","state","end","id","sellerID"],
          
        },],
});
aucation.map( (product)=>{
  product.product.productImage = `http://localhost:4000/${product.product.productImage}`;
});
  res.status(200);
  res.json({aucation:aucation});
});
// Get won auctions and purchase history
//bnb3t bidderID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const auctions = await Auction.findAll({ 
    attributes: ["price","bidderID"],
    where: { bidderID: id },
    include: {
      model: Product,
      attributes: [
        "productImage",
        "productName", "desc", "min_bid","state"
      ],
      where: { state: 1 },
    },
   });

   auctions.map( (auction)=>{
    auction.product.productImage = `http://localhost:4000/${auction.product.productImage}`;
    console.log(auction.product.productImage);
});
  res.status(200);
  res.json(auctions);
  console.log(auctions);
});


//post new price
//update new price and bidder id acoording to bid
//bnb3t productID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const bid = await Product.findOne({
    where: { id : id, },
    attributes: ["min_bid"],
  });
  const auction = await Auction.findOne({
    where: { productID : id, },
  });
  if(bid.min_bid > data.price){
    res.status(412);
    res.json({
        message:`Invaliddd bid min value to bid is ${bid.min_bid}`,
    }); 
    alert(`Invalid bid ! Min value to bid is ${bid.min_bid}`);

}
  else if (auction === null  ) {
    data.productID = id;
    const auction = await Auction.create(data);
    res.status(201);
    res.json({
      message: `New auction is created. product id: ${auction.productID}`,
    });
    alert("Your bid is created successfully");
  } 
  else {
    try {
        if(data.price >= auction.price ){
            await Auction.update(
                { price: data.price,
                  bidderID: data.bidderID
                 },
                {
                  where: {
                    productID : id,
                  },
                }
              );
              res.status(200);
              res.json({
                message: "Auction is Updated",
              });
              alert("Your bid has submitted successfully");
        
        }
        else{
            res.status(412);
            res.json({
                message:`Invvvvalid bid ${data.price} min vlaue to bid is ${auction.price}`,
              });
              alert(`Sorry invalid bid ${data.price} !
Someone has submitted higher bid than you ${auction.price}`);
        }
    } catch (err) {
      res.status(400);
      res.json({
        message: err.message,
      });

    }
  }
});



// export
module.exports = router;