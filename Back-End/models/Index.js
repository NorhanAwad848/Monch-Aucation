const Sequelize = require("sequelize");
const db = require("../config/database");



const ProductModel = require("./Product");
const UserModel = require("./User");
const AuctionModel = require("./Auction");
const CategoryModel = require("./Category");
const RoleModel =require("./Role");

const Product = ProductModel(db,Sequelize);
const User = UserModel(db,Sequelize);
const Auction = AuctionModel(db,Sequelize);
const Category =CategoryModel(db,Sequelize);
const Role =RoleModel(db,Sequelize);

User.hasMany(Product,{ foreignKey: "sellerID",onDelete: 'CASCADE' , onUpdate : 'CASCADE' });
Product.belongsTo(User,{ foreignKey: "sellerID",onDelete: 'CASCADE' , onUpdate : 'CASCADE' });

Product.hasOne(Auction, { foreignKey:{name: "productID", primaryKey: true} , onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Auction.belongsTo(Product, { foreignKey: "productID", onDelete: 'CASCADE', onUpdate: 'CASCADE' })

User.hasMany(Auction,{foreignKey:"bidderID",  onDelete: 'CASCADE', onUpdate:"CASCADE" });
Auction.belongsTo(User,{foreignKey:"bidderID",  onDelete: 'CASCADE', onUpdate:"CASCADE" });

Category.hasMany(Product,{ foreignKey: "CategoryID",onDelete: 'CASCADE' , onUpdate : 'CASCADE' });
Product.belongsTo(Category,{ foreignKey: "CategoryID",onDelete: 'CASCADE' , onUpdate : 'CASCADE' });

Role.hasMany(User,{ foreignKey: "RoleID",onDelete: 'CASCADE' , onUpdate : 'CASCADE' });
User.belongsTo(Role,{ foreignKey: "RoleID",onDelete: 'CASCADE' , onUpdate : 'CASCADE' });


db.sync({ force: false }).then(() => {
  console.log("Tables Created");
});

module.exports = {
  User,
  Product,
  Auction,
  Category,
  Role
};
