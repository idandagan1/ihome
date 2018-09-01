const { Router } = require('express');
const fire = require('../firebase');

const router = Router();

router.post('/', async (req, res, next) => {
  const { body: { item, listId } } = req;

  try {
    const { key } = fire.database().ref('idan').child(`/list/${listId}`).push();

    const newItem = {
      id: key,
      value: item,
      createAt: new Date(),
    };

    const updates = {
      [`/list/${listId}/${key}`]: newItem,
    };

    await fire.database().ref('idan').update(updates);

    return res.status(200).send(newItem);
  } catch (e) {
    next(e);
    return res.status(500);
  }
});

router.get('/', async (req, res, next) => {
  const { query: { listId } } = req;

  try {
    const itemsRef = fire.database().ref(`idan/list/${listId}`);

    const list = await itemsRef.once('value', data => data.val());

    return res.status(200).send(list);
  } catch (e) {
    next(e);
    return res.status(500);
  }
});

router.delete('/', async (req, res, next) => {
  const { query: { itemId, listId } } = req;

  try {
    const list = fire.database().ref(`lists/${listId}`);

    list.child(itemId).remove();

    return res.status(204).send({ value: itemId, listId });
  } catch (e) {
    next(e);
    return res.status(500);
  }
});

module.exports = router;
