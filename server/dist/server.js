"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grpc = __importStar(require("@grpc/grpc-js"));
const protoLoader = __importStar(require("@grpc/proto-loader"));
const productService_1 = require("./services/productService");
const mongodb_1 = require("./db/mongodb");
const path_1 = __importDefault(require("path"));
const PROTO_PATH = path_1.default.join(__dirname, '../proto/orders.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition).product;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, mongodb_1.connectToDatabase)(); // Connect to MongoDB
        const server = new grpc.Server();
        // Define gRPC service methods
        server.addService(proto.ProductService.service, {
            GetProduct: (call, callback) => __awaiter(this, void 0, void 0, function* () {
                const productId = call.request.productId;
                const product = yield (0, productService_1.getProduct)(productId);
                if (product) {
                    callback(null, {
                        productId: product.productId,
                        productName: product.productName,
                        quantity: product.quantity,
                        price: product.price,
                    });
                }
                else {
                    callback({
                        code: grpc.status.NOT_FOUND,
                        details: 'Product not found',
                    });
                }
            }),
            PlaceOrder: (call, callback) => __awaiter(this, void 0, void 0, function* () {
                const { productId, orderQuantity } = call.request;
                const result = yield (0, productService_1.placeOrder)(productId, orderQuantity);
                callback(null, { success: result.success, message: result.message });
            }),
        });
        // Start the gRPC server without calling server.start()
        server.bindAsync('127.0.0.1:50052', grpc.ServerCredentials.createInsecure(), (err, port) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`Server running at http://127.0.0.1:${port}`);
        });
    });
}
main().catch(console.error);
