module.exports = TreeNode

function TreeNode(file, media) {
  this.file = file
  this.media = media
  this.parents = {}
  this.children = {}
  this.content = undefined
  this.id = "file:" + file + ";media:" + media
}

TreeNode.prototype.addImport = function(index, child, importStmt) {
  this.children[index] = this.children[index] || []
  this.children[index].push(child)
  if (child.parents[this.id]) {
    if (child.parents[this.id].indexOf(importStmt) === -1) {
      child.parents[this.id].push(importStmt)
    }
  }
  else {
    child.parents[this.id] = [ importStmt ]
  }
}

TreeNode.prototype.getSortedChildren = function() {
  var childrenByIndex = this.children
  return Object.keys(childrenByIndex).sort().reduce(function(children, index) {
    return children.concat(childrenByIndex[index])
  }, [])
}

TreeNode.prototype.flatten = function(flat) {
  flat = flat || []
  this.getSortedChildren().forEach(function(child) {
    child.flatten(flat)
  })
  if (flat.indexOf(this) === -1) {
    flat.push(this)
  }
  return flat
}
