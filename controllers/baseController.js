module.exports = {
    index: (req, res) => {
      res.status(200).json({
        status: true,
        message: "Hello World!"
      })
    },
    sum: (req, res) => {
        if(req.body.y && req.body.x) {
            res.status(200).json({
                status: true,
                message: "Parameters summarized!",
                data: { "x": req.body.x, "y": req.body.y, "result": req.body.x + req.body.y }
            })
        } else {
            res.status(400).json({
                 status: false,
                 message: req.body.y ? 'y kosong' : 'x kosong',
                 // DB
                 rupiah: 10000,
                // data: { "x": req.body.x, "y": req.body.y, "result": req.body.x + req.body.y }
            })
        }
       
    }
}