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
 * Add node into the tree
 *
 * @param {String} cname
 * @param {String} pname
 * @param {Boolean} cond
 * @param {Function} cb
 *
 * @public
 */
YesNoTree.prototype.addNode = function(cname, pname, cond, cb) {
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
  this.cb = cb; // evaluation callback
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
 * Auto run
 *
 * @param {Object} specs
 * @param {Function} cb
 */
var autoRunTree = function(specs, cb) {
  var tree = new YesNoTree(cb);

  for (var name in specs) {
    var spec = specs[name];

    // set tree root
    if (typeof spec == 'function') {
      tree.setRoot(name, spec);
    }

    // append child
    if (Array.isArray(spec)) {
      var pname = spec[0], cond = spec[1], cb = spec[2];
      tree.addNode(name, pname, cond, cb);
    }
  }

  tree.traverse();
};

// export autoRunTree method
module.exports = { 'autoRunTree': autoRunTree };
