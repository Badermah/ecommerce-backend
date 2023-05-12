const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const category = await Category.findAll({ include: Product });
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to get categories" });
  }
});

router.get("/:id", async (req, res) => {
  const category = await Category.findOne({
    where: {
      id: req.params.id,
    },
    include: Product,
  });
  res.json(category);
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const result = await Category.create(data);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create category" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const category = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update category" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete category" });
  }
});

module.exports = router;
