const express = require('express');

const router = express.Router();

const {orderPlaced,findOrders,rateOrder,findOrder,getUserCurrentOrders,statusUpdate,getCurrentOrders,getPastOrders} = require('../controllers/order');

router.post('/orderplace', orderPlaced);
router.post('/orders', findOrders);
router.post('/rate',rateOrder);
router.post('/order',findOrder);
router.post('/status',statusUpdate);
router.get('/pastorders',getPastOrders);
router.get('/currorders',getCurrentOrders);
router.post('/ordersCurrent',getUserCurrentOrders);
module.exports = router;