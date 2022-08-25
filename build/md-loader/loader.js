const { marked } = require('marked')

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, lang) {
    const hljs = require('highlight.js')
    const language = hljs.getLanguage(lang) ? lang : 'plaintext'
    return hljs.highlight(code, { language }).value
  },
  langPrefix: 'hljs language-'
})
module.exports = function (source) {
  let __html = marked.parse(source)
  let obj = { __html }

  return `export default  ${JSON.stringify(obj)}`
}

/**
 *
 * md 中嵌入组件
 * {{"component": "modules/components/ComponentLinkHeader.js"}}
 * 嵌入 demo（运行结果 + 代码）--sandbox
 * {{"demo": "BasicButtons.js"}}
 *
 * md 头部信息
 * ---
 * title: React ButtonGroup（按钮组）组件
 * time: 2022-10-11 
 * ---
 * 最后编辑时间
 * 提取出目录信息（h2 h3）
 * 
 * 流程图
 * 
 * badge 小数字符号
 *
 * 
 * 数学符号
 */
