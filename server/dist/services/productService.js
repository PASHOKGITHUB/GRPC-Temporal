"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = getProduct;
exports.placeOrder = placeOrder;
// src/services/productService.ts
const mongodb_1 = require("../db/mongodb");
function getProduct(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = (0, mongodb_1.getDatabase)();
        //console.log("ProductId received on server:", productId);
        const product = yield db.collection('products').findOne({ productId });
        console.log("ProductId received:", productId);
        // Ensure the product returned from MongoDB is of type Product
        if (product) {
            const formattedProduct = {
                productId: product.productId,
                productName: product.productName,
                quantity: product.quantity,
                price: product.price,
            };
            return formattedProduct;
        }
        return null;
    });
}
function placeOrder(productId, orderQuantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = (0, mongodb_1.getDatabase)();
        console.log("ProductId received on server:", productId);
        const product = yield db.collection('products').findOne({ productId });
        if (!product) {
            return { success: false, message: 'Product not found' };
        }
        if (product.quantity < orderQuantity) {
            return { success: false, message: 'Insufficient quantity' };
        }
        yield db.collection('products').updateOne({ productId }, { $inc: { quantity: -orderQuantity } });
        return { success: true, message: 'Order placed successfully' };
    });
}
