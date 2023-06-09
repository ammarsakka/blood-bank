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
  const { user } = req.body

  const query = `SELECT * FROM users WHERE id != '${user[0]?.id}' ORDER BY id DESC`
  connect.query(query).then((result) => {
    res.json(result)
  })
  connect.end()
})

app.post('/users/add', (req, res) => {
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

app.post('/users/edit', (req, res) => {
  const { id } = req.body

  const query = `SELECT * FROM users WHERE id = '${id}'`
  connect.query(query).then((resutlt) => {
    res.json(resutlt)
  })
  connect.end()
})

app.post('/users/update', (req, res) => {
  const { fullname, username, email, phone, pass, status, id } = req.body

  const query = `UPDATE users SET full_name = '${fullname}', email = '${email}', password = '${pass}', username = '${username}', phone_number = '${phone}', status = '${status}' WHERE id = '${id}'`

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

app.use('/users/delete', (req, res) => {
  const { id } = req.body
  const query = ` DELETE FROM users WHERE id = '${id}'`
  connect.query(query).then((result) => {
    res.json(result)
  })
  connect.end()
})

app.post('/appointment/set', (req, res) => {
  const { hospital, date, user, gender, age, weight, bloodType, note } = req.body

  if (hospital && date && gender && age && weight && bloodType) {
    const query = `INSERT INTO donor (gender, age, weight, blood_type, hospital_id, user_id, date_donation, note, status) VALUES ('${gender}', '${age}', '${weight}', '${bloodType}', '${hospital}', '${user[0]?.id}', '${date}', '${note}', 'pending')`
    try {
      connect.query(query).then((result) => {
        res.json({ status: 200, message: result })
      }).catch((err) => {
        res.json({ status: 400, message: 'this user already exist' })
      })
      connect.end()
    } catch (error) {
      res.json({ status: 400, message: error })
    }
  } else
    res.json({ status: 400, message: 'All fields are required' })
})

app.post('/appointments/get/user', (req, res) => {
  const { user } = req.body


  const query = `SELECT donor.id, donor.gender, donor.age, donor.weight, donor.blood_type, donor.date_donation, donor.status, hospital.name FROM donor LEFT JOIN hospital ON hospital.id = donor.hospital_id WHERE donor.user_id = '${user[0]?.id}' ORDER BY donor.id DESC`

  connect.query(query).then((result) => {
    res.json(result)
  })
  connect.end()
})

app.post('/appointments/get/all', (req, res) => {
  const query = `SELECT donor.id, donor.gender, donor.age, donor.weight, donor.blood_type, donor.date_donation, donor.status, hospital.name, users.full_name FROM donor LEFT JOIN hospital ON hospital.id = donor.hospital_id LEFT JOIN users ON users.id = donor.user_id ORDER BY donor.id DESC`

  connect.query(query).then((result) => {
    res.json(result)
  })
  connect.end()
})

app.post('/appointments/update', (req, res) => {
  const { select } = req.body

  const query = `UPDATE donor SET status = 'completed' WHERE id IN (${select.join(',')})`

  connect.query(query).then((result) => {
    res.json(result)
  })
  connect.end()
})

app.post('/request/set', (req, res) => {
  const { hospital, date, user, bloodType, note } = req.body

  if (hospital && date && bloodType) {
    const query = `INSERT INTO request (blood_type, hospital_id, user_id, date_request, notes, status) VALUES ('${bloodType}', '${hospital}', '${user[0]?.id}', '${date}', '${note}', 'pending')`
    try {
      connect.query(query).then((result) => {
        res.json({ status: 200, message: result })
      }).catch((err) => {
        res.json({ status: 400, message: 'this user already exist' })
      })
      connect.end()
    } catch (error) {
      res.json({ status: 400, message: error })
    }
  } else
    res.json({ status: 400, message: 'All fields are required' })
})

app.post('/requests/get/user', (req, res) => {
  const { user } = req.body


  const query = `SELECT request.id, request.blood_type, request.date_request, request.status, hospital.name FROM request LEFT JOIN hospital ON hospital.id = request.hospital_id WHERE request.user_id = '${user[0]?.id}' ORDER BY request.id DESC`

  connect.query(query).then((result) => {
    res.json(result)
  })
  connect.end()
})

app.post('/requests/get/all', (req, res) => {
  const query = `SELECT request.id, request.blood_type, request.date_request, request.status, hospital.name, users.full_name FROM request LEFT JOIN hospital ON hospital.id = request.hospital_id LEFT JOIN users ON users.id = request.user_id ORDER BY request.id DESC`

  connect.query(query).then((result) => {
    res.json(result)
  })
  connect.end()
})

app.post('/requests/update', (req, res) => {
  const { select } = req.body

  const query = `UPDATE request SET status = 'approved' WHERE id IN (${select.join(',')})`

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