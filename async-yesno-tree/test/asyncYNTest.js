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
  'root': {
    'name': 'specA',
    'cb': function(cb, ctx) {
      console.log("proceed into spec A");
      util.invokeCallback(cb, null, false, { a: "a has been set in spec A"});
    }
  },
  'final': function(err, context) {
    for (var key in context) {
      console.log(context[key]);
    }
  },
  'children': [
    {
      'name': 'specB',
      'pname': 'specA',
      'cond': true,
      'cb': function(cb, ctx) {
        console.log("proceed into spec B");
        util.invokeCallback(cb, null, true, { b: "b has been set in spec B" });
      }
    },
    {
      'name': 'end1',
      'pname': 'specB',
      'cond': true,
      'cb': function(cb, ctx) {
        console.log("arrive end 1");
        util.invokeCallback(cb, null);
      }
    },
    {
      'name': 'end2',
      'pname': 'specB',
      'cond': false,
      'cb': function(cb, ctx) {
        console.log("arrive end 2");
        util.invokeCallback(cb, null);
      }
    },
    {
      'name': 'specC',
      'pname': 'specA',
      'cond': false,
      'cb': function(cb, ctx) {
        console.log("proceed into spec C");
        util.invokeCallback(cb, null, false, { c: "c has been set in spec C" });
      }
    },
    {
      'name': 'end3',
      'pname': 'specC',
      'cond': true,
      'cb': function(cb, ctx) {
        console.log("arrive end 3");
        util.invokeCallback(cb, null);
      }
    },
    {
      'name': 'specD',
      'pname': 'specC',
      'cond': false,
      'cb': function(cb, ctx) {
        console.log("proceed into spec D");
        util.invokeCallback(cb, null, false, { d: "d has been set in spec D" });
      }
    },
    {
      'name': 'end4',
      'pname': 'specD',
      'cond': true,
      'cb': function(cb, ctx) {
        console.log("arrive end 4");
        util.invokeCallback(cb, null);
      }
    },
    {
      'name': 'specE',
      'pname': 'specD',
      'cond': false,
      'cb': function(cb, ctx) {
        console.log("proceed into spec E");
        util.invokeCallback(cb, null, false, { e: "e has been set in spec E" });
      }
    },
    {
      'name': 'end5',
      'pname': 'specE',
      'cond': true,
      'cb': function(cb, ctx) {
        console.log("arrive end 5");
        util.invokecallback(cb, null);
      }
    },
    {
      'name': 'end6',
      'pname': 'specE',
      'cond': false,
      'cb': function(cb, ctx) {
        console.log("arrive end 6");
        util.invokeCallback(cb, null);
      }
    },
  ]
});
