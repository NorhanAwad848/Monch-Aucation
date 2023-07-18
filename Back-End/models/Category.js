module.exports = (db, type) => {
    return  db.define("Category", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: type.STRING,
        allowNull: false
      },
    
});
}
