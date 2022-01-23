var express = require('express');
var router = express.Router();

// Controllers
const auth = require('../controllers/authController');

router.get('/', (req, res) => {
    res.status(200).json({msg : "API telah terhubung!"})
})

router.get('/skornavbar/:id', auth.navbarPoint);

/* register page. */
router.post('/register', auth.register);

router.delete('/delete', auth.deleteUser);
// idfirebase: res.user.uid,
//               username: username,
//               email: email,
//               password: password,
//               nama_lengkap: nama_lengkap,
//               alamat: alamat,
//               nomor_telepon: nomor_telepon,
//               tanggal_lahir: tanggal_lahir,
module.exports = router;
