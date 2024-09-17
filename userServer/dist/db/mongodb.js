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
exports.connectToMongoDB = connectToMongoDB;
exports.findUserById = findUserById;
const mongodb_1 = require("mongodb");
const uri = 'mongodb://localhost:27017'; // MongoDB connection string
const client = new mongodb_1.MongoClient(uri);
let db;
function connectToMongoDB() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!db) {
            yield client.connect();
            db = client.db('grpcDatabase'); //  database name
        }
        return db;
    });
}
function findUserById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield connectToMongoDB();
        const user = yield db.collection('users').findOne({ userId });
        return !!user; // Return true if user exists, false otherwise
    });
}
