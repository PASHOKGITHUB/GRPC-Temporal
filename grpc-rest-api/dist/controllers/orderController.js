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
exports.placeOrderController = placeOrderController;
const grpcClient_1 = require("../grpc/grpcClient");
function placeOrderController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, productId, quantity } = req.body;
        try {
            const result = yield (0, grpcClient_1.placeOrder)(userId, productId, quantity);
            res.status(200).json({ message: result });
        }
        catch (error) {
            res.status(500).json({ error: 'Error placing order' });
        }
    });
}
