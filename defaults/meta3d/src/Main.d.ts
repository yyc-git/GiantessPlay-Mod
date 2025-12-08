export type fileJson = {
    protocolName: string,
    blockName: string,

    imagePaths: Array<string>,
    soundPaths: Array<string>,
    glbPaths: Array<string>,
}


export function generateMod(
    // extensionPackageData: extensionPackageData,
    fileStr: string,
    assetFileJson: fileJson,
    assetFiles: Array<Uint8Array>,
): ArrayBuffer

export function loadMod(
    modBinaryFile: ArrayBuffer
): [Uint8Array, Uint8Array, Array<Uint8Array>]

type stateData = any

export function parseMod(
    [setImageBase64ResourceFunc, setAudioBlobResourceFunc, setArrayBufferResourceFunc],
    stateData: stateData,
    modFuncData: Uint8Array,
    assetFileJsonData: Uint8Array,
    assetFilesData: Array<Uint8Array>,
): Promise<[
    stateData,
    any,
    [
        any,
        any,
        any,
    ]]>
