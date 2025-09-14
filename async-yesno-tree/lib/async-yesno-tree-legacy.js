/**
 * Async YesNo Tree
 *
 * @author Minix Li
 */

var utils = require('../utils/util');

/**
 * YesNoTree constructor
 *
 * @param {Function} cb
 */
var YesNoTree = function(cb) {
  this.cb = cb;
  this.ctx = {};
  this.root = null;
  this.nodes = {};
};

/**
 * Set root
 *
 * @param {String} name
 * @param {Function} cb
 *
 * @public
 */
YesNoTree.prototype.setRoot = function(name, cb) {
  this.root = this.nodes[name] = new YesNoNode(cb);
};

/**
 * Add child node into the tree
 *
 * @param {String} cname
 * @param {String} pname
 * @param {Boolean} cond
 * @param {Function} cb
 *
 * @public
 */
YesNoTree.prototype.addChildNode = function(cname, pname, cond, cb) {
  var node = new YesNoNode(cb);

  this.nodes[cname] = node;
  this.nodes[pname].appendChild(cond, node);
};

/**
 * Traverse the tree
 *
 * @public
 */
YesNoTree.prototype.traverse = function(node) {
  if (!node) {
    node = this.root;
  }

  var self = this;
  var cb = this.cb;
  var ctx = this.ctx;
  node.evaluate(function(err, cond, res) {
    for (var attr in res) {
      ctx[attr] = res[attr];
    }

    if (err) {
      utils.invokeCallback(cb, err, ctx);
      return;
    }

    var child;
    cond ? (child = node.leftChild) : (child = node.rightChild);
    if (child) {
      self.traverse(child);
    } else {
      utils.invokeCallback(cb, null, ctx);
    }
  });
};

/**
 * YesNoNode constructor
 *
 * @param {Function} cb
 */
var YesNoNode = function(cb) {
  this.cb = cb;
  this.leftChild = null;
  this.rightChild = null;
};

/**
 * Append child to this node
 *
 * @param {Boolean} cond
 * @param {TreeNode} child
 *
 * @public
 */
YesNoNode.prototype.appendChild = function(cond, child) {
  cond ? (this.leftChild = child) : (this.rightChild = child);
};

/**
 * Evaluate
 *
 * @param {Function} cb
 *
 * @public
 */
YesNoNode.prototype.evaluate = function(cb) {
  utils.invokeCallback(this.cb, cb);
}

/**
 * Build and run
 *
 * @param {Object} specs
 * @param {Function} cb
 */
var buildAndRun = function(specs, cb) {
  var final = specs.final;
  var tree = new YesNoTree(final);

  var root = specs.root;
  tree.setRoot(root.name, root.cb);

  var children = specs.children;
  children.forEach(function(child) {
    tree.addChildNode(child.name, child.pname, child.cond, child.cb);
  })

  tree.traverse();
};

// export buildAndRun method
module.exports = { 'buildAndRun': buildAndRun };
