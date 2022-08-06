// import SQ from 'sequelize';
// import { sequelize } from '../db/database.js';
// const DataTypes = SQ.DataTypes;

import { getUsers } from '../database/database.js';
import MongoDb from 'mongodb';

const ObjectId = MongoDb.ObjectId;

export async function findByUsername(username) {
  return getUsers()
    .findOne({ username }) //
    .then(mapOptionalUser);
}

export async function findById(id) {
  return getUsers()
    .findOne({ _id: new ObjectId(id) })
    .then(mapOptionalUser);
}

export async function createUser(user) {
  return getUsers()
    .insertOne(user)
    .then((data) => data.insertedId.toString());
}

function mapOptionalUser(user) {
  return user ? { ...user, id: user._id.toString() } : user;
}

// sequelize

// export const User = sequelize.define(
//   'user',
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true,
//     },
//     username: {
//       type: DataTypes.STRING(45),
//       allowNull: false,
//     },
//     password: {
//       type: DataTypes.STRING(128),
//       allowNull: false,
//     },
//     name: {
//       type: DataTypes.STRING(128),
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING(128),
//       allowNull: false,
//     },
//     url: DataTypes.TEXT,
//   },
//   { timestamps: false }
// );

// export async function findByUsername(username) {
//   return User.findOne({ where: { username } });
// }

// export async function findById(id) {
//   return User.findByPk(id);
// }

// export async function createUser(user) {
//   return User.create(user).then((data) => data.dataValues.id);
// }
