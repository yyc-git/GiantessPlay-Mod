import { fromPromise } from "most";
import { isPublisherRegistered } from "meta3d-tool-utils/src/publish/PublishUtils"
import { handleKeyToLowercase } from "meta3d-backend-cloudbase";
import fs from "fs"
import path from "path"
import { fileJson } from "meta3d";
import moment from "moment";
import { getWithDefault, isNullable } from "meta3d-commonlib-ts/src/NullableUtils";


let _throwError = (msg: string): never => {
    throw new Error(msg)
}

let _isEmpty = (value: any) => {
    return value === undefined || value === null
}

let _searchProtocolVersion = (name: string, dependencies: any) => {
    let value = dependencies[name]

    if (_isEmpty(value)) {
        //console.log(dependencies);
        _throwError("empty name: " + name)
    }

    return value
}

let _isProtocol = (protocolName: string) => {
    return /-protocol$/.test(protocolName)
}


// let _convertToExtensionOrContributePackageData = ({ name, version, protocol, displayName, repoLink, description, dependencies, packageDependencies }: any, account): any => {
//     return {
//         name,
//         version,
//         account,
//         displayName: _isEmpty(displayName) ? name : displayName,
//         repoLink: _isEmpty(repoLink) ? "" : repoLink,
//         description: _isEmpty(description) ? "" : description,
//         protocol: {
//             name: protocol.name,
//             version: _searchProtocolVersion(protocol.name, dependencies)
//         },
//         dependentPackageStoredInAppProtocolNameMap:
//             _isEmpty(packageDependencies) ? {} :
//                 Object.fromEntries(Object
//                     .entries(packageDependencies)
//                     .filter(([protocolName, protocolVersion]: [string, string]) => _isProtocol(protocolName)
//                     )
//                 ),
//         dependentBlockProtocolNameMap: Object.fromEntries(Object
//             .entries(dependencies)
//             .filter(([protocolName, protocolVersion]: [string, string]) => _isProtocol(protocolName) && protocolName != protocol.name
//             )
//         )
//     }
// }

function _defineWindow() {
    (global as any).window = {}
}

// let _getFileDirname = (fileType: "extension" | "contribute") => {
//     switch (fileType) {
//         case "extension":
//             return "extensions"
//         case "contribute":
//             return "contributes"
//     }
// }
let _getFileDirname = () => {
    return "mods"
}


let _getPublishedCollectionName = (fileType: "extension" | "contribute") => {
    switch (fileType) {
        case "extension":
            return "publishedextensions"
        case "contribute":
            return "publishedcontributes"
    }
}

// export let publish = ([readFileSyncFunc, logFunc, errorFunc, readJsonFunc, generateFunc, initFunc, hasAccountFunc, uploadFileFunc, getMarketImplementAccountDataFunc, addMarketImplementDataFunc, getFileIDFunc, parseMarketCollectionDataBodyFunc]: [any, any, any, any, any, any, any, any, any, any, any, any,], packageFilePath: string, distFilePath: string, fileType: "extension" | "contribute") => {
//     return readJsonFunc(packageFilePath)
//         .flatMap(packageJson => {
//             return initFunc().map(backendInstance => [backendInstance, packageJson])
//         }).flatMap(([backendInstance, packageJson]) => {
//             let account = packageJson.publisher

//             return isPublisherRegistered(hasAccountFunc, backendInstance, account).flatMap(isPublisherRegistered => {
//                 if (!isPublisherRegistered) {
//                     _throwError("找不到publishser，请在平台上注册该用户")
//                 }

//                 _defineWindow()

//                 let filePath =
//                     _getFileDirname(fileType) + "/" + packageJson.name + "_" + packageJson.version + ".arrayBuffer"

//                 return fromPromise(
//                     getMarketImplementAccountDataFunc(
//                         backendInstance,
//                         parseMarketCollectionDataBodyFunc,
//                         _getPublishedCollectionName(fileType),
//                         account,
//                         packageJson.name,
//                         packageJson.version,
//                         packageJson.protocol.name
//                     ).then((marketImplementAccountData) => {
//                         if (marketImplementAccountData.length > 0) {
//                             _throwError("version: " + packageJson.version + " already exist, please update version")
//                         }
//                     })
//                 ).flatMap(_ => uploadFileFunc(
//                     backendInstance,
//                     filePath,
//                     generateFunc(
//                         _convertToExtensionOrContributePackageData(packageJson, account),
//                         readFileSyncFunc(distFilePath, "utf-8")
//                     )
//                 ).flatMap((uploadData) => {
//                     let fileID = getFileIDFunc(uploadData, filePath)

//                     let packageData = _convertToExtensionOrContributePackageData(packageJson, account)

//                     let data = {
//                         protocolName: packageData.protocol.name,
//                         protocolVersion: packageData.protocol.version,
//                         name: packageJson.name,
//                         version: packageJson.version,
//                         displayName: packageData.displayName,
//                         repoLink: packageData.repoLink,
//                         description: packageData.description,
//                         fileID,
//                         key: handleKeyToLowercase(account)
//                     }

//                     return fromPromise(
//                         addMarketImplementDataFunc(
//                             backendInstance,
//                             _getPublishedCollectionName(fileType),
//                             data
//                         )
//                     )
//                 })
//                 )
//             })
//         }).drain()
//         .then(_ => {
//             logFunc("publish success")
//         })
//         .catch(e => {
//             errorFunc("error message: ", e)
//         })
// }


let _getFiles = (dir, filelist = []) => {
    if (!fs.existsSync(dir)) {
        return filelist;
    }

    const files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach((file) => {
        const filepath = path.join(dir, file);
        const stats = fs.statSync(filepath);
        if (stats.isDirectory()) {
            filelist = _getFiles(filepath, filelist); // 递归调用
        } else {
            filelist.push(filepath);
        }
    });
    return filelist;
}

let _readAllAssets = (assetFileDir: string, protocolName, blockName): [fileJson, Array<Uint8Array>, Array<Uint8Array>, Array<Uint8Array>] => {
    return _getFiles(assetFileDir).reduce(([fileJson, imageFiles, soundFiles, glbFiles], filePath) => {
        switch (path.extname(filePath)) {
            case ".png":
            case ".jpg":
                imageFiles.push(new Uint8Array(fs.readFileSync(filePath)))

                fileJson.imagePaths.push(filePath)
                break
            case ".mp3":
                soundFiles.push(new Uint8Array(fs.readFileSync(filePath)))

                fileJson.soundPaths.push(filePath)
                break
            case ".glb":
                glbFiles.push(new Uint8Array(fs.readFileSync(filePath)))

                fileJson.glbPaths.push(filePath)
                break
            default:
                throw new Error("err")
        }

        return [fileJson, imageFiles, soundFiles, glbFiles]
    }, [{
        protocolName, blockName,
        imagePaths: [], soundPaths: [], glbPaths: [],
    }, [], [], []])
}

let _readBase64 = (imageSrc) => {
    return `data:image/${path.extname(imageSrc).slice(1)};base64,${fs.readFileSync(imageSrc).toString("base64")}`
}

export let publish = (
    [readFileSyncFunc, logFunc, errorFunc, readJsonFunc, generateFunc, initFunc, uploadFileFunc,
        // addModDataFunc,
        getModDataFunc,
        setModDataFunc,

        getFileIDFunc]: any,

    packageFilePath: string, distFilePath: string,
    assetFileDir: string,
) => {
    return readJsonFunc(packageFilePath)
        .flatMap(packageJson => {
            return initFunc().map(backendInstance => [backendInstance, packageJson])
        }).flatMap(([backendInstance, packageJson]) => {
            _defineWindow()

            let modJson = packageJson.mod

            let filePath =
                _getFileDirname() + "/" + packageJson.name + "_" + packageJson.version + ".arrayBuffer"

            let [assetFileJson, imageFiles, soundFiles, glbFiles] = _readAllAssets(assetFileDir, modJson.protocolName, packageJson.name)

            return uploadFileFunc(
                backendInstance,
                filePath,
                generateFunc(
                    readFileSyncFunc(distFilePath, "utf-8"),
                    assetFileJson,
                    imageFiles.concat(soundFiles).concat(glbFiles),
                )
            ).flatMap((uploadData) => {
                let fileID = getFileIDFunc(uploadData, filePath)

                // let packageData = _convertToExtensionOrContributePackageData(packageJson, account)

                let key = handleKeyToLowercase(packageJson.name)

                let data = {
                    // protocolName: packageData.protocol.name,
                    // protocolVersion: packageData.protocol.version,
                    name: packageJson.name,
                    version: packageJson.version,

                    protocolName: modJson.protocolName,
                    // protocolVersion: modJson.protocolVersion,
                    author: modJson.author,
                    // category: modJson.category,
                    displayName_cn: getWithDefault(modJson.displayName_cn, modJson.displayName_en),
                    displayName_en: getWithDefault(modJson.displayName_en, modJson.displayName_cn),
                    repoLink: modJson.repoLink,
                    description_cn: getWithDefault(modJson.description_cn, modJson.description_en),
                    description_en: getWithDefault(modJson.description_en, modJson.description_cn),
                    icon: _readBase64(modJson.icon),

                    lastPublishTime: moment.now(),

                    isPublic: modJson.isPublic,

                    dependentMods: getWithDefault(modJson.dependentMods, []),

                    fileID,
                    // key: handleKeyToLowercase(account)
                    key,
                }

                // return fromPromise(
                //     addModDataFunc(
                //         backendInstance,
                //         // _getPublishedCollectionName(fileType),
                //         "publishedmods",
                //         data
                //     )
                // )
                let collectionName = "publishedmods"

                return fromPromise(getModDataFunc(backendInstance, collectionName, key).then(currentData => {
                    if (isNullable(currentData)) {
                        data = {
                            ...data,
                            subscribe: 0,
                            visit: 0
                        } as any
                    }
                    else {
                        data = {
                            ...currentData,
                            ...data,
                        } as any

                        delete (data as any)._id
                    }

                    return setModDataFunc(backendInstance, collectionName, key, data)
                }))
            }
            )

        }).drain()
        .then(_ => {
            logFunc("publish success")
        })
        .catch(e => {
            errorFunc("error message: ", e)
        })
}


// export let publishBundled = ([logFunc, errorFunc, readJsonFunc, generateFunc, initFunc, hasAccountFunc, uploadFileFunc, getMarketImplementAccountDataFunc, addMarketImplementDataFunc, getFileIDFunc, parseMarketCollectionDataBodyFunc]: [any, any, any, any, any, any, any, any, any, any, any,], packageFilePath: string, fileSource: string) => {
//     return publish(
//         [
//             (fileSource) => fileSource,
//             logFunc, errorFunc, readJsonFunc, generateFunc, initFunc, hasAccountFunc, uploadFileFunc, getMarketImplementAccountDataFunc, addMarketImplementDataFunc, getFileIDFunc, parseMarketCollectionDataBodyFunc
//         ], packageFilePath, fileSource, "contribute"
//     )
// }

