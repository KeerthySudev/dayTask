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

         static async seedUser() {
            // const userData = {name: 'Keerthy', email:'user@gmail.com', password:'12345678'};
            try {
              const newUser = new User(userData);
              return await newUser.save();
            } catch (error) {
              return error;
            }
          }
        


}

module.exports = UserRepository;