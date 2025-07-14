const jwt = require('jsonwebtoken');
const redis = require('redis');

const redisClient = redis.createClient(process.env.REDIS_HOST);

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json('Unauthorized');
  }
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(401).json('Unauthorized');
    }
    console.log('you shall pass');
    return next();
  });
};

const getAuthTokenId = (req, res) => {
  const { authorization } = req.headers;
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(400).json('Unauthorized');
    }
    return res.json({id: reply});
  });
}

const signToken = (email) => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, "JWT_SECRET", { expiresIn: '2 days' });
}

const setToken = (key, value) => {
  return Promise.resolve(redisClient.set(key, value));
}

const createSessions = (user) => {
  const { id, email } = user;
  const token = signToken(email);
  return setToken(token, id)
    .then(() => ({ success: true, userId: id, token }))
    .catch(err => console.log(err));
}

module.exports = {
  requireAuth: requireAuth,
  getAuthTokenId: getAuthTokenId,
  createSessions: createSessions
}