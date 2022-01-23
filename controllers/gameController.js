// controllers/authController.js
const {user_game_history, user_game} = require('../models');
const { body, validationResult } = require('express-validator');
const express = require('express');
const paginate = require('express-paginate');
const { query } = require('express');
const app = express();
app.use(paginate.middleware(10, 50));


module.exports = {
	store: (req, res, next) => {
		const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
            // Build your resulting errors however you want! String, object, whatever - it works!
            return {
                "key": param,
                "message": msg
            };
          };
	   
		// console.log(req)
        const result = validationResult(req).formatWith(errorFormatter);
		console.log(result)
        if (!result.isEmpty()) {
        return res.status(400).json({ 
            "status": "error",
            "code": 400,
            "errors": result.array() });
        }
		// Kita panggil static method register yang sudah kita buat tadi

        GameLists.create(req.body).then(result => {
            res.status(200).json({ 
                "status": "success",
                "message": "berhasil update profile",
                "code": 200,
                "data": result
            });
        }).catch(err => {
            res.status(400).json({ 
            "status": "error",
            "code": 400,
            "errors": 'gagal menambah data'});
        })
      
	},
    getAll: (req, res, next) => {
		GameLists.findAndCountAll({limit: req.query.limit, offset: req.skip})
		.then(results => {
		  const itemCount = results.count;
		  const pageCount = Math.ceil(results.count / req.query.limit);
  
		  res.json({
			  status: "success",
			  code : 200,
			  data: results.rows,
			  pageCount,
			  itemCount,
			  // pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
		  })
  
	  }).catch(err => {
		  res.json({
			  "status": "error",
			  "code": 404,
			  "message" : err
		  }, 404)
	  })
	},
    getDetail: (req, res, next) => {
        const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
            // Build your resulting errors however you want! String, object, whatever - it works!
            return {
                "key": param,
                "message": msg
            };
          };
	   
		// console.log(req)
        const result = validationResult(req).formatWith(errorFormatter);
		console.log(result)
        if (!result.isEmpty()) {
        return res.status(400).json({ 
            "status": "error",
            "code": 400,
            "errors": result.array() });
        }
		// Kita panggil static method register yang sudah kita buat tadi

        GameLists.findOne({where: {id: req.params.id}}).then(result => {
            res.status(200).json({ 
                "status": "success",
                "message": "berhasil get Detail Game",
                "code": 200,
                "data": result
            });
        }).catch(err => {
            res.status(400).json({ 
            "status": "error",
            "code": 400,
            "errors": 'gagal menambah data'});
        })
    },
    delete: (req, res, next) => {
        const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
            // Build your resulting errors however you want! String, object, whatever - it works!
            return {
                "key": param,
                "message": msg
            };
          };
	   
		
        const result = validationResult(req).formatWith(errorFormatter);
		console.log(result)
        if (!result.isEmpty()) {
        return res.status(400).json({ 
            "status": "error",
            "code": 400,
            "errors": result.array() });
        }

        console.log('ini params url', req.params)
        console.log('ini query param', req.query)

        GameLists.destroy({where: {id: req.params.id}}).then(result => {
            // console.log(res)
            res.status(200).json({ 
                "status": "success",
                "message": "berhasil hapus",
                "code": 200,
                "data": result
            });
        }).catch(err => {
            res.status(400).json({ 
                "status": "error",
                "code": 400,
                "errors": err});
        })
        // query
        // body
        // params


        // main logic
       
    },
    update: (req, res, next) => {
        const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
            // Build your resulting errors however you want! String, object, whatever - it works!
            return {
                "key": param,
                "message": msg
            };
          };
	   
		
        const result = validationResult(req).formatWith(errorFormatter);
		console.log(result)
        if (!result.isEmpty()) {
        return res.status(400).json({ 
            "status": "error",
            "code": 400,
            "errors": result.array() });
        }

        console.log('ini params url', req.params)
        console.log('ini query param', req.query)

        GameLists.update(req.body, {where: {id: req.params.id}}).then(result => {
            // console.log(res)
            res.status(200).json({ 
                "status": "success",
                "message": "berhasil update profile",
                "code": 200,
                "data": result
            });
        }).catch(err => {
            res.status(400).json({ 
                "status": "error",
                "code": 400,
                "errors": err});
        })
        // query
        // body
        // params


        // main logic
       
    },
    addHistory: async (req, res, next) => {
       // jika pertama kali main create
       // kalo sudah pernah nanti update
       // id_user
       

       // kita check dulu ada datanya atau history
       let dataHistoryUser = await user_game_history.findOne({where: {id_user_game: req.body.user_id, game_id: req.body.game_id}})
       if(dataHistoryUser){
            // update point sama total play
            let totalPlay = dataHistoryUser.total_play + 1
            let totalSkor = dataHistoryUser.point + req.body.point
            let updateHistory = await user_game_history.update({point : totalSkor, total_play : totalPlay},
                {where: {id_user_game: req.body.user_id, game_id: req.body.game_id}} )
            if(updateHistory){
                res.status(200).json({
                    "status": "success",
                    "message": "berhasil tambah history",
                    "code": 200,
                    "data": updateHistory
                });
            } else {
                res.status(400).json({ 
                    "status": "error",
                    "code": 400,
                    "errors": err});
            }

       } else {
            // create data
            let createHistory = await user_game_history.create({
                  id_user_game:req.body.user_id,
                  game_id: req.body.game_id,
                  point: req.body.point,
                  total_play: 1
            })
            if(createHistory){
                res.status(200).json({ 
                    "status": "success",
                    "message": "berhasil tambah history",
                    "code": 200,
                    "data": createHistory
                });
            } else {
                res.status(400).json({ 
                    "status": "error",
                    "code": 400,
                    "errors": err});
            }
       }
    },

    //Berikut adalah kodingan untuk menunjukkan skor di leaderboard
    //Pertama-tama, cari terlebih dahulu game yang ingin ditunjukkan skor dkk nya
    //Hal ini diambil dari tabel user game history yang menyimpan poin dan id player
    //Setelah itu semua data yang berhubungan dengan game yang bersangkutan diambil (lewat game_id)
    //Order di bawah digunakan untuk menyortir data dari point tertinggi
    //Setelah itu data yang sudah difilter dan disortir akan dikirim dalam bentuk json
    showLeaderboard: async (req,res) => {
        let leaderboard = await user_game_history.findAll({
            where : {game_id : req.params.id},
            include: [
                {model: user_game, as: 'user', attributes: ['username']}
            ],
            order: [["point", "DESC"]],
            
        })
        res.json(leaderboard)
    },

    //Koding di bawah digunakan untuk mengaplikasikan paginate ke leaderboard
    showLeaderboardPaginate: async (req,res) => {
        user_game_history.findAndCountAll({
            where : {game_id : req.params.id},
            include: [
                {model: user_game, as: 'user', attributes: ['username']}
            ],
            order: [["point", "DESC"]],
            distinct: true,
            limit: req.query.limit, offset: req.skip
        })
		.then(results => {
		  const itemCount = results.count;
		  const pageCount = Math.ceil(results.count / req.query.limit);
          console.log("ItemCount: " + itemCount)
          console.log("PageCount: " + pageCount)
  
		  res.json({
			  status: "success",
			  code : 200,
			  data: results.rows,
            //   sudahmain: true,
			  pageCount,
			  itemCount,
			  // pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
		  })
  
	  }).catch(err => {
		  res.json({
			  "status": "error",
			  "code": 404,
			  "message" : err
		  }, 404)
	  })
    },
    cekGame: (req, res, next) => {
        const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
            // Build your resulting errors however you want! String, object, whatever - it works!
            return {
                "key": param,
                "message": msg
            };
          };
	   
		// console.log(req)
        const result = validationResult(req).formatWith(errorFormatter);
		console.log(result)
        if (!result.isEmpty()) {
        return res.status(400).json({ 
            "status": "error",
            "code": 400,
            "errors": result.array() });
        }
		// Kita panggil static method register yang sudah kita buat tadi
        user_game_history.findOne({where: {id_user_game: req.params.id}}).then(result => {
            console.log(result)
            if(result){
                res.status(200).json({ 
                    "status": "success",
                    "message": "berhasil get Detail Game",
                    "code": 200,
                    "data": true
                });
            } else {
                res.status(200).json({ 
                    "status": "success",
                    "message": "berhasil get Detail Game",
                    "code": 200,
                    "data": false
                });
            }
             
        }).catch(err => {
            res.status(400).json({ 
            "status": "error",
            "code": 400,
            "errors": 'gagal menambah data'});
        })
    },

    attachment: (req, res, next) => {
        console.log(req.file)
    }
    
};
