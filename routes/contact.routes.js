const router = require('express').Router();
const contactController = require('../controllers/contact.controller');
const sendMail = require('../mail/Config');


router.route('/')
      .get(contactController.getRequests)
      .post(contactController.createRequest)

router.route('/:id')
      .put(contactController.updateRequest)

router.route('/status/:id')
      .put(contactController.updateStatusRequest)

router.route('/open')
      .get(contactController.getOpenRequests)

router.route('/closed')
      .get(contactController.getClosedRequests)

router.route('/request/:id')
      .get(contactController.getRequest)

router.route('/send')
      .post(sendMail.sendMail)

module.exports = router;
