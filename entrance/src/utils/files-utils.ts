import fs, { existsSync, mkdirSync } from "fs"
import { join, dirname } from 'path'

export const readTextFileAsync = (relativePath: string) => {
    return new Promise((res, rej) => {
        const rootDirPath = dirname(require.main.filename)
        const filePath = join(rootDirPath, relativePath)
        fs.readFile(filePath, {encoding: 'utf-8'}, (err, content) => {
            if (err) {
                console.log(err)
                rej(err)
            }
            res(content)
        })
    })
}

export const ensureDirSync = (relativeDirPath): void => {
    const rootDirPath = dirname(require.main.filename)
    const dirPath = join(rootDirPath, relativeDirPath)
    if(!existsSync(dirPath)) {
        mkdirSync(dirPath, {recursive: true})
    }
}