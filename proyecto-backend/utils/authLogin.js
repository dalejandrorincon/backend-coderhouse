import { administrador } from '../server.js';
/* ---------------------------------- MiddleWare auth --------------------------------- */
export const authLogin = function (req, res, next) {
  if (administrador)
    return next();
  else
    return res.sendStatus(401);
};

