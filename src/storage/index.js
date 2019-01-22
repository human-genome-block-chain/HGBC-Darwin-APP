
import { AsyncStorage } from 'react-native'
import Storage from 'react-native-storage'

if (!global.storage) {
  global.storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true
  })
}

const storage = global.storage

// 获取数据
const getStorage = key => (
  new Promise((resolve, reject) => {
    storage.load({ 
      key
    }).then(ret => { 
      resolve(ret)
    }).catch(err => {
      reject('')
    })
  })
)

// 写入数据
const setStorage = (key, data, expires = null) => (
  new Promise((resolve, reject) => {
    storage.save({ 
      key,
      data,
      expires
    })
    .then(() => resolve('success'))
    .catch(err => reject(err))
  })
)

// 删除数据
const removeStorage = key => (
  new Promise((resolve, reject) => {
    storage.remove({
      key
    })
    .then(() => resolve('success'))
    .catch(err => reject(err))
  })
)

// 清空数据
const removeAll = () => {
  storage.clearMap()
}

// 清除数据
const clearDataByKey = key => (
  new Promise((resolve, reject) => {
    storage.clearMapForKey(key)
    .then(() => resolve('success'))
    .catch(err => reject(err))
  })
)

export {
  storage,
  getStorage,
  setStorage,
  removeStorage,
  removeAll,
  clearDataByKey
}