const handleRegister = (req, res, bcrypt, db) => {
  const { email, password, name } = req.body;
  const hash = bcrypt.hashSync(password);
  if (!email || !password || !name) {
    return res.status(400).json("blank credentials");
  }
  db.transaction((trx) => {
    trx("login")
      .insert({
        hash: hash,
        email: email,
      })
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json("Unable to Register"));
};

module.exports = {
  handleRegister: handleRegister,
};
