// controllers/authController.js
const {user_game, user_game_history} = require('../models');
const { body, validationResult } = require('express-validator');
const express = require('express');
const paginate = require('express-paginate');
const { query } = require('express');
const app = express();
app.use(paginate.middleware(10, 50));
const moment = require('moment')


module.exports = {
	getDetailProfileByID: (req, res, next) => {
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
        user_game.findOne({
            where: {id: req.body.id},
            // include: [{model: user_game_history, as: 'history'}]
        }).then(result => {
            // console.log(res)
            res.status(200).json({ 
                "status": "success",
                "message": "berhasil get detail profile",
                "code": 200,
                "data": result,
                "tanggal": 'dddd'
            });
        }).catch(err => {
            res.status(400).json({ 
                "status": "error",
                "code": 400,
                "errors": err});
        })

	},
    getDetailProfileByParamsID: (req, res, next) => {
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
        user_game.findOne({
            where: {id: req.params.id},
            // include: [{model: user_game_history, as: 'history'}]
        }).then(result => {
            // console.log(res)
            res.status(200).json({ 
                "status": "success",
                "message": "berhasil get detail profile",
                "code": 200,
                "data": result,
                'data1': moment(result.createdAt).format('DD MMM YYYY')
            });
        }).catch(err => {
            res.status(400).json({ 
                "status": "error",
                "code": 400,
                "errors": err});
        })

	},
    updateProfileByID: (req, res, next) => {
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

        user_game.update(req.body, {where: {id: req.body.id}}).then(result => {
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
       
    }
};
