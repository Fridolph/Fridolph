import {readFile} from 'fs'
import {promisify} from 'util'

const readFileAsync = promisify(readFile)
const yewu = async (path) => {
  try {
    let data = await readFileAsync(path)
    let name = JSON.parse(data).name
    console.log(name)
  } catch (err) {
    console.log(err)
  }
}
yewu('./package.json')