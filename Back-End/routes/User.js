// API ENDPOINTS (CRUD OPERATIONS)

const router = require("express").Router();
// import Course table to execute CRUD operations
const { User,Role } = require("../models");

// Post new user
router.get("", async (req, res) => {
    const user = await User.findAll({ attributes: ["id", "name","email","type","status"] });
    res.status(200);
    res.json(user.data);
  });
  

  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id: id },
      attributes: ["name","RoleID"],
    });
    if (user === null) {
      res.status(404);
      res.json({ message: `user not found` });
    } else {
      res.status(200);
      res.json(user);
    }
  });
router.post("", async (req, res) => {
  const data = req.body;
  try {
    const user = await User.create(data);
    res.status(201);
    res.json({ message: `New user is created with. id: ${user.id}` });
  } catch (err) {
    res.status(400);
    console.log(err)
    res.json({ message: "there is a problem creating user" });
    
  }
});

 router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id: id },
    });
    if (user === null) {
      res.status(404);
      res.json({ message: "user not found" });
    } else {
      try {
        const data = req.body;
        await User.update(
          {
            status:data.status,
          },
          {
            where: { id: id },
          }
        );
        res.status(200);
        res.json({ message: "user is updated" });
      } catch (err) {
        res.status(400);
        res.json({ message: `There is a problem: ${err}` });
      }
    }
  });

// export
module.exports = router;
