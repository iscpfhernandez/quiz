var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

router.get('/author', function(req, res) {
  res.render('author', { title: 'Quiz', errors:[] });
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors:[] });
});

//Autoload de comandos con :quizId
router.param('quizId', quizController.load); //autoload :quizId

//definicion de rutas de /quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
//nueva pregunta
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);
//editar pregunta
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);

module.exports = router;