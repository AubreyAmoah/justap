const { connect } = require("./config/database");
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const multer = require('multer');


const User = require("./model/User");
const BioData = require("./model/Bio");
const Message = require("./model/Message");
const ChatList = require("./model/ChatList");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const TOKEN_KEY = "tokenizer";

connect();

const auth = require("./middleware/auth");
const Bio = require("./model/Bio");

const app = express();

// Set the maximum allowed size for incoming request bodies
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

const jsonParser = bodyParser.json();

app.use(express.urlencoded({ extended: true }))

app.use(jsonParser)
// app.use(express.json());

app.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.static(path.join(__dirname, 'public', 'assets')));

app.use(express.static(path.join(__dirname, 'public', 'uploads')));

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function(req, file, cb) {
    const ext = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + Date.now() + '.' + ext);
  }
});

const upload = multer({ storage: storage });


//const upload = multer({ dest: 'public/uploads/' });



// Register
app.post("/register", async(req, res) => {
  // our register logic goes here...
      // Our register logic starts here
    try {
      // Get user input
      const { first_name, last_name, email, gender, university, level, password, repeat_password, dob } = req.body;
  
      console.log(req.body)
  
      // Validate user input 
      if (!email){
        return res.status(400).json({data:'email field is empty'});
      }

      if (!first_name){
        return res.status(400).json({data:'fname field is empty'});
      }

      if (!last_name){
        return res.status(400).json({data:'lname field is empty'});
      }

      if (!gender){
        return res.status(400).json({data:'gender field is empty'});
      }

      if (!dob){
        return res.status(400).json({data:'dob field is empty'});
      }

      if (!university){
        return res.status(400).json({data:'university field is empty'});
      }

      if (!level){
        return res.status(400).json({data:'level field is empty'});
      }

      if (!password){
        return res.status(400).json({data:'password field is empty'});
      }

      if (!repeat_password){
        return res.status(400).json({data:'repeat password field is empty'});
      }

      // if ( !(email && password && first_name && last_name && gender && dob && repeat_password) ) {
      //   return res.status(400).json({data:'one of the field is empty'});
      // }

      if (!(password == repeat_password)){
        return res.status(400).json({data:'passwords do not match'});
      }

      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });
  
  
  
        if (oldUser) {
          return res.status(409).json({data:'User already Exits'});
        }
  
        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);
  
        // Create user in our database
        const user = await User.create({
          first_name,
          last_name,
          email,
          gender,
          university,
          level,
          dob,
          pending : [],
          matches : [], 
          password: encryptedPassword,
        });
  
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          TOKEN_KEY,
          {
            expiresIn: "24h",
          }
        );
        // save user token
        user.token = token;

        // persist token to be saved in the database
        await user.save();

        const oldOwner = await BioData.findOne ({ user });

        if(oldOwner == user._id) {
          await BioData.findOneAndDelete ({ user })
        }

        await BioData.create({
          images: [],
          campus: [],
          interest: [],
          description: "",
          user: user._id
        });

        //await bioData.save();
  
        // return new user
        return res.status(201).json(user);
      } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });




app.post("/login", async(req, res) => {
    // Our login logic starts here
    try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        return res.status(400).json({data:"all input is required"});
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email },TOKEN_KEY,
            {
              expiresIn: "24h",
            }
          );
    
          // save user token
          user.token = token;

          // persist token to be saved in the database
          await user.save();
    
          // user
          return res.status(200).json(user);
      }
      return res.status(400).json({data:"Invalid Credentials"});
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });

app.post("/submit-interests", async(req, res) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    const decoded = jwt.verify(token, TOKEN_KEY);

    const user = await User.findById(decoded.user_id);
    console.log(user)

    if(user === null) {
      return res.status(400).json({data:"user not found"});
    }

    if (user.token === token){
      try {
        const { label_1, label_2, label_3, label_4, label_5, label_6, label_7, label_8, label_9, label_10, label_11, label_12 } = req.body;
        let interestArray = [];

        if(label_1 || label_2 || label_3 || label_4 || label_5 || label_6 || label_7 || label_8 || label_9 || label_10 || label_11 || label_12){
          if(label_1 != ""){
            interestArray.push(label_1)
          }

          if(label_2 != ""){
            interestArray.push(label_2)
          }

          if(label_3 != ""){
            interestArray.push(label_3)
          }
          if(label_4 != ""){
            interestArray.push(label_4)
          }
          if(label_5 != ""){
            interestArray.push(label_5)
          }
          if(label_6 != ""){
            interestArray.push(label_6)
          }
          if(label_7 != ""){
            interestArray.push(label_7)
          }
          if(label_8 != ""){
            interestArray.push(label_8)
          }
          if(label_9 != ""){
            interestArray.push(label_9)
          }
          if(label_10 != ""){
            interestArray.push(label_10)
          }
          if(label_11 != ""){
            interestArray.push(label_11)
          }
          if(label_12 != ""){
            interestArray.push(label_12)
          }

          const bioData = await BioData.findOne({ user });

          console.log(bioData);

          bioData.interest = [];

          await bioData.save();

          for(let i = 0; i < interestArray.length; i++){
            console.log(interestArray[i])
            bioData.interest.push(interestArray[i])
          }

          await bioData.save();

          return res.status(200).json(bioData);

        }else {
          return res.status(400).json({data:'Select at least one interest'});
        }

      } catch (err) {
        console.log(err)
        return res.status(400).json(err);
      }
    }
})


app.post("/submit-campus", async(req, res) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  const decoded = jwt.verify(token, TOKEN_KEY);

  const user = await User.findById(decoded.user_id);
  if(user === null) {
    return res.status(400).json({data:"user not found"});
  }
  console.log(user)

  if (user.token === token){
    try {
      const { label_1, label_2, label_3, label_4 } = req.body;
      let campusArray = [];

      if(label_1 || label_2 || label_3 || label_4 ){
        if(label_1 != ""){
          campusArray.push(label_1)
        }

        if(label_2 != ""){
          campusArray.push(label_2)
        }

        if(label_3 != ""){
          campusArray.push(label_3)
        }
        if(label_4 != ""){
          campusArray.push(label_4)
        }

        const bioData = await BioData.findOne({ user });

        console.log(bioData);

        bioData.campus = [];

        await bioData.save();

        for(let i = 0; i < campusArray.length; i++){
          console.log(campusArray[i])
          bioData.campus.push(campusArray[i])
        }

        await bioData.save();

        return res.status(200).json(bioData);

      }else {
        return res.status(400).json({data:'Select at least a gender'});
      }

    } catch (err) {
      console.log(err)
      return res.status(400).json(err);
    }
  }
})

app.post("/submit-level-preference", async(req, res) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  const decoded = jwt.verify(token, TOKEN_KEY);

  const user = await User.findById(decoded.user_id);
  if(user === null) {
    return res.status(400).json({data:"user not found"});
  }
  console.log(user)

  if (user.token === token){
    try {
      const { label_1, label_2, label_3, label_4 } = req.body;
      let levelArray = [];

      if(label_1 || label_2 || label_3 || label_4 ){
        if(label_1 != ""){
          levelArray.push(label_1)
        }

        if(label_2 != ""){
          levelArray.push(label_2)
        }

        if(label_3 != ""){
          levelArray.push(label_3)
        }
        if(label_4 != ""){
          levelArray.push(label_4)
        }

        const bioData = await BioData.findOne({ user });

        console.log(bioData);

        bioData.level_interest = [];

        await bioData.save();

        for(let i = 0; i < levelArray.length; i++){
          console.log(levelArray[i])
          bioData.level_interest.push(levelArray[i])
        }

        await bioData.save();

        return res.status(200).json(bioData);

      }else {
        return res.status(400).json({data:'Select at least a level'});
      }

    } catch (err) {
      console.log(err)
      return res.status(400).json(err);
    }
  }
})


app.post("/submit-gender-preference", async(req, res) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  const decoded = jwt.verify(token, TOKEN_KEY);

  const user = await User.findById(decoded.user_id);
  if(user === null) {
    return res.status(400).json({data:"user not found"});
  }
  console.log(user)

  if (user.token === token){
    try {
      const { label_1, label_2 } = req.body;
      let genderArray = [];

      if(label_1 || label_2 ){
        if(label_1 != ""){
          genderArray.push(label_1)
        }

        if(label_2 != ""){
          genderArray.push(label_2)
        }

        const bioData = await BioData.findOne({ user });

        console.log(bioData);

        bioData.gender_interest = [];

        await bioData.save();

        for(let i = 0; i < genderArray.length; i++){
          console.log(genderArray[i])
          bioData.gender_interest.push(genderArray[i])
        }

        await bioData.save();

        return res.status(200).json(bioData);

      }else {
        return res.status(400).json({data:'Select at least a gender'});
      }

    } catch (err) {
      console.log(err)
      return res.status(400).json(err);
    }
  }
})

app.post("/submit-description", async(req, res) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  const decoded = jwt.verify(token, TOKEN_KEY);

  const user = await User.findById(decoded.user_id);
  if(user === null) {
    return res.status(400).json({data:"user not found"});
  }
  console.log(user)

  if (user.token === token){
    try {
      const { description } = req.body;

      if(!description) {
        return res.status(400).json({data:'You need to tell us something'});
      }

      const bioData = await BioData.findOne({ user });

      console.log(bioData);

      bioData.description = description

      await bioData.save();

      return res.status(200).json(bioData);

    } catch (err) {
      console.log(err)
      return res.status(400).json(err);
    }
  }
})

app.post('/upload-avatar', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({data:'No image file uploaded.'});
  }
  
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  const decoded = jwt.verify(token, TOKEN_KEY);

  const user = await User.findById(decoded.user_id);
  if(user === null) {
    return res.status(400).json({data:"user not found"});
  }

  if(user.token === token) {
    try {
      console.log(image)
      return res.status(200).json({data:'Image uploaded successfully.'});
    } catch (error) {
      console.error(error)
    }
  }
});

app.post('/upload-images', upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 }
]), async (req, res) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  const decoded = jwt.verify(token, TOKEN_KEY);

  const user = await User.findById(decoded.user_id);
  if(user === null) {
    return res.status(400).json({data:"user not found"});
  }

  if (user.token === token){
    try {
      const image1 = req.files.image1[0]
      const image2 = req.files.image2[0]
      const image3 = req.files.image3[0]
      const image4 = req.files.image4[0]

      // Validate user input
      if ( !(image1 && image2 && image3 && image4) ) {
        return res.status(400).json({data:'Four images must be uploaded'});
      }

      let imagesArray = [];
      imagesArray.push(`http://localhost:5002/${image1.path}`.replace(`public\\uploads\\`, ''))
      imagesArray.push(`http://localhost:5002/${image2.path}`.replace(`public\\uploads\\`, ''))
      imagesArray.push(`http://localhost:5002/${image3.path}`.replace(`public\\uploads\\`, ''))
      imagesArray.push(`http://localhost:5002/${image4.path}`.replace(`public\\uploads\\`, ''))
      console.log(imagesArray[0]);


      const bioData = await BioData.findOne({ user });

      console.log(bioData);

      for(let i = 0; i < imagesArray.length; i++){
        bioData.images.push(imagesArray[i])
      }

      await bioData.save();

      return res.status(200).json(bioData);

    } catch (err) {
      return res.status(400).json({data:`${err}`})
    }
  } else {
    return res.status(400).json({data:"Tokens do not match"})
  }
});

app.post("/update-profile", async(req, res) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  const decoded = jwt.verify(token, TOKEN_KEY);

  const user = await User.findById(decoded.user_id);

  if (user.token === token){
    try {
      let { first_name, last_name } = req.body;

      // Validate user input
      if ( !first_name ) {
        first_name = user.first_name;
      }

      if ( !last_name ){
        last_name = user.last_name;
      }

      user.first_name = first_name;
      user.last_name = last_name;

      await user.save();
      return res.status(200).json({data:'Profile Succesfully Updated'});

    } catch (err) {
        console.log(err)
        return res.status(400).json({data:`${err}`})
    }
  } else {
    return res.status(400).json({data:`invalid token`});
  }
})

app.post("/update-description", async(req, res) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  const decoded = jwt.verify(token, TOKEN_KEY);

  const user = await User.findById(decoded.user_id);

  if (user.token === token){
    try {
      let { description } = req.body;

      const bioData = await BioData.findOne({ user });

      // Validate user input
      if ( !description ) {
        description = bioData.description;
      }


      bioData.description = description;

      await bioData.save();
      return res.status(200).json({data:'Profile Succesfully Updated'});

    } catch (err) {
        console.log(err)
        return res.status(400).json({data:`${err}`})
    }
  } else {
    return res.status(400).json({data:`invalid token`});
  }
})

app.post("/change-password", async(req, res) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  const decoded = jwt.verify(token, TOKEN_KEY);

  const user = await User.findById(decoded.user_id);

  if(user.token === token) {
    try {
      let {current_password, new_password, repeat_password } = req.body;

            // Validate user input
            if (!current_password) {
              return res.status(400).json({data:"please enter your current password"});
            }

            if (!new_password) {
              return res.status(400).json({data:"you must enter a new password"});
            }

            
            if (!repeat_password) {
              return res.status(400).json({data:"kindly repeat password"});
            }
        
            if (await bcrypt.compare(current_password, user.password)) {

              if(new_password === repeat_password) {

                if (await bcrypt.compare(new_password, user.password)){
                  return res.status(400).json({data:"You cannot change you password to your old password"});
                }

                encryptedPassword = await bcrypt.hash(new_password, 10);

                user.password = encryptedPassword;

                await user.save();
        
                // user
                return res.status(200).json({data:"password succesfully changed"});
              }

              return res.status(400).json({data:"passwords do not match"});
            }
            return res.status(400).json({data:"Password is incorrect"});
    } catch (error) {
      return res.status(400).json({data:`${error} An error occurred`});
    }
  }
})

app.post("/add-to-chat-list", async(req,res) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  const decoded = jwt.verify(token, TOKEN_KEY);

  const user = await User.findById(decoded.user_id);

  if(user.token == token){
    try {
      let { user_id } = req.body;

      const currUser = await ChatList.findOne({owner: { $eq: user }});

      if (currUser) {
        let findUser = await ChatList.findOne({owner: { $eq: user} ,friend_list: { $in: user_id}});
        if(findUser){
          return res.status(200).json({data:'user already in friend list'});
        } else {
          currUser.friend_list.push(user_id);

          await currUser.save()

          return res.status(200).json({data:'user added to your list'});
        }
      } else {
        let newChatList = await ChatList.create({
          friend_list: [],
          owner: user
        })

        return res.status(200).json({newChatList});
      }
    } catch(err){
      console.log(err);
      return res.status(400).json({data:`${err} An error occurred`});
    }
  }
})

app.post("/send-msg", async(req,res) => {
  try{
    const { messages, reciepient, owner} = req.body;

    const msg = await Message.create ({
      messages,
      reciepient,
      owner
    })

    return res.status(201).json(msg)
  } catch (err) {
    console.log(err);
  }
});

app.post("/send-peerId", async(req,res) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  const decoded = jwt.verify(token, TOKEN_KEY);

  const user = await User.findById(decoded.user_id);

  if (user.token === token){
    try {
      const { chat_id } = req.body;

      // Validate user input
      if ( !(chat_id) ) {
        return res.status(400).json({data:'invalid peer id'});
      }

      

      const usr = chat_id;

      user.chat_id = usr;

      // persist token to be saved in the database
      await user.save();

      return res.status(201).json({data:'success'});

    } catch (err) {
        console.log(err)
    }
  }
});

app.get("/get-email", async(req,res) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  const decoded = jwt.verify(token, TOKEN_KEY);


  const user = await User.findById(decoded.user_id);

  if (user.token === token) {
      try{
          const email = user.email;
          console.log(email)

          return res.status(200).json({"email":email});
      }catch(err){
          console.log(err)
      }
  }
})

app.get("/get-name", async(req,res) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  const decoded = jwt.verify(token, TOKEN_KEY);


  const user = await User.findById(decoded.user_id);

  if (user.token === token) {
      try{
          const fname = user.first_name;
          const lname = user.last_name;

          return res.status(200).json({"fname":fname,"lname":lname});
      }catch(err){
          console.log(err)
      }
  }
})

app.get("/get-uni", async(req,res) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  const decoded = jwt.verify(token, TOKEN_KEY);


  const user = await User.findById(decoded.user_id);

  if (user.token === token) {
      try{
          const university = user.university;

          return res.status(200).json({"university":university});
      }catch(err){
          console.log(err)
      }
  }
})

app.get("/get-level", async(req,res) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  const decoded = jwt.verify(token, TOKEN_KEY);


  const user = await User.findById(decoded.user_id);

  if (user.token === token) {
      try{
          const level = user.level;

          return res.status(200).json({"level":level});
      }catch(err){
          console.log(err)
      }
  }
})

app.get("/get-dob", async(req,res) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  const decoded = jwt.verify(token, TOKEN_KEY);


  const user = await User.findById(decoded.user_id);

  if (user.token === token) {
      try{
          const dob = user.dob;

          return res.status(200).json({"dob":dob});
      }catch(err){
          console.log(err)
      }
  }
})

app.get("/get-gender", async(req,res) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  const decoded = jwt.verify(token, TOKEN_KEY);


  const user = await User.findById(decoded.user_id);

  if (user.token === token) {
      try{
          const gender = user.gender;

          return res.status(200).json({"gender":gender});
      }catch(err){
          console.log(err)
      }
  }
});

app.get("/get-description", async(req,res) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  const decoded = jwt.verify(token, TOKEN_KEY);


  const user = await User.findById(decoded.user_id);

  if (user.token === token) {
      try{
        const bioData = await BioData.findOne({ user });
        const description = bioData.description;

          return res.status(200).json({"description":description});
      }catch(err){
          console.log(err)
      }
  }
});

app.get("/get-user-interests", async(req, res) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  const decoded = jwt.verify(token, TOKEN_KEY);

  const user = await User.findById(decoded.user_id);

  if (user.token === token) {
      try{
          const bioData = await BioData.findOne({ user })

          return res.status(200).json(bioData);
      }catch(err){
          console.log(err)
          return res.status(400).json(err);

      }
  }
})

app.get("/get-id", async(req,res) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  const decoded = jwt.verify(token, TOKEN_KEY);


  const user = await User.findById(decoded.user_id);

  if (user.token === token) {
      try{
          const id = user._id;

          return res.status(200).json({"id":id});
      }catch(err){
          console.log(err)
      }
  } else {
    return res.status(400).json({data:'invalid token'});
  }
})

app.get("/get-profile-pic", async(req,res) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  const decoded = jwt.verify(token, TOKEN_KEY);


  const user = await User.findById(decoded.user_id);

  if (user.token === token) {
      try{
          const pic = user.profile_pic;
          return res.status(200).json({"image":pic});
      }catch(err){
          console.log(err)
      }
  } else {
    return res.status(400).json({data:'invalid token'});
  }
})

app.get("/user-list", async(req, res) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  const decoded = jwt.verify(token, TOKEN_KEY);


  const user = await User.findById(decoded.user_id);
  const userBioData = await BioData.findOne({ user });

  console.log(userBioData);

  if (user.token === token) {
    User.find({ _id: { $ne: user.id }, university: { $in: userBioData.campus }, level: { $in: userBioData.level_interest }, gender: { $in: userBioData.gender_interest } }, (err, users) => {
      if (err) {
        console.error(err);
      } else {
        console.log(users);
        return res.status(200).json(users);
      }
    })
  } else { 
    return res.status(400).json({data:'invalid token'});
  }

})

app.post("/user-bio-list", async(req, res) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  const decoded = jwt.verify(token, TOKEN_KEY);

  let {user_identity} = req.body


  const user = await User.findById(decoded.user_id);
  const userBioData = await BioData.findOne({user: { $eq: user_identity }});
  console.log(userBioData);

  if (user.token === token) {
    return res.status(200).json(userBioData);
  } else { 
    return res.status(400).json({data:'invalid token'});
  }

})

// app.get("/get-chats", async(req,res) => {
//   const token = req.body.token || req.query.token || req.headers["x-access-token"];
//   const decoded = jwt.verify(token, TOKEN_KEY);


//   const user = await User.findById(decoded.user_id);

//   if (user.token === token) {
//     const msg = await Message.findById();
//     if(user._id === msg.owner){
//       try {
//         const message = msg.messages
//         const reciepient = msg.reciepient
//         return res.status(200).json({"message":message, "reciepient":reciepient})
//       } catch (error) {
//         console.log(err);
//       }
//     }
//   }
// })


app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

module.exports = app;