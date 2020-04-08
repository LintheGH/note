var obj = new Proxy({}, {
  get: function (target, propKey, receiver) {
    
    return target
  },
  set: function (target, propKey, value, receiver) {
    console.log('set----', target, propKey, value, receiver)
    return Reflect.set(target, propKey, value, receiver);
  }
});

obj.a
obj.b = 'A'