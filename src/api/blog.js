function getStore(key) {
  let data = localStorage.getItem(key) || JSON.stringify([])
  return JSON.parse(data)
}

function setStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

const CatalogKey = 'xxxxx-2020-catalog'
const BlogKey = 'xxxxx-2020-blog'

function genID(length = 10){
  return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
}

// todo：算法可以再优化，目前是一个for循环的递归调用
export function getCatalogListSorted() {
  const list = getStore(CatalogKey)
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

// 获取目录列表，没有整理、排序过的
export function getCatalogList() {
  const list = getStore(CatalogKey)
  return list
}

// 新增目录
export function insertCatalog({ parentId, rootId, id, catalogName }) {
  const list = getStore(CatalogKey)
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
    blogIds: '', // 对应博客列表的ids，需要异步去获取
    blogs: [], // 对应博客列表
    createdTime: new Date(),
    updatedTime: new Date()
  })
  setStore(CatalogKey, list)
}

// 更新目录
export function updateCatalog({ id, blogId }) {
  const list = getStore(CatalogKey)
  let catalogList = getCatalogList()
  let targetCatalogIndex = catalogList.findIndex(item => item.id === id)
  if (targetCatalogIndex === -1) {
    return console.error('没有找到对应id的目录!')
  }
  let current = list[targetCatalogIndex]
  if (!current.blogIds) {
    current.blogIds = ''
  }
  current = {
    ...current,
    blogIds: current.blogIds.split(',').concat(blogId).join(',').slice(1)
  }
  list[targetCatalogIndex] = current
  setStore(CatalogKey, list)
  return list[targetCatalogIndex]
} 

// 新增日记
export function insertBlog({ catalogId, content, title }) {
  const list = getStore(BlogKey)
  let catalogList = getCatalogList()
  let targetCatalog = catalogList.find(item => item.id === catalogId)
  if (!targetCatalog) {
    return console.error('没有找到对应id的目录!')
  }
  const id = genID(12)
  updateCatalog({ id: catalogId, blogId: id })
  list.push({
    id,
    catalogId,
    content,
    title,
    createdTime: new Date(),
    updatedTime: new Date()
  })
  setStore(BlogKey, list)
}

// 获取列表byids
export function getBlogByIds(ids) {
  const list = getStore(BlogKey)
  return list.filter(item => {
    return ids.indexOf(item.id) > -1
  })
}