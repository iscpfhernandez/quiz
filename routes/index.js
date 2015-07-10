var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');


router.get('/author', function(req, res) {
  res.render('author', { title: 'Quiz' });
});
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

module.exports = router;