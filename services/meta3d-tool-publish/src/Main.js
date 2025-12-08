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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishMod = void 0;
const fs_1 = __importDefault(require("fs"));
const meta3d_1 = require("meta3d");
const CloudbaseService = __importStar(require("meta3d-tool-utils/src/publish/CloudbaseService"));
// import * as _4everlandService from "meta3d-tool-utils/src/publish/4everlandService";
const PublishUtils_1 = require("meta3d-tool-utils/src/publish/PublishUtils");
const Publish_1 = require("./Publish");
// // let _getFuncArrForExtension = (env: env, packageFilePath: string): [any, any, any, any, any, any, any, any, any, any, any] => {
// // 	switch (env) {
// // 		case "local":
// // 			return [
// // 				fs.readFileSync,
// // 				console.log,
// // 				console.error,
// // 				buildReadJsonFunc(packageFilePath),
// // 				CloudbaseService.init,
// // 				CloudbaseService.hasAccount,
// // 				CloudbaseService.getMarketProtocolCollection,
// // 				CloudbaseService.isContain,
// // 				CloudbaseService.addDataToMarketProtocolCollection,
// // 				CloudbaseService.addMarketProtocolDataToDataFromMarketProtocolCollectionData,
// // 				CloudbaseService.getDataFromMarketProtocolCollection
// // 			]
// // 		case "production":
// // 			return [
// // 				fs.readFileSync,
// // 				console.log,
// // 				console.error,
// // 				buildReadJsonFunc(packageFilePath),
// // 				_4everlandService.init, _4everlandService.hasAccount, _4everlandService.getMarketProtocolCollection, _4everlandService.isContain, _4everlandService.addDataToMarketProtocolCollection,
// // 				_4everlandService.addMarketProtocolDataToDataFromMarketProtocolCollectionData,
// // 				_4everlandService.getDataFromMarketProtocolCollection
// // 			]
// // 		default:
// // 			throw new Error("unknown env")
// // 	}
// // }
// export let publishExtension = (env: env, packageFilePath: string, distFilePath: string) => {
// 	let funcArr = null
// 	switch (env) {
// 		case "local":
// 			funcArr = [
// 				fs.readFileSync,
// 				console.log,
// 				console.error,
// 				buildReadJsonFunc(packageFilePath),
// 				generateExtension,
// 				CloudbaseService.initLocal,
// 				CloudbaseService.hasAccount,
// 				CloudbaseService.uploadFile,
// 				CloudbaseService.getMarketImplementAccountData,
// 				CloudbaseService.addMarketImplementData,
// 				// CloudbaseService.getDataFromMarketImplementAccountData,
// 				// CloudbaseService.isContain,
// 				// CloudbaseService.buildMarketImplementAccountData,
// 				// CloudbaseService.addMarketImplementDataToDataFromMarketImplementCollectionData,
// 				CloudbaseService.getFileID,
// 				CloudbaseService.parseMarketCollectionDataBodyForNodejs,
// 			]
// 			break;
// 		case "production":
// 			funcArr = [
// 				fs.readFileSync,
// 				console.log,
// 				console.error,
// 				buildReadJsonFunc(packageFilePath),
// 				generateExtension,
// 				CloudbaseService.initProduction,
// 				CloudbaseService.hasAccount,
// 				CloudbaseService.uploadFile,
// 				CloudbaseService.getMarketImplementAccountData,
// 				CloudbaseService.addMarketImplementData,
// 				// CloudbaseService.getDataFromMarketImplementAccountData,
// 				// CloudbaseService.isContain,
// 				// CloudbaseService.buildMarketImplementAccountData,
// 				// CloudbaseService.addMarketImplementDataToDataFromMarketImplementCollectionData,
// 				CloudbaseService.getFileID,
// 				CloudbaseService.parseMarketCollectionDataBodyForNodejs,
// 			]
// 			break;
// 		default:
// 			throw new Error("unknown env")
// 	}
// 	return publish(funcArr, packageFilePath, distFilePath, "extension")
// }
// export let publishContribute = (env: env, packageFilePath: string, distFilePath: string) => {
// 	let funcArr = null
// 	switch (env) {
// 		case "local":
// 			funcArr = [
// 				fs.readFileSync,
// 				console.log,
// 				console.error,
// 				buildReadJsonFunc(packageFilePath),
// 				generateContribute,
// 				CloudbaseService.initLocal,
// 				CloudbaseService.hasAccount,
// 				CloudbaseService.uploadFile,
// 				CloudbaseService.getMarketImplementAccountData,
// 				CloudbaseService.addMarketImplementData,
// 				CloudbaseService.getFileID,
// 				CloudbaseService.parseMarketCollectionDataBodyForNodejs,
// 			]
// 			break;
// 		case "production":
// 			funcArr = [
// 				fs.readFileSync,
// 				console.log,
// 				console.error,
// 				buildReadJsonFunc(packageFilePath),
// 				generateContribute,
// 				CloudbaseService.initProduction,
// 				CloudbaseService.hasAccount,
// 				CloudbaseService.uploadFile,
// 				CloudbaseService.getMarketImplementAccountData,
// 				CloudbaseService.addMarketImplementData,
// 				CloudbaseService.getFileID,
// 				CloudbaseService.parseMarketCollectionDataBodyForNodejs,
// 			]
// 			break;
// 		default:
// 			throw new Error("unknown env")
// 	}
// 	return publish(funcArr, packageFilePath, distFilePath, "contribute")
// }
// export let publishBundledContribute = (env: env, packageFilePath: string, bundledSource: string) => {
// 	let funcArr = null
// 	switch (env) {
// 		case "local":
// 			funcArr = [
// 				console.log,
// 				console.error,
// 				buildReadJsonFunc(packageFilePath),
// 				generateContribute,
// 				CloudbaseService.initLocal,
// 				CloudbaseService.hasAccount,
// 				CloudbaseService.uploadFile,
// 				CloudbaseService.getMarketImplementAccountData,
// 				CloudbaseService.addMarketImplementData,
// 				CloudbaseService.getFileID,
// 				CloudbaseService.parseMarketCollectionDataBodyForNodejs,
// 			]
// 			break;
// 		case "production":
// 			funcArr = [
// 				console.log,
// 				console.error,
// 				buildReadJsonFunc(packageFilePath),
// 				generateContribute,
// 				CloudbaseService.initProduction,
// 				CloudbaseService.hasAccount,
// 				CloudbaseService.uploadFile,
// 				CloudbaseService.getMarketImplementAccountData,
// 				CloudbaseService.addMarketImplementData,
// 				CloudbaseService.getFileID,
// 				CloudbaseService.parseMarketCollectionDataBodyForNodejs,
// 			]
// 			break;
// 		default:
// 			throw new Error("unknown env")
// 	}
// 	// return publishBundled(funcArr, packageFilePath, bundledSource)
// 	return publish(
// 		([
// 			bundledSource => bundledSource
// 		] as any).concat(funcArr), packageFilePath, bundledSource, "contribute")
// }
// // publishExtension(path.join(__dirname, "../mine/test_data/", "package.json"), path.join(__dirname, "../mine/test_data/", "main.js"))
// // publishExtension(path.join(__dirname, "../mine/t/", "package.json"), path.join(__dirname, "../mine/t/", "main.js"))
let publishMod = (env, packageFilePath, distFilePath, assetFileDir) => {
    let funcArr = null;
    switch (env) {
        case "local":
            funcArr = [
                fs_1.default.readFileSync,
                console.log,
                console.error,
                (0, PublishUtils_1.buildReadJsonFunc)(packageFilePath),
                // generateExtension,
                meta3d_1.generateMod,
                CloudbaseService.initLocal,
                // CloudbaseService.hasAccount,
                CloudbaseService.uploadFile,
                // CloudbaseService.getMarketImplementAccountData,
                // CloudbaseService.addMarketImplementData,
                CloudbaseService.getData,
                CloudbaseService.setData,
                CloudbaseService.getFileID,
                // CloudbaseService.parseMarketCollectionDataBodyForNodejs,
            ];
            break;
        // case "production":
        // 	funcArr = [
        // 		fs.readFileSync,
        // 		console.log,
        // 		console.error,
        // 		buildReadJsonFunc(packageFilePath),
        // 		generateExtension,
        // 		CloudbaseService.initProduction,
        // 		CloudbaseService.hasAccount,
        // 		CloudbaseService.uploadFile,
        // 		CloudbaseService.getMarketImplementAccountData,
        // 		CloudbaseService.addMarketImplementData,
        // 		// CloudbaseService.getDataFromMarketImplementAccountData,
        // 		// CloudbaseService.isContain,
        // 		// CloudbaseService.buildMarketImplementAccountData,
        // 		// CloudbaseService.addMarketImplementDataToDataFromMarketImplementCollectionData,
        // 		CloudbaseService.getFileID,
        // 		CloudbaseService.parseMarketCollectionDataBodyForNodejs,
        // 	]
        // break;
        default:
            throw new Error("unknown env");
    }
    return (0, Publish_1.publish)(funcArr, packageFilePath, distFilePath, assetFileDir);
};
exports.publishMod = publishMod;
//# sourceMappingURL=Main.js.map