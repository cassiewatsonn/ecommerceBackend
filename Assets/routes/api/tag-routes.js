const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      // including its associated Products
      include: [{ model: Product, through: ProductTag}],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id,{
        // including its associated Product data
      include: [{ model: Product, through: ProductTag }],
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag was found with that id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
    //Calls the update method on the Tag model
    Tag.update(
      {
        // All the fields you can update and the data attached to the request body.
        id: req.params.id,
        tag_name: req.body.tag_name,
      },
      {
        // Gets a tag based on the tag id given in the request parameters
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedTag) => {
        res.json(updatedTag);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.status(200).json(deletedTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
