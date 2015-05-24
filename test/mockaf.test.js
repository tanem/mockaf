var test = require('tape');
var mockaf = require('..');

test('install should mock all requestAnimationFrame methods on the window object', function (t) {
  
  t.plan(1);
  
  var isCalled = false;
  var noop = function(){
    isCalled = true;
  };

  window.requestAnimationFrame =
  window.webkitRequestAnimationFrame =
  window.mozRequestAnimationFrame =
  window.oRequestAnimationFrame = noop;

  mockaf.install();

  window.requestAnimationFrame();
  window.webkitRequestAnimationFrame();
  window.mozRequestAnimationFrame();
  window.oRequestAnimationFrame();

  t.false(isCalled);

  mockaf.uninstall();

});

test('install should mock all cancelAnimationFrame methods on the window object', function (t) {
  
  t.plan(1);
  
  var isCalled = false;
  var noop = function(){
    isCalled = true;
  };

  window.cancelAnimationFrame =
  window.webkitCancelAnimationFrame =
  window.mozCancelAnimationFrame =
  window.oCancelAnimationFrame = noop;

  mockaf.install();

  window.cancelAnimationFrame();
  window.webkitCancelAnimationFrame();
  window.mozCancelAnimationFrame();
  window.oCancelAnimationFrame();

  t.false(isCalled);

  mockaf.uninstall();

});

test('tick should execute all stored callbacks', function (t) {

  t.plan(1);
  
  mockaf.install();    
  
  var raf = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame;

  var callCount = 0;
  var cb = function(){
    callCount++;
  };

  raf(cb);
  raf(cb);
  raf(cb);

  mockaf.tick();

  t.equal(callCount, 3);

  mockaf.uninstall();

});

test('cancelAnimationFrame should cancel a stored callback', function (t) {

  t.plan(1);
  
  mockaf.install();    
  
  var raf = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame;

  var caf = window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.oCancelAnimationFrame;

  var callCount = 0;
  var cb = function(){
    callCount++;
  };

  var idOne = raf(cb);
  var idTwo = raf(cb);
  var idThree = raf(cb);

  caf(idTwo);
  caf(idThree);

  mockaf.tick();

  t.equal(callCount, 1);

  mockaf.uninstall();
  
});

test('uninstall should restore all original *AnimationFrame methods on the window object', function (t) {
  
  t.plan(1);
  
  var callCount = 0;
  var noop = function(){
    callCount++;
  };

  window.requestAnimationFrame =
  window.webkitRequestAnimationFrame =
  window.mozRequestAnimationFrame =
  window.oRequestAnimationFrame = noop;

  window.cancelAnimationFrame =
  window.webkitCancelAnimationFrame =
  window.mozCancelAnimationFrame =
  window.oCancelAnimationFrame = noop;

  mockaf.install();
  mockaf.uninstall();

  window.requestAnimationFrame();
  window.webkitRequestAnimationFrame();
  window.mozRequestAnimationFrame();
  window.oRequestAnimationFrame();

  window.cancelAnimationFrame();
  window.webkitCancelAnimationFrame();
  window.mozCancelAnimationFrame();
  window.oCancelAnimationFrame();

  t.equal(callCount, 8)

});
