const express = require('express');
var router = express.Router();
var vendor_api = require('../vendor_API');


router.route('/')
      .get(vendor_api.homePage);

router.route('/additem/:drink')
      .post(vendor_api.getUserInput);
router.route('/cancelitem')
       .get(vendor_api.cancelPayment);
router.route('/resetamount')
       .get(vendor_api.resetAmount);
module.exports = router;