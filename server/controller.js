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


async function getMetaData (req,res) {
  if (!req.query.product_id) {
    return res.status(400).send('Please provide a product_id')
  }
  //using product_id in reviews

  let metaObj = {
    "product_id": req.query.product_id,
    "ratings": {

    },
    "recommended": {
      "true": 0,
      "false":0
    },
    "characteristics": {},
  };

  let ratings_rec = await pool.query(`SELECT id, product_id,recommend, rating FROM reviews WHERE product_id = ${req.query.product_id}`);

  ratings_rec.rows.forEach(row => {
    if(row.recommend === 'false') {
      metaObj.recommended.false++
    } else if (row.recommend === 'true') {
      metaObj.recommended.true++
    }

    let rating = row.rating;

    if(!metaObj.ratings[rating]) {
      //console.log('ANYTHING')
      metaObj.ratings[rating] = 1;
    } else {
      metaObj.ratings[rating]++;
    }
  });
  let chars = await getChars(ratings_rec);

  metaObj.characteristics = chars;
  res.status(200).send( metaObj)

  //console.log('Looking for meta data for product:', req.query.product_id)
}

async function getChars(reviews) {
  let charObj = {};
  let charNames = await pool.query(`SELECT characteristics.id, characteristics.name FROM characteristics WHERE product_id=${reviews.rows[0].product_id}`);



  //console.log(charNames.rows)
  for (let row of charNames.rows) {
    let charValQuery = await pool.query (`SELECT characteristics_reviews.value FROM characteristics_reviews WHERE characteristics_id = ${row.id}`);


    let sumOfRows = charValQuery.rows.reduce((acc, row) => {
      return acc + row.value;
    },0);

    row.average = sumOfRows/charValQuery.rows.length;
  }

  charNames.rows.forEach(row => {
    let name = row.name;
    charObj[name] = {
      "id" : row.id,
      "value": row.average
    }
  })
  return charObj
};

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