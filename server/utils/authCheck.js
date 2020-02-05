const isValidToken = require('./isValidToken');

const authCheck = (context, resolveFunc) =>
  new Promise((resolve, reject) =>
    isValidToken(context.token).then(async () =>
      await resolve(resolveFunc)
    ).catch(err => reject(err))
  );

module.exports = authCheck;
