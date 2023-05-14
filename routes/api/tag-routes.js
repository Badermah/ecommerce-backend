const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ message: "Failed to get tags" });
  }
  // be sure to include its associated Product data
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  const tag = await Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product],
  });
  res.status(200).json(tag);
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create(req.body);
    res.status(200).json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create tag" });
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: "No tag found with this id" });
    }
    tag.tag_name = req.body.tag_name;
    await tag.save();
    res.status(200).json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update tag" });
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: "No tag found with this id" });
    }
    await tag.destroy();
    res.status(200).json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete tag" });
  }
});

module.exports = router;
