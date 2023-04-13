const pool =  require ('../db/db');





async function getReviews (req, res) {
  if (!req.query.product_id) {
    return res.status(400).send('Please provide a product_id')
  }

  const reviews = await pool.query(`SELECT * FROM reviews WHERE product_id = ${req.query.product_id} LIMIT ${req.query.count || 5}`);
  let reviewsData = reviews.rows;

  for(let review of reviewsData) {
    let data = await getPhotoData(review);
    review.photos = data;
  }

  res.status(200).send(reviewsData)

  }

  async function getPhotoData (review) {
    let photoData = await pool.query(`SELECT photos.id, photos.url FROM photos WHERE photos.review_id =${review.id}`);
    if (photoData) {
      return photoData.rows;
    } else {
      return [];
    }

  }


const getMetaData = (req,res) => {
  if (!req.query.product_id) {
    return res.status(400).send('Please provide a product_id')
  }
  //using product_id in reviews

  //console.log('Looking for meta data for product:', req.query.product_id)
}

const postReview = (req, res) => {
  if (!req.query.product_id) {
    return res.status(400).send('Please provide a product_id')
  }

  //console.log('Posting review for product:', req.query.product_id)
}

async function markAsHelpful (req, res) {
  if (!req.query.review_id) {
    return res.status(400).send('Please provide a review_id')
  }

  const updateHelpfulness = await pool.query(
    `UPDATE reviews
     SET helpfulness = helpfulness + 1
     WHERE reviews.id = ${req.query.review_id}
    `
  );

  res.status(201).send('Review marked as helpful')

  //console.log(`Marking review ${req.query.review_id} as helpful`)
}

async function reportReview (req, res) {
  if (!req.query.review_id) {
    return res.status(400).send('Please provide a review_id')
  }

  const updateHelpfulness = await pool.query(
    `UPDATE reviews
     SET reported = true
     WHERE reviews.id = ${req.query.review_id}
    `
  );

  res.status(201).send('Review has been reported')

}

module.exports = {
  getReviews,
  getMetaData,
  postReview,
  markAsHelpful,
  reportReview
}