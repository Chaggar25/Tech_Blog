const router = require('express').Router();

const apiRoutes = require('../../../Downloads/tech-blog-main/tech-blog-main/controllers/api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboard');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;