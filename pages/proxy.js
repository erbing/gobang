const demo = () => {
  let data = { a: 1 };
  let reciveData = new Proxy(data, {
    get: function(target, name) {
      console.log(target, "----get-----");
    },
    set: function(obj, prop, value) {
      console.log(value, "----set-----");
      obj[prop] = 22;
      return true;
    }
  });
  console.log(reciveData.a);
  reciveData.a = 2;
  console.log(reciveData.a);
};

export default demo;
