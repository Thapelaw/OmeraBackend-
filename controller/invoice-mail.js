const Invoice = require('../models/invoice');
const nodemailer = require('nodemailer');
const pdf = require("pdf-creator-node");
const fs = require('fs');
// Read HTML Template
const html = fs.readFileSync('template.html', 'utf8');

const options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm"
};


exports.createInvoice = (req, res) => {
    const { firstName, lastName, email, phoneNumber, serviceOne, serviceTwo, serviceThree, priceOne, priceTwo, priceThree, totalCost } = req.body;
    let sendInvoice = new Invoice({
        firstName,
        lastName,
        email,
        phoneNumber,
        serviceOne,
        serviceTwo,
        serviceThree,
        priceOne,
        priceTwo,
        priceThree,
        totalCost
    })
    const document = {
        html: html,
        data: {
            sendInvoice: sendInvoice
        },
        path: "./output.pdf"
    };
    sendInvoice.save()
        .then(data => {
            res.status(200).send(data);
            console.log(data)

            pdf.create(document, options)
                .then(res => {
                    sendMailInvoice(req.body.email)
                    console.log(res)
                })
                .catch(error => {
                    console.error(error)
                });

        })
        .catch(err => {
            res.send(err)
        })
}

function sendMailInvoice(email) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'omeraserv@gmail.com',
            pass: 'Omera1996!'
        }
    });

    var mailOptions = {
        from: 'omeraserv@gmail.com',
        to: email,
        subject: 'Invoice for service',
        attachments: [
            {   // file on disk as an attachment
                filename: 'output.pdf',
                path: "./output.pdf" // stream this file
            }]

    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
