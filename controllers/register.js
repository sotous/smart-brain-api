const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json('incorrect form submission');
  }
  const hash = bcrypt.hashSync(password);
  return db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {
      return trx('users')
        .returning('*')
        .insert({
          email: loginEmail[0].email,
          name: name,
          joined: new Date()
        })
        .then(user => Promise.resolve(user[0]))
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => Promise.reject('unable to register'))
}

const registerAuthentication = (db, bcrypt) => (req, res) => {
  return handleRegister(req, res, db, bcrypt)
    .then(data => data.id && data.email ? createSessions(data) : Promise.reject(data))
    .then(session => res.json(session))
    .catch(err => res.status(400).json(err))
}

module.exports = {
  registerAuthentication: registerAuthentication
};


