const mongoose = require('mongoose');

//  function to connect to the database
const connect = async () => {
  await mongoose.connect('mongodb+srv://DiegoRincon:qRjCYM2SzzYll7ke@cluster0.o8xmg3v.mongodb.net/plataforma?retryWrites=true&w=majority');
};

module.exports = { connect };