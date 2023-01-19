const db = require('../database/db')

module.exports = {
  getMessages: (server_id, channel_id) => {
    return db.query(`SELECT *, (SELECT username FROM users WHERE id = messages.user_id) FROM messages WHERE server_id=${server_id} AND channel_id=${channel_id}`)
      .then((result) => {
        return result.rows;
      })
      .catch((err) => {
        console.log(err)
        return err;
      });
    },

    getDirectMessages: (user_id, recipient_id) => {
      return db.query(`SELECT * FROM messages WHERE (user_id=${user_id} AND recipient_id=${recipient_id}) OR (user_id=${recipient_id} AND recipient_id=${user_id})`)
        .then((result) => {
          return result.rows;
        })
        .catch((err) => {
          return err;
        })
    },

    postMessage: (message, server_id, channel_id, user_id, recipient_id) => {
      const queryString = `INSERT INTO messages (message, server_id, channel_id, user_id, recipient_id, created_at) VALUES ($1, $2, $3, $4, $5, $6)`
      return db.query(queryString, [message, server_id, channel_id, user_id, recipient_id, Date.now()])
    },

};