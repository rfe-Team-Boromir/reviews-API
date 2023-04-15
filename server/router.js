const { Router }  = require ('express');
const controller = require ('./controller.js')

const router = Router();



router.get('/reviews', controller.getReviews)
  //params: page, count, sort, product_id*

router.get('/reviews/meta', controller.getMetaData)
  //params: product_id

router.post('/reviews', controller.postReview)
  //params: all of the columns, look into charactertics obj

router.put('/reviews/helpful', controller.markAsHelpful)
  //params: review_id


router.put('/reviews/report', controller.reportReview)
  //params: review_id


module.exports = router;