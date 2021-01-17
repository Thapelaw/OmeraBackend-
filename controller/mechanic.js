const mechanic = require('../models/mechanic');
const Mechanic = require('../models/mechanic');


//add new mechanic
exports.addMechanic = (req, res) => {
     const { companyName, email, phoneNumber, address } = req.body;

     let newMechanic = new Mechanic({
          companyName,
          email,
          phoneNumber,
          address,
     })

     newMechanic.save()
          .then(data => {
               res.status(200).send(data);
          })
          .catch(err => {
               res.send(err)
          })

}
//get all the reqistered mechanics
exports.getAllReqisteredMechanics = (req, res) => {
     Mechanic.find()
          .then(data => {
               res.json(data);
          })
          .catch(err => {
               res.json(err)
          })
}

//update a mechanic
exports.update = (req, res) => {

     Mechanic.findOneAndUpdate(req.params.id, req.body, { new: true })
         .then(mechanic => {
             if (!mechanic) {
                 return res.status(404).send({
                     message: "Mechanic not found with id " + req.params.id
                 });
             }
             res.status(200).send(mechanic);
         })
 };

 //get mechanic by id

 exports.findMechanicbyId = (req, res) => {
     Mechanic.findById(req.params.id)
         .then(data => {
             if (!data) {
                 return res.status(404).send({
                     message: "Mechanic not found with id " + req.params.id
                 });
             }
             res.status(200).send(data);
 
         })
         .catch(err => {
             res.send(err)
         })
 }

//remove a mechanic by id
exports.removeMechanic = (req, res) => {
     Mechanic.findByIdAndRemove(req.params.id)
          .then(data => {
               if (!data) {
                    return res.status(404).send({
                         message: "Mechanic not found with id " + req.params.id
                    });
               }

               res.json({ success: true, msg: 'Mechanic removed' });
          })
          .catch(err => {
               res.send(err)
          })
}