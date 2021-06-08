const moment = require('moment');
const conn = require('./connection');
require('dotenv').config();

const collectionName = process.env.DB_NAME;

const create = async (message, nickname) => conn()
  .then((db) => {
    const timestamp = moment().format('DD-MM-YYYY h:mm:ss A');
    db.collection(collectionName).insertOne({
      message,
      nickname,
      timestamp,
    });
  });

const findAll = async () => conn()
  .then((db) => db.collection(collectionName).find().toArray());

module.exports = {
  create,
  findAll,
};