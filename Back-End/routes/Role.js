// API ENDPOINTS (CRUD OPERATIONS)

const router = require("express").Router();
// import Course table to execute CRUD operations
const { Role } = require("../models");

// get  all role
router.get("", async (req, res) => {
    const role = await Role.findAll({ attributes: ["id", "name",] });
    res.status(200);
    res.json(role);
  });

//post new role
router.post("", async (req, res) => {
  const data = req.body;
  try {
    const role = await Role.create(data);
    res.status(201);
    res.json({ message: `Role is done. role id: ${role.id}` ,});
  } catch (err) {
    res.status(400);
    res.json({ message: "there is a problem creating new role" });
    
  }
});
//get specific Role
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const role = await Role.findOne({
    where: { id: id },
    attributes: ["name"],
  });
  if (role === null) {
    res.status(404);
    res.json({ message: `Role not found` });
  } else {
    res.status(200);
    res.json(role);
  }
});
// Update specific Role
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const role = await Role.findOne({
    where: { id: id },
  });
  if (role === null) {
    res.status(404);
    res.json({ message: "Role not found" });
  } else {
    try {
      const data = req.body;
      await Role.update(
        {
          name: data.name,
        },
        {
          where: { id: id },
        }
      );
      res.status(200);
      res.json({ message: "Role is updated" });
    } catch (err) {
      res.status(400);
      res.json({ message: `There is a problem: ${err}` });
    }
  }
});

// Delete specific Role
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const role = await Role.findOne({
    where: { id: id },
  });
  if (role === null) {
    res.status(404);
    res.json({ message: "Role not found" });
  } else {
    try {
      await Role.destroy(
        {
          where: { id: id },
        }
      );
      res.status(200);
      res.json({ message: "Role is deleted" });
    } catch (err) {
      res.status(400);
      res.json({ message: `There is a problem: ${err}` });
    }
  }
});
// export
module.exports = router;