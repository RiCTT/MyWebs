function getStore(key) {
  let data = localStorage.getItem(key) || JSON.stringify([])
  return JSON.parse(data)
}

function setStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

const CatelogKey = 'xxxxx-2020-catalog'
const DailyKey = 'xxxxx-2020-daily'


function genID(length = 10){
  return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
}

// todo：算法可以再优化，目前是一个for循环的递归调用
export function getCatalogList() {
  const list = getStore(CatelogKey)
  const result = []
  function traverse(item, list) {
    if (item.catalogIds && item.catalogIds.split(',').length) {
      const map = {}
      const children = []
      for (let i = 0; i < list.length; i++) {
        const current = list[i]
        const { id } = current
        map[id] = current
      }
      const ids = item.catalogIds.split(',')
      ids.forEach(id => {
        children.push(map[id])
      })
      delete item.catalogIds
      item.children = children
      item.children = item.children.map(child => {
        return traverse(child, list)
      })
    }
    return item
  }
  list.forEach(item => {
    if (item.parentId === item.id) {
      result.push(traverse(item, list))
    }
  })
  return result
}

// 新增目录
export function insertCatalog({ parentId, rootId, id, catalogName }) {
  const list = getStore(CatelogKey)
  const newId = genID()
  if (id) {
    // update父节点的catalogIds记录
    const index = list.findIndex(item => item.id === id)
    const item = list[index]
    if (item.catalogIds) {
      item.catalogIds += ',' + newId
    } else {
      item.catalogIds = newId
    }
    list[index] = item
  }

  list.push({
    id: newId,
    parentId: id || newId,
    rootId: rootId || newId,
    catalogName,
    createdTime: new Date(),
    updatedTime: new Date()
  })
  setStore(CatelogKey, list)
}

// 新增日记
export function insertDaily(catalogId, { content, title }) {
  const list = getStore(DailyKey)
  list.push({
    id: genID(12),
    catalogId,
    content,
    title,
    createdTime: new Date(),
    updatedTime: new Date()
  })
  setStore(DailyKey, list)
}