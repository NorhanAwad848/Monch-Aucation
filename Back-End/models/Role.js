module.exports = (db, type) => {
    return  db.define("role", {
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