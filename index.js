(function(factory){
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // CommonJS.
    module.exports = factory();
  } else {
    // Browser globals.
    window.mockaf = factory();
  }
}(function(){

  // raf = requestAnimationFrame.
  // caf = cancelAnimationFrame.

  var callbacks = {};
  var originalMethods = {};
  var id = 0;

  var mockRaf = function(fn){
    callbacks[id] = fn;
    return id++;
  };

  var mockCaf = function(id){
    delete callbacks[id];
  };

  var getRafNames = function(){
    return ['r', 'webkitR', 'mozR', 'oR']
      .map(function(prefix){
        var name = prefix + 'equestAnimationFrame';
        if (window[name]) return name;
      })
      .filter(Boolean);
  };

  var getCafNames = function(){
    return ['c', 'webkitC', 'mozC', 'oC']
      .map(function(prefix){
        var name = prefix + 'ancelAnimationFrame';
        if (window[name]) return name;
      })
      .filter(Boolean);
  };

  return {

    tick: function(){
      Object.keys(callbacks).forEach(function(id){
        callbacks[id].call(window);
        delete callbacks[id];
      });
    },

    install: function(){
      getRafNames().forEach(function(rafName){
        originalMethods[rafName] = window[rafName];
        window[rafName] = mockRaf;
      });

      getCafNames().forEach(function(cafName){
        originalMethods[cafName] = window[cafName];
        window[cafName] = mockCaf;
      });
    },

    uninstall: function(){
      Object.keys(originalMethods).forEach(function(methodName){
        window[methodName] = originalMethods[methodName];
      });
      callbacks = {};
      originalMethods = {};
      id = 0;
    }

  };

}));
