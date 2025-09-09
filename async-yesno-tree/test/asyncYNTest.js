/**
 * A simple test for yesno tree
 *
 * ***************************************** YESNO TREE *****************************************
 *
 *
 *       start ----- spec A ----- spec C ----- spec D ----- spec E ----- end 6
 *                     |            |            |            |
 *                     |            |            |            |
 *                     |            |            |            |
 *       end 1 ----- spec B        end 3        end 4        end 5
 *                     |
 *                     |
 *                     |
 *                    end 2
 *
 *
 * **********************************************************************************************
 *
 * @author Minix Li
 */

var yesnotree = require('../index');
var util = require('../utils/util');

yesnotree.autoRunTree({
  specA: function(cb, context) {
    console.log("step into spec A");
    util.invokeCallback(cb, null, false, { a: "a has been set in spec A"});
  },

  specB: ['specA', true, function(cb, context) {
    console.log("step into spec B");
    util.invokeCallback(cb, null, true, { b: "b has been set in spec B" });
  }],

  end1: ['specB', true, function(cb, context) {
    console.log("arrive end 1");
    util.invokeCallback(cb, null);
  }],

  end2: ['specB', false, function(cb, context) {
    console.log("arrive end 2");
    util.invokeCallback(cb, null);
  }],

  specC: ['specA', false, function(cb, context) {
    console.log("step into spec C");
    util.invokeCallback(cb, null, false, { c: "c has been set in spec C" });
  }],

  end3: ['specC', true, function(cb, context) {
    console.log("arrive end 3");
    util.invokeCallback(cb, null);
  }],

  specD: ['specC', false, function(cb, context) {
    console.log("step into spec D");
    util.invokeCallback(cb, null, false, { d: "d has been set in spec D" });
  }],

  end4: ['specD', true, function(cb, context) {
    console.log("arrive end 4");
    util.invokeCallback(cb, null);
  }],

  specE: ['specD', false, function(cb, context) {
    console.log("step into spec E");
    util.invokeCallback(cb, null, false, { e: "e has been set in spec E" });
  }],

  end5: ['specE', true, function(cb, context) {
    console.log("arrive end 5");
    util.invokeCallback(cb, null);
  }],

  end6: ['specE', false, function(cb, context) {
    console.log("arrive end 6");
    util.invokeCallback(cb, null);
  }]
}, function(err, context) {
  for (var key in context) {
    console.log(context[key]);
  }
});
