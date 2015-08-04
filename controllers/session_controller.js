 //GET /login
 exports.new = function(req, res){
 var errors = req.session.errors || {};
 req.session.errors = {};
 res.render('sessions/new', {errors: errors});
};

//MW de autorizacion de acceso HTTP restringidos
exports.loginRequired = function(req, res, next){
  if (req.session.user) { next ();    }
  else {res.redirect('/login');}
};

//POST /login
exports.create = function(req, res){
 var login = req.body.login;
 var password = req.body.password;
 
 var userController = require('./user_controller');
 userController.autenticar(login, password, function(error, user){
   if (error) {  //si hay error retornamos mensajes de error de sesion
     req.session.errors = [{"message": "Se ha producido un error:" + error}];
     res.redirect("/login");
     return;
   }
   
   //crear req.session.user y guardas campos id y username
   //la sesion se define por la existencia de: req.session.user
   req.session.user = {id:user.id, username: user.username};
   var ruta = req.session.redir || "/";
   //redirecciona a path anterior a login
   res.redirect(ruta.toString());
 });
};

//DELETE /logout
exports.destroy = function(req, res){
 delete req.session.user;
 //redirecciona a path anterior a login
 res.redirect(req.session.redir.toString());
};