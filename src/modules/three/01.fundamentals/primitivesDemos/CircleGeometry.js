import * as THREE from 'three'
import autoResize from '../../../../utils/autoResize'

export function Demo(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })

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

  /**
   * 平面圆 参数如下
   */
  const radius = 7 // ui: radius 半径
  const segments = 24 // ui: segments 分段
  const thetaStart = Math.PI * 0.25 // ui: thetaStart 扇形的开始角度位置
  const thetaLength = Math.PI * 1.5 // ui: thetaLength 扇形的的角度
  const geometry1 = new THREE.CircleGeometry(radius, segments, thetaStart, thetaLength)
  const geometry2 = new THREE.CircleGeometry(radius, segments)

  const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 })
  const obj1 = new THREE.Mesh(geometry1, material)
  const obj2 = new THREE.Mesh(geometry2, material)
  obj1.position.x = -8
  obj2.position.x = 8
  scene.add(obj1, obj2)

  requestAnimationFrame(render)
  autoResize(renderer)

  function render(time) {
    time *= 0.001
    const speed = 1
    const rot = time * speed
    obj1.rotation.x = rot
    obj1.rotation.y = rot
    obj2.rotation.x = rot
    obj2.rotation.y = rot
    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }
}

export const title = 'CircleGeometry-圆形、扇形'

export function Describe() {
  return <div>describe</div>
}
export function DetailInfor() {
  return <div>DetailInfor</div>
}
