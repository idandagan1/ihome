const { Router } = require('express');
const listApi = require('./listApi');

const router = Router();

router.use('/v2/list', listApi);

module.exports = router;
