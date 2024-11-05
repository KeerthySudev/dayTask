const { Product, Offer, Cart } = require("../models/product");
const User = require("../../user/models/user");

const today = new Date();
today.setDate(today.getDate());
let firstDay = new Date();
firstDay.setDate(firstDay.getDate() - 10);
let lastDay = new Date();
lastDay.setDate(lastDay.getDate() + 10);
let anniversary = new Date();
anniversary.setDate(anniversary.getDate() - 367);

class ProductRepository {
  static async showProducts() {
    try {
      const products = await Product.find({});
      return products;
    } catch (error) {
      return error;
    }
  }

  static async showCart(userId) {
    try {
      const user = await User.findById(userId);
      console.log(user);
      const cart = await Cart.find({ userId })
        .populate("productId")
        .populate("userId");

      const cartWithDiscounts = cart.map((item) => {
        // Buy one get one free offer

        if (item.productId.productID == "PF1") {
          const isBuyOneGetOne = true;

          return {
            ...item,
            isBuyOneGetOne,
          };
        }

        // Bulk purchase discount

        if (item.productId.productID == "PF2" && item.quantity >= 3) {
          const discount = 5;
            let discountPrice = item.productId.price - discount;
          const isBulkPurchase = true;

          const returning = {
            ...item,
            isBulkPurchase,
            discountPrice,
          };
          return returning;
        }

        // Combo discount

        if (item.productId.productID == "PF3") {
          let PF1 = false;
          const checking = cart.map((newItem) => {
            if (newItem.productId.productID == "PF1") {
              PF1 = true;
            }
          });

          if (PF1) {
            const discount = 10;
            const discountPrice = item.productId.price - discount;
            const isCombo = true;

            const returning = {
              ...item,
              isCombo,
              discountPrice,
            };

            return returning;
          }
        }

        // Tiered Discount

        if (item.productId.productID == "PF5" && item.quantity >= 2) {
          if (item.quantity >= 4) {
            const discount = item.productId.price * 0.2;
            const discountPrice = item.productId.price - discount;
            const isDoubleTiered = true;

            return {
              ...item,
              isDoubleTiered,
              discountPrice,
            };
          } else {
            const discount = item.productId.price * 0.1;
            const discountPrice = item.productId.price - discount;
            const isTiered = true;

            return {
              ...item,
              isTiered,
              discountPrice,
            };
          }
        }

        // Seasonal discount

        if (item.productId.productID == "PF6") {
          let PF4 = false;
          const checking = cart.map((newItem) => {
            if (newItem.productId.productID == "PF4") {
              PF4 = true;
            }
          });

          if (PF4) {
            const discount = item.productId.price * 0.25;
            const discountPrice = item.productId.price - discount;
            const isSeasonalDiscount = true;

            return {
              ...item,
              discountPrice,
              isSeasonalDiscount,
            };
          }
        }

        // Limited time discount

        if (
          item.productId.productID == "PF4" &&
          today < lastDay &&
          today > firstDay
        ) {
          const discount = item.productId.price * 0.15;
          const discountPrice = item.productId.price - discount;
          const isLimitedTime = true;

          return {
            ...item,
            isLimitedTime,
            discountPrice,
          };
        } else {
          return {
            ...item,
          };
        }
      });




      // Total Amount

      let amount = 0;
      const totalPrice = cartWithDiscounts.map((item) => {
        const discountPrice = item.discountPrice;
        if (discountPrice) {
          amount = amount + discountPrice * item._doc.quantity;
        } else {
          amount = amount + item._doc.productId.price * item._doc.quantity;
        }
      });

      // Exclusive tier

      let isExclusive = false;
      if (user.isExclusive) {
        isExclusive = true;
      }

      // Cart wise discounts

      let cartDiscountPrice = amount;
      let offer = "";
      let items = [];
      cart.map((item) => {
        if (item.productId.productID in items) {
          console.log(items);
        } else {
          items.push(item.productId.productID);
        }
        let itemCount = 0;
        items.map((i) => {
          itemCount += 1;
        });

        //   Anniversary discount

        if (user.createdAt > anniversary) {
          const cartDiscount = amount * 0.2;
          cartDiscountPrice = amount - cartDiscount;
          offer = "Anniversary";
        }

        // Buy More, Save More
        else if (itemCount >= 6) {
          const cartDiscount = (amount * 15) / 100;
          cartDiscountPrice = amount - cartDiscount;
          offer = "All6Perfumes";
        } else if (itemCount >= 5) {
          const cartDiscount = (amount * 10) / 100;
          cartDiscountPrice = amount - cartDiscount;
          offer = "5DiffPerfumes";
        }

        // Cart Wide discount
        else if (amount > 500) {
          const cartDiscount = amount * 0.05;
          cartDiscountPrice = amount - cartDiscount;
          offer = "Above500";
        } else {
          cartDiscountPrice = amount;
        }
      });

      const data = {
        cartWithDiscounts,
        amount,
        cartDiscountPrice,
        offer,
        isExclusive,
      };
      console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  }

  static async addToCart(id, userId) {
    try {
      const product = await Cart.findOne({ productId: id });
      console.log(product);
      if (product) {
        console.log(product.quantity);
        product.quantity = product.quantity + 1;
        await product.save();
      } else {
        const cartData = { productId: id, userId: userId };
        const newItemToCart = new Cart(cartData);
        console.log(newItemToCart);
        await newItemToCart.save();
      }
    } catch (error) {
      return error;
    }
  }

  static async removeFromCart(id) {
    return await Cart.findByIdAndDelete(id);
  }

  static async seedProducts() {
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

  static async seedOffers() {
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
