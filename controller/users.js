const User = require('../models/user');

exports.update = (req, res) => {

    User.findOneAndUpdate(req.params.id, req.body, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            res.status(200).send(user);
        })
};

exports.getAllAdmin = (req,res) => {
    User.find({role:"Admin"})
    .then(data => {
         res.json(data);
    })
    .catch(err => {
         res.json(err)
    })
}


exports.AddNewAdmin = (req,res) =>{
    const { firstName, lastName, email, username, phoneNumber, role, password } = req.body
  let newUser = new User({
    firstName,
    lastName,
    email,
    username,
    phoneNumber,
    role: role || "Admin",
    password
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to register user' });
    } else {
      res.json({ success: true, msg: 'User registered' });
    }
  });
}


//update a admin
exports.update = (req, res) => {

    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Admin not found with id " + req.params.id
                });
            }
            res.status(200).send(data);
        })
};

//get admin by id

exports.findAdminbyId = (req, res) => {
    User.findById(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Admin not found with id " + req.params.id
                });
            }
            res.status(200).send(data);

        })
        .catch(err => {
            res.send(err)
        })
}

//remove a admin by id
exports.removeAdmin = (req, res) => {
    User.findByIdAndRemove(req.params.id)
         .then(data => {
              if (!data) {
                   return res.status(404).send({
                        message: "Admin not found with id " + req.params.id
                   });
              }

              res.json({ success: true, msg: 'Mechanic removed' });
         })
         .catch(err => {
              res.send(err)
         })
}