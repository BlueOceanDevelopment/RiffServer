const models = require('../models');

module.exports = {
  getUserId: (req, res) => {
    models.users.getUserId (req.params.firebase_id)
      .then((userId) => {
        res.status(200).send(userId);
      })
      .catch((err) => {
        res.status(501).send(err);
      });
  },

  getFriends: (req, res) => {
    models.users.getFriends(req.params.user_id)
      .then((friends) => {
        res.status(200).send(friends);
      })
      .catch((err) => {
        res.status(501).send(err);
      })
  },

  createUser: (req, res) => {
    console.log('create user');
    models.users.createUser(req.body.username, req.body.firebase_id)
      .then((response) => {
        res.status(201).send(response);
      })
      .catch((err) => {
        res.status(501).send(err);
      })
  },

  addFriend: (req, res) => {
    console.log(req.body.user_id);
    console.log(req.body.friend_id);
    models.users.addFriend(req.body.user_id, req.body.friend_id)
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        res.status(501).send(err);
      })
  },

}