module.exports = (db, type) => {
  return  db.define("user", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: type.STRING,
      allowNull: false
    },
    email: {
      type: type.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail:true,
      },
    },
    password: {
      type: type.STRING,
      allowNull: false
    },
    status: {
      type: type.INTEGER,
      allowNull: false,
      defaultValue:0,
    }
  });
}