// Vue插件 一定暴露对象
let myPlugins = {};
myPlugins.install = function (Vue, options) {
  //   Vue.prototype.$bus 任何组件都能用
  // Vue.directive()
  // Vue.component
  // Vue.filter....
  Vue.directive(options.name, (element, b) => {
    console.log(b);
  });
};
export default myPlugins;
