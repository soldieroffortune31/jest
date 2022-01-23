'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('user_games', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING
			},
			username: {
				type: Sequelize.STRING,
				unique: true, // Tambahkan constraint unique di username
			},
			email: {
				type: Sequelize.STRING,
			},
			password: {
				type: Sequelize.STRING,
			},
			nama_lengkap: {
				type: Sequelize.STRING,
			},
			alamat: {
				type: Sequelize.STRING
			},
			nomor_telepon: {
				type: Sequelize.STRING
			},
			tanggal_lahir: {
				type: Sequelize.DATE
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('user_games');
	}
};


// idfirebase: res.user.uid,
//               username: username,
//               email: email,
//               password: password,
//               nama_lengkap: nama_lengkap,
//               alamat: alamat,
//               nomor_telepon: nomor_telepon,
//               tanggal_lahir: tanggal_lahir,