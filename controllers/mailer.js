var mailjet = require("node-mailjet").connect("af93ad31e932e0c4ca2449b5c1c8c507", "0ba8ab76c03d3fd80ee0156f839820b6");

// const nodemailer = require("nodemailer");

// module.exports = async (req, res) => {
//     let transporter = nodemailer.createTransport({
//         host: "in-v3.mailjet.com",
//         port: 587,
//         secure: false,
//         auth: {
//         user: 'af93ad31e932e0c4ca2449b5c1c8c507',
//         pass: '0ba8ab76c03d3fd80ee0156f839820b6'
//         }
//     });

//     await transporter.sendMail({
//         from: `"${req.body.name}" <${req.body.email}>`,
//         to: "pratapabhay540@gmail.com, rohilla.abhishek.27@gmail.com",
//         subject: "New query from abhishekrohilla.in",
//         html: `Name: ${req.body.name}, <br/> Email: ${req.body.email}, <br/> Message: ${req.body.message}`
//     }, (error, info) => {
//         console.log(error, info);
//         if(error) return res.status(400).send('Somting went wrong.')
//         res.status(200).send('Query Submitted. Thanks for reaching us out, we\'ll connect soon.')
//     });
// }

module.exports = async (req, res) => {
  email = {
    FromName: "Enquiry email",
    FromEmail: "enquiry@abhishekrohilla.in",
    Recipients: [{ Email: "pratapabhay540@gmail.com" }, { Email: "rohilla.abhishek.27@gmail.com" }],
    Subject: "New query from abhishekrohilla.in",
    "Text-Part": `New Enquiry 

                  Name: ${req.body.name}, 
                  Email: ${req.body.email},
                  Message: ${req.body.message}`
  };

  mailjet
    .post("send")
    .request(email)
    .then(resp => res.status(200).send("Query Submitted. Thanks for reaching us out, we'll connect soon."))
    .catch(err => res.status(400).send("Somting went wrong."));
};
