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
exports.connectToDatabase = connectToDatabase;
exports.getDatabase = getDatabase;
// src/db/mongodb.ts
const mongodb_1 = require("mongodb");
let db;
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new mongodb_1.MongoClient('mongodb://localhost:27017');
        yield client.connect();
        db = client.db('grpcDatabase'); // Database name
    });
}
function getDatabase() {
    if (!db) {
        throw new Error('Database connection not established');
    }
    return db;
}
