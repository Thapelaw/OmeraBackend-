const Request = require("../models/request")
const nodemailer = require('nodemailer');

//create a new request
exports.createRequest = (req, res) => {
    const { firstName, lastName, email, phoneNumber, location,assignedMechanic, status } = req.body

    let newRequest = new Request({
        firstName,
        lastName,
        email,
        phoneNumber,
        location,
        assignedMechanic,
        status: status || 'Pending',
    })

    newRequest.save()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.send(err)
        })
}

//NB use this end point for admin when sending invoice
exports.findRequestbyId = (req, res) => {
    Request.findById(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Request not found with id " + req.params.id
                });
            }
            res.status(200).send(data);

        })
        .catch(err => {
            res.send(err)
        })
}


//get a request by email
exports.findRequestbyEmail = (req, res) => {

    Request.find({ email: req.params.email })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send(err)
        })
}
//get all the request
exports.getAllReguest = (req, res) => {
    Request.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send(err)
        })
}

//update the status of the requst
exports.updatRequest = (req, res) => {
    Request.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Request not found with id " + req.params.id
                });
            }
            res.status(200).send(data);
            if(req.body.status === "Declined"){
                sendMail(req.body.email, req.body.status)
            }else{
                sendMail(req.body.email, req.body.status)
                sendMailMechanic(req.body.assignedMechanic,req.body.firstName,req.body.lastName,req.body.phoneNumber,req.body.location)
            }
            
           
        })
        .catch(err => {
            res.send(err)
        })
}

//method to send email after request status updated
function sendMail(receiverMail, status,) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'omeraserv@gmail.com',
            pass: 'Omera1996!'
        }
    });

    var mailOptions = {
        from: 'omeraserv@gmail.com',
        to: receiverMail,
        subject: 'Request for a mechanic',
        text: 'Dear Customer your request for a mechanic has been ' + status
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

function sendMailMechanic(receiverMail,firstName,lastName,phoneNumber,location) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'omeraserv@gmail.com',
            pass: 'Omera1996!'
        }
    });

    var mailOptions = {
        from: 'omeraserv@gmail.com',
        to: receiverMail,
        subject: 'Request for a mechanic',
        text: `Dear Mechanic you have been assigned to service : ${firstName} ${lastName} ,phone number : ${phoneNumber} from ${location}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}