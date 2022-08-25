import * as THREE from 'three'
import autoResize from '../../../../utils/autoResize'

function createCube(geometry, color, x) {
  // 创建材质，反光材质
  const material = new THREE.MeshPhongMaterial({ color })
  // 创建 mesh 对象
  const cube = new THREE.Mesh(geometry, material)
  cube.position.x = x
  return cube
}

export function Demo(canvas) {
  // 创建渲染器，把canvas元素传入
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })

  // renderer.setSize(600, 300)

  // 创建摄像机
  // 参数依次是：视角（弧度）、视锥体截面宽高比、近平面位置、远平面位置（相对于相机位置）
  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5)
  camera.position.z = 2 // 设置相机位置（右手空间坐标系）

  // 创建场景
  const scene = new THREE.Scene()

  // 创建平行光源
  // 参数依次是 光的颜色、光线强度
  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(-1, 2, 4) // 设置光源的起始点
  scene.add(light) // 在场景中添加光源

  // 创建几何体
  // 参数依次是：宽、高、长
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  // 批量生产 mesh 对象
  let cubes = []
  ;[
    [geometry, 0x44aa88, 0],
    [geometry, 0x8844aa, -2],
    [geometry, 0xaa8844, 2]
  ].forEach(args => {
    const cube = createCube(...args)
    cubes.push(cube)
    scene.add(cube)
  })

  // 进行渲染
  requestAnimationFrame(render)
  autoResize(renderer)

  function render(time) {
    time *= 0.001
    cubes.forEach((cube, index) => {
      const speed = 1 + 0.1 * index
      const rot = time * speed
      cube.rotation.x = rot
      cube.rotation.y = rot
    })
    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }
}

export const title = 'Three.js的基本使用'

export function Describe() {
  return <div>describe</div>
}
export function DetailInfor() {
  return <div>DetailInfor</div>
}
