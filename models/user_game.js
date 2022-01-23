'use strict';
const { Model } = require('sequelize');

/* Pertama, kita import bcrypt untuk melakukan enkripsi */
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
	class user_game extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
			// user_game.hasOne(models.user_game_biodata, { foreignKey: 'id_user_game', as: 'user_biodata' });
			user_game.hasMany(models.user_game_history, {foreignKey: 'id_user_game', as: 'history'})
		}
		// Method untuk melakukan enkripsi
		static encrypt = (password) => bcrypt.hashSync(password, 10);
		// Lalu, kita buat method register
		static register = ({ id, username, password, email, nama_lengkap, alamat, nomor_telepon, tanggal_lahir }) => {
			const encryptedPassword = this.encrypt(
				password
			); /*
        #encrypt dari static method
        encryptedPassword akan sama dengan string
        hasil enkripsi password dari method #encrypt
        */

		//Data selain username sama password diisi null
			return this.create({
				id,
				username,
				password: encryptedPassword,
				email,
				nama_lengkap,
				alamat,
				nomor_telepon,
				tanggal_lahir});
		};
	}
	user_game.init(
		{
			id: {
				type: DataTypes.STRING,
				primaryKey: true
			},
			username: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			nama_lengkap: DataTypes.STRING,
			alamat: DataTypes.STRING,
			nomor_telepon: DataTypes.STRING,
			tanggal_lahir: DataTypes.DATE
		},
		{
			sequelize,
			modelName: 'user_game'
		}
	);
	return user_game;
};
