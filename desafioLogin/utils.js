const bcrypt = require('bcrypt');

module.exports = {
  //Encriptar contraseña
  hashPassword: (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  },
  comparePassword: (password, hash) => {
    return bcrypt.compareSync(password, hash);
  },
  isValidPassword: (user, password) => {
    return bcrypt.compareSync(password, user.password);
  }
}