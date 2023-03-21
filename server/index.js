const express = require('express');
const cors = require('cors')
const port = 4000

const mysql = require('serverless-mysql');
const bodyParser = require('body-parser')

const connect = mysql({
  config: {
    user: 'root',
    port: 3306,
    password: '',
    host: 'localhost',
    database: 'mediplus'
  }
})

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.post('/register', (req, res) => {
  const { fullname, username, email, phone, pass } = req.body

  const query = `INSERT INTO users (full_name, email, password, username, phone_number)
  VALUES ('${fullname}', '${email}', '${pass}', '${username}', '${phone}')`

  try {
    connect.query(query).then((resutlt) => {
      res.json({ status: 200, message: 'user created' })
    }).catch((err) => {
      res.json({ status: 500, message: 'this user already exist' })
    })
    connect.end()
  } catch (error) {
    res.json(error)
  }
})

app.post('/signin', (req, res) => {
  const { username, pass } = req.body

  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${pass}'`

  const result = connect.query(query).then((result) => {
    res.json(result)
  })
  connect.end()
})

app.post('/user/password', (req, res) => {
  const { current, passcode, user } = req.body
  const query = `SELECT password FROM users WHERE id = '${user[0].id}'`
  connect.query(query).then((result) => {
    if (result[0].password.match(current)) {
      const query = `UPDATE users SET password = '${passcode}' WHERE id = '${user[0].id}'`
      connect.query(query).then((data) => {
        res.json({ status: 200 })
      })
    }
    else {
      res.json({
        status: 500,
        message: 'Incorrect Current Password'
      })
    }
  })
})

app.post('/hospital/add', (req, res) => {
  const { name, phone, email, location } = req.body

  const query = `INSERT INTO hospital (name, phone, email, location) VALUES('${name}','${phone}', '${email}', '${location}')`
  connect.query(query).then((result) => {
    res.json(result)
  })
  connect.end()
})

app.use('/hospital/get', (req, res) => {
  const query = `SELECT * FROM hospital ORDER BY id DESC`
  connect.query(query).then((result) => {
    res.json(result)
  })
  connect.end()
})

app.use('/hospital/edit', (req, res) => {
  const { hospital } = req.body
  const query = `SELECT * FROM hospital WHERE id = '${hospital}'`
  connect.query(query).then((result) => {
    res.json(result)
  })
  connect.end()

})

app.use('/hospital/delete', (req, res) => {
  const { id } = req.body
  const query = ` DELETE FROM hospital WHERE id = '${id}'`
  connect.query(query).then((result) => {
    res.json(result)
  })
  connect.end()

})

app.post('/hospital/update', (req, res) => {
  const { name, phone, email, location, hospital } = req.body

  const query = `UPDATE hospital SET name = '${name}', phone = '${phone}', email = '${email}', location = '${location}' WHERE id = '${hospital}'`
  connect.query(query).then((result) => {
    res.json(result)
  })
  connect.end()
})

app.post('/users/get', (req, res) => {
  const query = `SELECT * FROM users ORDER BY id DESC`
  connect.query(query).then((result) => {
    res.json(result)
  })
  connect.end()
})

app.use('/', (req, res) => {
  res.send('Hello')
})


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})