// import SQ from 'sequelize';
// import { sequelize } from '../db/database.js';
// import { User } from './auth.js';
// const DataTypes = SQ.DataTypes;
// const Sequelize = SQ.Sequelize;

import Mongoose from 'mongoose';
import { useVirtualId } from '../database/database.js';
import * as userRepository from './auth.js';

const tweetSchema = new Mongoose.Schema(
  {
    text: { type: String, required: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    url: String,
  },
  { timestamps: true }
);

useVirtualId(tweetSchema);
const Tweet = Mongoose.model('Tweet', tweetSchema);

export async function getAll() {
  return Tweet.find().sort({ createdAt: -1 });
}

export async function getAllByUsername(username) {
  return Tweet.find({ username }).sort({ createdAt: -1 });
}

export async function getById(id) {
  return Tweet.findById(id);
}

export async function create(text, userId) {
  return userRepository.findById(userId).then((user) =>
    new Tweet({
      text,
      userId,
      name: user.name,
      username: user.username,
    }).save()
  );
}

export async function update(id, text) {
  return Tweet.findByIdAndUpdate(id, { text }, { returnOriginal: false });
}

export async function remove(id) {
  return Tweet.findByIdAndDelete(id);
}

// sequelize

// const Tweet = sequelize.define('tweet', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   text: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
// });
// Tweet.belongsTo(User);

// const INCLUDE_USER = {
//   attributes: [
//     'id',
//     'text',
//     'createdAt',
//     'userId',
//     [Sequelize.col('user.name'), 'name'],
//     [Sequelize.col('user.username'), 'username'],
//     [Sequelize.col('user.url'), 'url'],
//   ],
//   include: {
//     model: User,
//     attributes: [],
//   },
// };

// const ORDER_DESC = {
//   order: [['createdAt', 'DESC']],
// };

// export async function getAll() {
//   return Tweet.findAll({ ...INCLUDE_USER, ...ORDER_DESC });
// }

// export async function getAllByUsername(username) {
//   return Tweet.findAll({
//     ...INCLUDE_USER,
//     ...ORDER_DESC,
//     include: {
//       ...INCLUDE_USER.include,
//       where: { username },
//     },
//   });
// }

// export async function getById(id) {
//   return Tweet.findOne({
//     where: { id },
//     ...INCLUDE_USER,
//   });
// }

// export async function create(text, userId) {
//   return Tweet.create({ text, userId }) //
//     .then((data) => getById(data.dataValues.id));
// }

// export async function update(id, text) {
//   return Tweet.findByPk(id, INCLUDE_USER) //
//     .then((tweet) => {
//       tweet.text = text;
//       return tweet.save();
//     });
// }

// export async function remove(id) {
//   return Tweet.findByPk(id) //
//     .then((tweet) => {
//       tweet.destroy();
//     });
// }
