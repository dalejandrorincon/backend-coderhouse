function checkAuth(req, res, next) {
  console.log(`Usuario autenticado: ${req.isAuthenticated()}`);
  if(req.isAuthenticated()){
    next();
  }else{
    res.redirect('/login')
  }
}

module.exports = checkAuth;