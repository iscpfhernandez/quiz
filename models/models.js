var path = require('path');

// NOTA: No existe el metodo 'success', se cambia por el metodo 'then'

//carga modelo ORM
var Sequelize = require('sequelize');

//usar BBDD SQLite
var sequelize = new Sequelize(null, null, null,
                   {dialect: "sqlite", storage: "quiz.sqlite"});
                   
//importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

//exportar
exports.Quiz = Quiz;

//sequelize.sync(), crea e inicializa tabla de preguntas en DB
//sequelize.sync().success(function(){
sequelize.sync().then(function(){
  //success()  ejecuta el manejador una vez creada la tabla
  //count indica la cantidad de renglones de la tabla
  Quiz.count().then(function(count){
    if(count === 0) {  // la tabla se inicializa si esta vacia
      Quiz.create ({pregunta: 'Capital de Italia (BD)',
                    respuesta: 'Roma'
                     })
     .then(function(){console.log('Base de datos inicializada')});
    };
  });
});