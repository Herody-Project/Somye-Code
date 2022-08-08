const express = require("express");
const router = express.Router();
const User = require("../Schema/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'stanleyishavinganaffair';
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require("dotenv").config();
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);





router.post(
  "/signup",
  body("company").isString(),
  body("manager").isString(),
  body("password").isLength({ min: 8 }),
  body("email").isEmail(),
  async (req, res) => {
    const { company, manager, email, password, cpassword, phoneNumber } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      res.status(400).json({ code: 'email' });
    } else if (password !== cpassword) {
      res.status(400).json({ code: password });
    } else {
      try {
        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(password, salt);
        const nuser = await User.create({
          company: company,
          manager: manager,
          password: pass,
          email: email,
          phoneNumber: phoneNumber,
          emailToken: crypto.randomBytes(64).toString('hex'),
          isVerified: false
        });
        try {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            secure: false,
            auth: {
              user: process.env.USER,
              pass: process.env.PASS,
            },
          });

          await transporter.sendMail({
            from: process.env.USER,
            to: nuser.email,
            subject: 'Xyz- Please verify your email',
            html: `<p > Hello <b> ${manager.charAt(0).toUpperCase() + manager.slice(1,)} </b>, welcome to Origin Cloud Technologies! <p> </br> <h3>Please verify your email here:<a href='http://${req.headers.host}/user/verify-email?token=${nuser.emailToken}'> Verify your email </a> </h3>`,
          });
          console.log("email sent sucessfully");
          res.json({ email: true })
        } catch (error) {
          console.log("email not sent");
          console.log(error);
          res.json({ email: false })

        }

      } catch (error) {
        res.status(408).json({ code: 'server' });
      }
    }
  }
);


router.patch(
  "/update-user",
  async (req, res) => {
    const { company, manager, email, phoneNumber, cin, pan, pincode, gstin, city, state, country, about, category, address } = req.body;
    const token = req.headers.authtoken;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findOne({ authtoken: token });
    if (user) {

      const uuser = await User.findOneAndUpdate({ authtoken: token }, {
        company: company,
        manager: manager,
        email: email,
        state: state,
        city: city,
        phoneNumber: phoneNumber,
        country: country,
        cin: cin,
        pan: pan,
        pincode: pincode,
        gstin: gstin,
        category: category,
        about: about,
        address: address
      });
      res.json({ success: true })
    } else {
      res.json({ success: false })

    }
  }
);






router.post(
  "/login",
  body("email").isEmail(),
  body("password").exists(),
  async (req, res) => {
    const { email, password } = req.body;
    const vuser = await User.findOne({ email: email });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.json('Please enter valid credentials!')
    }
    if (!vuser) {
      res.json("Email not found!")

    }

    else {
      try {
        const check = await bcrypt.compare(password, vuser.password);
        if (!check) {
          res.json("wrong password")
        }
        else {
          const data = {
            user: {
              id: vuser.id
            }
          }
          const authtoken = jwt.sign(data, JWT_SECRET);
          const uuser = await User.findOneAndUpdate({ email: email }, { authtoken: authtoken })

          res.json({ success: true, authtoken });

        }
      }
      catch (error) {
        res.json(error)

      }


    }
  }
)

router.patch('/mail-update', async (req, res) => {
  const email = req.body.email;
  const atoken = req.headers.authtoken;
  const uuser = await User.findOne({ authtoken: atoken });
  if (uuser) {
    if (uuser.email === email) {
      console.log('same email')
      res.json({ success: 'in use' })
    }
    else {
      const token = crypto.randomBytes(64).toString('hex');
      uuser.emailToken = token;
      await uuser.save()
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          port: 587,
          secure: false,
          auth: {
            user: process.env.USER,
            pass: process.env.PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.USER,
          to: email,
          subject: 'Xyz- Please verify your new email',
          html: `<p > Hello <b> ${uuser.manager} </b>,<h3>Please verify your new email here:<a href='http://${req.headers.host}/user/verify-email?token=${uuser.emailToken}&email=${email}'> Verify your email </a> </h3>`,
        });
        console.log("email sent sucessfully");
        res.json({ success: true })
      } catch (error) {
        console.log("email not sent");
        console.log(error);
        res.json({ success: false })

      }
    }


  }
  else {
    res.json({ Success: false })
  }
})

router.get('/verify-email', async (req, res) => {
  try {
    const token = req.query.token;
    const email = req.query.email;
    const fuser = await User.findOne({ emailToken: token });
    if (fuser) {
      fuser.emailToken = null;
      fuser.isVerified = true;
      fuser.email = email
      await fuser.save();
      res.redirect('http://localhost:3000/verify-email')
      console.log("Email verified successfully!");

    }
    else {
      console.log('email is not verified')
      res.json({ verify: false })
      res.redirect('http://localhost:3000/signup')

    }

  } catch (error) {
    console.log(error)
  }
})


router.post('/send-verification', async (req, res) => {
  client.verify.services(process.env.VERIFY_SERVICE_SID)
    .verifications
    .create({ to: `+${req.body.phoneNumber}`, channel: 'sms' })
    .then(verification => console.log(verification.status))
    .catch(e => {
      console.log(e)
      res.status(500).send(e);
    });

  res.status(200).json('success');
});

router.post('/verify-OTP', async (req, res) => {
  const check = await client.verify.services(process.env.VERIFY_SERVICE_SID)
    .verificationChecks
    .create({ to: `+${req.body.phoneNumber}`, code: req.body.otp })
    .catch(e => {
      console.log(e)
      res.status(500).send(e);
    });
  res.status(200).send(check);
})

router.patch('/update-pass', async (req, res) => {
  try{
  const {  npass } = req.body;
  const token = req.headers.authtoken;
  const user = await User.findOne({ authtoken: token });
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash(npass, salt);
  user.password = pass;
  await user.save();
  res.json({ success: true })
  }
  catch(error){
    res.json({success:false})
  }
})

router.post('/verify-otp', async (req, res) => {
  const check = await client.verify.services(process.env.VERIFY_SERVICE_SID)
    .verificationChecks
    .create({ to: `+${req.body.phoneNumber}`, code: req.body.otp })
    .catch(e => {
      console.log(e)
      res.status(500).send(e);
    });
  const token = req.headers.authtoken;
  const vuser = await User.findOneAndUpdate({ authtoken: token }, { isChecked: true, phoneNumber: req.body.phoneNumber });

  res.status(200).send(check);
});
router.get('/fetch-user', async (req, res) => {
  const token = req.headers.authtoken;
  const vuser = await User.findOne({ authtoken: token });
  if (vuser) {
    res.json(vuser);

  }
  else {
    res.json('User not found')
  }

})


module.exports = router;
