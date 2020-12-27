const fs = require('fs');
const path = require('path');
const usersFilePath = path.resolve(__dirname, '../data/users.json');
const multer = require('multer');


const helper = { 

  getAllUsers(){
      const jsonUsers = fs.readFileSync(usersFilePath, 'utf-8');
      const usersParsed = JSON.parse(jsonUsers);
      return usersParsed;
    },

  writeUsers(arrayToTransform){
      const usersJson = JSON.stringify(arrayToTransform, null, " ");
      fs.writeFileSync(usersFilePath, usersJson);
  },
  
  generateNewIdUsers(){
      const users = helper.getAllUsers();
      return users.pop().id + 1;
  }, 
  
  uploadUser(){
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, __dirname + '/../../public/images')
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() + '-' + path.extname(file.originalname))
        }
      })
        
      return multer({ storage: storage })
    },
    getAUser(email){
      const users = helper.getAllUsers();
      const user =  users.filter(function(user){
          return user.email == email
          
      });      
      return user[0]
    }

  }

module.exports = helper;


