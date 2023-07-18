module.exports = (db, type) => {
    return  db.define("auction", {
    price: {
      type: type.FLOAT,
      allowNull: true
    }
  });
}