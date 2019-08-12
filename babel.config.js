const plugins = [];
if(['production', 'prod'].includes(process.env.NODE_ENV)) { 
 plugins.push("transform-remove-console")
}

// module.exports = {
//   presets: [
//     '@vue/app'
//   ],
//   plugins: [
//     "transform-remove-strict-mode"  //配置插件，这里很重要
// ]
// }
module.exports = {
  presets: [["@vue/app",{"useBuiltIns": "entry"}]],
  plugins: plugins
 };