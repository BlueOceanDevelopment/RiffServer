const db = require('../database/db');

module.exports = {
  getUserId: (username) => {
    return db.query(`SELECT id FROM users WHERE username='${username}'`)
      .then((result) => {
        return result.rows;
      })
      .catch((err) => {
        return err;
      });
  },

  getFriends: (user_id) => {
    return db.query(`SELECT id, username FROM users WHERE id IN (SELECT friend_id FROM friends WHERE user_id=${user_id})`)
      .then((result) => {
        return result.rows;
      })
      .catch((err) => {
        return err;
      })
  },

  createUser: (username, password) => {
    const queryString = `INSERT INTO users (username, password) VALUES ($1, $2)`

    return db.query(queryString, [username, password])
      .catch((err) => {
        return err;
      })
  },

  addFriend: (user_id, friend_id) => {
    const queryString = `INSERT INTO friends (user_id, friend_id) VALUES ($1, $2)`

    return db.query(queryString, [user_id, friend_id])
      .catch((err) => {
        return err;
      } )
  }

}