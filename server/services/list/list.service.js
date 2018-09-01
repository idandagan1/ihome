const createService = require('./list.class.js');
const hooks = require('./list.hooks');

module.exports = function (app) {
  const options = {
    name: 'list',
  };

  app.v2.use('/list', createService(options));

  const service = app.v2.service('list');

  service.hooks(hooks);
};
