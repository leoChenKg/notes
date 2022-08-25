import * as THREE from 'three'
import autoResize from '../../../../utils/autoResize'

function createObj(geometryParams, color, x) {
  //   CylinderGeometry 参数 geometryParams
  //   const radiusTop = 4 // ui: radiusTop 顶部半径
  //   const radiusBottom = 4 // ui: radiusBottom 底部半径
  //   const height = 8 // ui: height 高度
  //   const radialSegments = 12 // ui: radialSegments 径向分段
  //   const heightSegments = 2 // ui: heightSegments 垂直分段
  //   const openEnded = false // ui: openEnded 是否不封闭几何体 （顶部和底部）
  //   const thetaStart = Math.PI * 0.25 // ui: thetaStart  柱体开始的角度位置（俯视）
  //   const thetaLength = Math.PI * 1.5 // ui: thetaLength 主题总体的角度（俯视）
  const geometry = new THREE.CylinderGeometry(...geometryParams)
  const material = new THREE.MeshPhongMaterial({ color, side: THREE.DoubleSide })
  const obj = new THREE.Mesh(geometry, material)
  obj.position.x = x
  return obj
}

// 圆柱体
export function Demo(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true }) //  antialias：true 抗锯齿属性开启
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
    [[4, 4, 8, 12], 0xaa8844, -8],
    [[4, 4, 8, 12, 2, false, Math.PI * 0.25, Math.PI * 1.5], 0x8844aa, 8]
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

export const title = 'CylinderGeometry-柱体、缺角柱体'

export function Describe() {
  return <div>describe</div>
}
export function DetailInfor() {
  return <div>DetailInfor</div>
}
