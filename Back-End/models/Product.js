module.exports = (db, type) => {
    return db.define("product", {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      productName: {
        type: type.STRING,
        allowNull: false,
      },
      desc: {
        type: type.STRING,
        allowNull: false,
      },
      min_bid: {
        type: type.INTEGER,
        allowNull: false,
      },
      state: {
        type: type.INTEGER,
        allowNull: false,
        validate: {
          isIn: [[-1,0, 1]], //0 Expired 1 Not Expired
        },
      },
      duration: {
        type: type.INTEGER,
        allowNull: false,
      },
      start: {
        type: type.INTEGER,
        allowNull: false,
      },
      end: {
        type: type.INTEGER,
        allowNull: false,
      },
      productImage: {
        type: type.STRING,
        allowNull: false,
      },
      
      
    });
  };
  