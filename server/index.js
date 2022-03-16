const express = require('express')
const app = express()
const port = 3000

app.use(express.static('client/dist'))
app.use(express.json());

var db = require('../db');

// Routes
// app.get('/products', (req, res) => {
//   var page = req.query.page || 1;
//   var count = req.query.count || 5;
//   var queryStr = `SELECT * FROM product WHERE id BETWEEN $1 AND $2`;
//   db.query(queryStr, [(page - 1) * count + 1, page * count])
//   .then(response => {
//     res.send(response.rows);
//   })
//   .catch(e => console.log(e))
// })

app.get('/comments', (req, res) => {
  var queryStr = 'SELECT * FROM comments';
  db.query(queryStr)
  .then(response => {
    res.status(200).send(response.rows);
  })
  .catch(e => console.log(e));
})

app.post('/comments', (req, res) => {
  var params = [req.body.nickname, req.body.comment]
  var queryStr = 'INSERT INTO comments(nickname, comment) VALUES($1, $2)';
  db.query(queryStr, params)
  .then(response => {
    res.status(201).send('successfully inserted');
  })
  .catch(e => console.log(e));
})



// Serve
app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})

