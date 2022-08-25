export default function autoResize(renderer) {
  resizeRendererToDisplaySize(renderer)
  window.addEventListener('resize', () => {
    resizeRendererToDisplaySize(renderer)
  })
}

export function resizeRendererToDisplaySize(renderer) {
  const { width, height, clientWidth, clientHeight } = renderer.domElement
  //  根据分辨率让canvas像素宽度 高度设置为 真实 的像素  devicePixelRatio 为像素比（1csspx上有多少个像素）
  const [w, h] = [clientWidth * devicePixelRatio, clientHeight * devicePixelRatio]
  const needResize = width !== w || height !== h
  if (needResize) {
    renderer.setSize(w, h, false)
  }
  return needResize
}
