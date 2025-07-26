const handleProfileGet = (req, res, db) => {
  const { id } = req.params; 
  db.select('*').from('users').where({id})
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
}

const handleProfileUpdate = (req, res, db) => {
  const { id } = req.params;
  const { name, age, pet } = req.body.formInput;
  db('users')
    .where({ id })
    .update({ name, age, pet })
    .then(resp => {
      if (resp) {
        res.json('success')
      } else {
        res.status(400).json('Unable to update')
      }
    })
    .catch(err => res.status(400).json('error updating user'))
}

const uploadProfileImage = async (req, res, db) => {
  const { id } = req.params;

  try {
    const existingUser = await db.select('*').from('users').where({ id }).first();  
    if (!existingUser) {
      return res.status(400).json('User not found');
    }
    return res.json({
      message: 'File uploaded successfully!',
      filePath: req.file.path 
    });
  } catch (err) {
    return res.status(400).json('Error getting user');
  }
}

module.exports = {
  handleProfileGet,
  handleProfileUpdate,
  uploadProfileImage
}