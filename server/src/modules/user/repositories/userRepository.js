const User = require('../models/user');

class UserRepository{

    static async addUser(userData){
        try {       
              const newUser = new User(userData);              
              await newUser.save();
    } catch (error) {
        return error;
    }
         }


}

module.exports = UserRepository;