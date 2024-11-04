const {Product, Offer, Cart} = require('../models/product');

class ProductRepository{

    static async showProducts(){
        try {
           const products =  await Product.find({});
           return products;
            
    } catch (error) {
        return error;
    }
        }

        static async showCart(){
            try {
               const cart =  await Cart.find({})
               .populate("productId");
               const cartWithDiscounts = cart.map(item => {

                if (item.productId.productID == 'PF1'){
                    
                    const isOfferActive = true;
                

                return {
                  ...item,
                  isOfferActive
                };
            }
            else{
                return {
                    ...item
                  };
            }
              });
            
            console.log(cartWithDiscounts);
             let amount = 0;
              const totalPrice = cartWithDiscounts.map(item => {
                amount = amount + item._doc.productId.price;
              });


               console.log(cart);
               console.log(cartWithDiscounts);
               const data ={cartWithDiscounts, amount};
               return data;
                
        } catch (error) {
            return error;
        }
            }

            static async addToCart(id){
                try {         
                    const product =  await Cart.findOne({productId: id});
                    console.log(product);
                    if (product){
                       console.log(product.quantity);
                        product.quantity = product.quantity+1;
                        await product.save();
                    }
                    else{
                        const cartData = {productId: id};
                        const newItemToCart = new Cart(cartData);
                        console.log(newItemToCart);                
                        await newItemToCart.save();
                    }
                    
            } catch (error) {
                return error;
            }
                }


                static async removeFromCart (id) {
                    return await Cart.findByIdAndDelete(id);
                  };


    static async seedProducts(){
        // const productData = {productID: 'PF1', productName: 'Cool Water' , price: 40 };
        // const productData = {productID: 'PF2', productName: 'Lataffa' , price: 80 };
        // const productData = {productID: 'PF3', productName: 'CK' , price: 50 };
        // const productData = {productID: 'PF4', productName: 'Armani Code' , price: 120 };
        // const productData = {productID: 'PF5', productName: 'Gucci Bloom' , price: 100 };
        // const productData = {productID: 'PF6', productName: 'Chanel No.5' , price: 150 };
        try {
        const newProduct = new Product(productData);
        console.log(newProduct);
            return await newProduct.save();
            
    } catch (error) {
        return error;
    }
        }


        static async seedOffers(){
            // const offer = {offer: 'Buy One Get One Free', products:['672864ae0ec9bba4459016d9',]};
            try {
            const newOffer = new Offer(offer);
            console.log(newOffer);
                return await newOffer.save();
                
        } catch (error) {
            return error;
        }
            }




}

module.exports = ProductRepository;


// // Sample cart array (fetched from your backend or context)
// const cart = [
//     { productId: 'p1', name: 'Product 1', price: 100 },
//     { productId: 'p2', name: 'Product 2', price: 200 },
//     { productId: 'p3', name: 'Product 3', price: 300 },
//   ];
  
//   // Sample offers array (fetched from your backend)
//   const offers = [
//     { productId: 'p1', discount: 10 }, // 10% discount on Product 1
//     { productId: 'p3', discount: 20 }, // 20% discount on Product 3
//   ];
  
//   // Iterate through each cart item and apply discount if offer exists
//   const cartWithDiscounts = cart.map(item => {
//     // Find if there's an offer for this product
//     const offer = offers.find(offer => offer.productId === item.productId);
  
//     // Calculate discounted price if offer exists
//     const discountedPrice = offer
//       ? item.price * (1 - offer.discount / 100)
//       : item.price;
  
//     return {
//       ...item,
//       discountedPrice, // Add discounted price to item
//     };
//   });
  
//   console.log(cartWithDiscounts);