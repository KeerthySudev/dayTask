const UserRepository = require('../repositories/userRepository');

class UserController{

    static async addToCart(req, res)  {
        try {
          const  {userData} = req.body;
          const response =  await UserRepository.addUser(userData);
          res.json(response);
      
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Error adding user" });
        }
      };

      static async seedUser(){  
        return await UserRepository.seedUser();
    }
}

module.exports = UserController;

