const moment = require('moment');
const conn = require('./connection');

const collectionName = 'messages';

const create = (message, nickname) => conn()
  .then((db) => {
    const timestamp = moment().format('DD-MM-YYYY h:mm:ss A');
    db.collection(collectionName).insertOne({
      message,
      nickname,
      timestamp,
    });
  });

const findAll = () => conn()
  .then((db) => db.collection(collectionName).find().toArray());

module.exports = {
  create,
  findAll,
};