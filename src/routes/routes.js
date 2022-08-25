import ThreeMain from '../layout/main/ThreeMain'
import primitivesDemos from '../modules/three/01.fundamentals/primitivesDemos'
import basicUseDemos from '../modules/three/01.fundamentals/basicUseDemos'
import Responsive from '../modules/three/docs/responsive'
import Reactbasic from '../modules/react/docs/Reactbasic'

const routes = [
  {
    base: '/three',
    name: 'Three.js',
    children: [
      {
        base: '/fundamentals',
        name: '基础',
        children: [
          {
            path: '/basic-use',
            name: '简单使用',
            element: <ThreeMain key="basic-use" demos={basicUseDemos} />
          },
          {
            path: '/primitives',
            name: '图元',
            element: <ThreeMain key="primitives" demos={primitivesDemos} />
          }
        ]
      },
      {
        path: '/docs',
        name: '其他',
        children: [
          {
            path: '/three-responsive',
            name: 'three.js 响应式设计',
            element: <Responsive />
          }
        ]
      }
    ]
  },

  {
    base: '/react',
    name: 'React',
    children: [
      {
        path: '/basic',
        name: '基础',
        element: <Reactbasic />
      }
    ]
  }
]

export default routes
