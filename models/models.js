var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLITE DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var psw = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

// NOTA: No existe el metodo 'success', se cambia por el metodo 'then'

//carga modelo ORM
var Sequelize = require('sequelize');

//usar BBDD SQLite
var sequelize = new Sequelize(DB_name, user, psw,
                   {dialect: dialect,
                    protocol:protocol,
                    port:port,
                    host:host,
                    storage: storage, // Solo SQLITE (.env)
                    omitNull:true // solo Postgres
                   }
 );
                   
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
                    respuesta: 'Roma',
                    tema: 'Otro'
                  });
      Quiz.create ({pregunta: 'Capital de Portugal (BD)',
                    respuesta: 'Lisboa',
                    tema: 'Otro'
                  })
     .then(function(){console.log('Base de datos inicializada')});
    };
  });
});