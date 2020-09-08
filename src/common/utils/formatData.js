export default function(data, oLabelK, oValueK, nLabelK = 'label', nValueK = 'value') {
  let result = []
  data.forEach(child => {
    result.push(traverseItem(child))
  })

  function traverseItem(item) {
    if (item.children) {
      item.children = item.children.map(child => {
        child = traverseItem(child)
        return child
      })
    }
    item[nLabelK] = item[oLabelK]
    item[nValueK] = item[oValueK]
    return item
  }

  return result
}