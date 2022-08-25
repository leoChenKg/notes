import * as THREE from 'three'
import autoResize from '../../../../utils/autoResize'

function createObj(geometryParams, color, x) {
  // ConeGeometry 参数 geometryParams
  // const radius = 6 // ui: radius 半径
  // const height = 8 // ui: height 高度
  // const radialSegments = 16 // ui: radialSegments // 径向分段 （放射性一圈的分段）
  // const heightSegments = 2 // ui: heightSegments // 高度分段
  // const openEnded = true // ui: openEnded 底部是否不封闭
  // const thetaStart = Math.PI * 0.25 // ui: thetaStart  锥体开始的角度位置
  // const thetaLength = Math.PI * 1.5 // ui: thetaLength 锥体总共的角度值
  const geometry = new THREE.ConeGeometry(...geometryParams)
  const material = new THREE.MeshPhongMaterial({ color, side: THREE.DoubleSide })
  const obj = new THREE.Mesh(geometry, material)
  obj.position.x = x
  return obj
}

// 锥形
export function Demo(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  // renderer.setClearColor(new THREE.Color(0xdcdcdc)) //设置窗口背景颜色为黑

  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 100)
  camera.position.z = 20

  const scene = new THREE.Scene()

  //给场景添加光源
  //自然光
  var ambientLight = new THREE.AmbientLight(0x606060)
  scene.add(ambientLight)
  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(-1, 2, 4)
  scene.add(light)

  const objMsg = [
    [[6, 8, 16], 0x44aa88, -8],
    [[6, 8, 16, 2, true, Math.PI * 0.25, Math.PI * 1.5], 0x8844aa, 8]
  ]

  let objs = []
  objMsg.forEach(args => {
    const obj = createObj(...args)
    objs.push(obj)
    scene.add(obj)
  })

  requestAnimationFrame(render)
  autoResize(renderer)

  function render(time) {
    time *= 0.001
    const speed = 1
    const rot = time * speed

    objs.forEach((obj, index) => {
      obj.rotation.x = rot + index
      obj.rotation.y = rot + index
    })
    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }
}

export const title = 'ConeGeometry-锥体、缺角锥体'

export function Describe() {
  return <div>describe</div>
}
export function DetailInfor() {
  return <div>DetailInfor</div>
}
