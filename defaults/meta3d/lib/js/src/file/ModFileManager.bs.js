'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Js_array = require("rescript/lib/js/js_array.js");
var Js_string = require("rescript/lib/js/js_string.js");
var Caml_array = require("rescript/lib/js/caml_array.js");
var Js_promise = require("rescript/lib/js/js_promise.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var LibUtils$Meta3d = require("./LibUtils.bs.js");
var FileUtils$Meta3d = require("../FileUtils.bs.js");
var TextDecoder$Meta3d = require("./TextDecoder.bs.js");
var TextEncoder$Meta3d = require("./TextEncoder.bs.js");
var Log$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/log/Log.bs.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");
var BinaryFileOperator$Meta3d = require("./BinaryFileOperator.bs.js");
var Exception$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/Exception.bs.js");

function generateMod(fileStr, assetFileJson, assetFiles) {
  var encoder = new TextEncoder();
  return BinaryFileOperator$Meta3d.generate(Js_array.concat(assetFiles, [
                  TextEncoder$Meta3d.encodeUint8Array(fileStr, encoder),
                  TextEncoder$Meta3d.encodeUint8Array(JSON.stringify(assetFileJson), encoder)
                ]));
}

function loadMod(modBinaryFile) {
  var dataArr = BinaryFileOperator$Meta3d.load(modBinaryFile);
  return [
          Caml_array.get(dataArr, 0),
          Caml_array.get(dataArr, 1),
          ArraySt$Meta3dCommonlib.sliceFrom(dataArr, 2)
        ];
}

var _convertUint8ArrayToBase64 = (function uint8ArrayToBase64(uint8Array) {







    const blob = new Blob([uint8Array]);







    return new Promise((resolve, reject) => {







        const reader = new FileReader();







        reader.onloadend = function() {







            resolve(reader.result);







        };







        reader.onerror = reject;







        reader.readAsDataURL(blob);







    });







});

var _convertUint8ArrayToAudioBlob = (function uint8ArrayToAudioBlob(uint8Array) {
    return Promise.resolve( new Blob([uint8Array]))
});

var _convertUint8ArrayToArrayBuffer = (function uint8ArrayToArrayBuffer(uint8Array) {







    return Promise.resolve( uint8Array.buffer)







});

function _getResourceId(assetPath) {
  var splitor = Js_string.includes("\\", assetPath) ? "\\" : (
      Js_string.includes("/", assetPath) ? "/" : Exception$Meta3dCommonlib.throwErr(Exception$Meta3dCommonlib.buildErr(Log$Meta3dCommonlib.buildErrorMessage("unknow", "", "", "", "")))
    );
  var assetName = OptionSt$Meta3dCommonlib.getExn(Caml_option.undefined_to_opt(Js_string.split(splitor, assetPath).pop()));
  return ArraySt$Meta3dCommonlib.unsafeGetFirst(Js_string.split(".", assetName));
}

function _parseAssets(param, stateData, start, end, assetPaths, assetFilesData) {
  var convertFunc = param[1];
  var setFunc = param[0];
  var imageFilesData = ArraySt$Meta3dCommonlib.slice(assetFilesData, start, end);
  return ArraySt$Meta3dCommonlib.traverseReducePromiseIM(imageFilesData, (function (stateData, fileData, index) {
                var __x = Curry._1(convertFunc, fileData);
                return Js_promise.then_((function (data) {
                              return Promise.resolve(Curry._3(setFunc, stateData, _getResourceId(Caml_array.get(assetPaths, index)), data));
                            }), __x);
              }), stateData);
}

function _parseImages(setImageBase64ResourceFunc, stateData, assetFileJson, assetFilesData) {
  return _parseAssets([
              setImageBase64ResourceFunc,
              _convertUint8ArrayToBase64
            ], stateData, 0, ArraySt$Meta3dCommonlib.length(assetFileJson.imagePaths), assetFileJson.imagePaths, assetFilesData);
}

function _parseAudios(setAudioBlobResourceFunc, stateData, assetFileJson, assetFilesData) {
  return _parseAssets([
              setAudioBlobResourceFunc,
              _convertUint8ArrayToAudioBlob
            ], stateData, ArraySt$Meta3dCommonlib.length(assetFileJson.imagePaths), ArraySt$Meta3dCommonlib.length(assetFileJson.imagePaths) + ArraySt$Meta3dCommonlib.length(assetFileJson.soundPaths) | 0, assetFileJson.soundPaths, assetFilesData);
}

function _parseGlbs(setArrayBufferResourceFunc, stateData, assetFileJson, assetFilesData) {
  return _parseAssets([
              setArrayBufferResourceFunc,
              _convertUint8ArrayToArrayBuffer
            ], stateData, ArraySt$Meta3dCommonlib.length(assetFileJson.imagePaths) + ArraySt$Meta3dCommonlib.length(assetFileJson.soundPaths) | 0, (ArraySt$Meta3dCommonlib.length(assetFileJson.imagePaths) + ArraySt$Meta3dCommonlib.length(assetFileJson.soundPaths) | 0) + ArraySt$Meta3dCommonlib.length(assetFileJson.glbPaths) | 0, assetFileJson.glbPaths, assetFilesData);
}

function parse(param, stateData, modFuncData, assetFileJsonData, assetFilesData) {
  var setArrayBufferResourceFunc = param[2];
  var setAudioBlobResourceFunc = param[1];
  var decoder = new TextDecoder("utf-8");
  var assetFileJson = JSON.parse(FileUtils$Meta3d.removeAlignedEmptyChars(TextDecoder$Meta3d.decodeUint8Array(assetFileJsonData, decoder)));
  var __x = _parseImages(param[0], stateData, assetFileJson, assetFilesData);
  var __x$1 = Js_promise.then_((function (__x) {
          return _parseAudios(setAudioBlobResourceFunc, __x, assetFileJson, assetFilesData);
        }), __x);
  var __x$2 = Js_promise.then_((function (__x) {
          return _parseGlbs(setArrayBufferResourceFunc, __x, assetFileJson, assetFilesData);
        }), __x$1);
  return Js_promise.then_((function (stateData) {
                var lib = LibUtils$Meta3d.serializeLib(TextDecoder$Meta3d.decodeUint8Array(modFuncData, decoder), "Mod");
                return Promise.resolve([
                            stateData,
                            assetFileJson,
                            [
                              LibUtils$Meta3d.getFuncFromLib(lib, "getBlockService"),
                              LibUtils$Meta3d.getFuncFromLib(lib, "createBlockState"),
                              LibUtils$Meta3d.getFuncFromLib(lib, "getBlockInfo")
                            ]
                          ]);
              }), __x$2);
}

exports.generateMod = generateMod;
exports.loadMod = loadMod;
exports._convertUint8ArrayToBase64 = _convertUint8ArrayToBase64;
exports._convertUint8ArrayToAudioBlob = _convertUint8ArrayToAudioBlob;
exports._convertUint8ArrayToArrayBuffer = _convertUint8ArrayToArrayBuffer;
exports._getResourceId = _getResourceId;
exports._parseAssets = _parseAssets;
exports._parseImages = _parseImages;
exports._parseAudios = _parseAudios;
exports._parseGlbs = _parseGlbs;
exports.parse = parse;
/* No side effect */
