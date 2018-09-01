/* eslint-disable no-unused-vars */
const fire = require('../../firebase');

class Service {

  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    return []
  }

  async get(id, params) {
    const itemsRef = fire.database().ref(`profile/list/${id}`);

    const list = await itemsRef.once('value', data => data.val());
    return list;
  }

  async create(data, params) {
    const { listId, item } = params;
    const { key } = fire.database().ref('profile').child(`/list/${listId}`).push();

    const newItem = {
      id: key,
      value: item,
      createAt: new Date(),
    };

    const updates = {
      [`/list/${listId}/${key}`]: newItem,
    };

    await fire.database().ref('profile').update(updates);

    return data;
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    const { listId, itemId } = params;
    const list = fire.database().ref(`lists/${listId}`);

    list.child(itemId).remove();

    return { value: itemId, listId };
  }

}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
