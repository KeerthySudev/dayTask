const ProductRepository = require('../repositories/productRepository');

class ProductController{
    static async seedProducts(){  
        return await ProductRepository.seedProducts();
    }

    static async seedOffers(){  
        return await ProductRepository.seedOffers();
    }

    static async showProducts(req, res){  
        try {
            const products =  await ProductRepository.showProducts();
        
            res.json(products);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    }

    static async showCart(req, res){  
        try {
            const cart =  await ProductRepository.showCart()          
            res.json(cart);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    }

    static async addToCart(req, res)  {
        try {
          const  {id} = req.body;
          const response =  await ProductRepository.addToCart(id);
          res.json(response);
      
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Error adding to cart" });
        }
      };

      static async removeFromCart(req, res)  {
        try {
          const  {id} = req.body;
          const response =  await ProductRepository.removeFromCart(id);
          res.json(response);
      
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Error removing from cart" });
        }
      };
}



module.exports = ProductController;

