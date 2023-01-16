const models = require('../models');

module.exports = {
  getServers: (req, res) => {
    models.servers.getServers(req.params.user_id)
      .then((servers) => {
        res.status(200).send(servers);
      })
      .catch((err) => {
        res.status(501).send(err);
      });
  },

  getUsersInServer: (req, res) => {
    models.servers.getUsersInServer(req.params.server_id)
      .then((users) => {
        res.status(200).send(users);
      })
      .catch((err) => {
        res.status(501).send(err);
      });
  },

  createServer: (req, res) => {
    models.servers.createServer(req.body.server_name, req.body.private, req.body.admin_id)
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        res.status(501).send(err);
      })
  },

  inviteUser: (req, res) => {
    models.servers.inviteUser(req.params.server_id, req.params.user_id)
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        res.status(501).send(err);
      })
  }
}