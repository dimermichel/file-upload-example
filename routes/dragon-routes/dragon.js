const express = require('express');
const router  = express.Router();
const uploadCloud = require('../../config/cloudinary');


const Dragon = require('../../models/Dragon')

/* Dragon home page */
router.get('/', (req, res, next) => {
  Dragon.find()
  .then(allTheDragonsFromDB => {
    res.render('dragons/dragon-home', {dragons: allTheDragonsFromDB});
  })
  .catch(err => next(err))
});

router.post('/create', uploadCloud.single('image') ,(req, res, next) => {
  const dragonInputInfo = req.body;
  dragonInputInfo.image = req.file.url;
  console.log({body: req.body , file: req.file})
  Dragon.create(dragonInputInfo)
  .then( newCreatedDragon => {
    res.redirect('back');
  })
  .catch(err => next(err))
  
});


module.exports = router;
