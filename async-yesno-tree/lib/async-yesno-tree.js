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
  this.root = null;
  this.children = {};
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
  this.root = this.children[name] = new YesNoNode(cb);
};

/**
 * Add child
 *
 * @param {String} cname
 * @param {String} pname
 * @param {Boolean} cond
 * @param {Function} cb
 *
 * @public
 */
YesNoTree.prototype.addChild = function(cname, pname, cond, cb) {
  var child = new YesNoNode(cb);

  this.children[cname] = child;
  this.children[pname].append(cond, child);
};

/**
 * Start traverse
 *
 * @public
 */
YesNoTree.prototype.traverse = function() {
  // feed an empty context
  this.root.evaluate(this.cb, {});
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
YesNoNode.prototype.append = function(cond, child) {
  cond ? (this.leftChild = child) : (this.rightChild = child);
};

/**
 * Evaluate and sink into the next yesno node
 *
 * @param {Function} cb
 * @param {Object} context
 *
 * @public
 */
YesNoNode.prototype.evaluate = function(cb, context) {
  var self = this;

  utils.invokeCallback(this.cb, function(err, cond, res) {
    for (var attr in res) {
      context[attr] = res[attr];
    }

    if (err) {
      utils.invokeCallback(cb, err, context);
      return;
    }

    var child;
    cond ? (child = self.leftChild) : (child = self.rightChild);

    if (child) {
      child.evaluate(cb, context);
    } else {
      utils.invokeCallback(cb, null, context);
    }
  }, context);
};

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
      tree.addChild(name, pname, cond, cb);
    }
  }

  tree.traverse();
};

// export autoRunTree method
module.exports = { 'autoRunTree': autoRunTree };
