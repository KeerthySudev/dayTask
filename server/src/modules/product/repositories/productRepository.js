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


