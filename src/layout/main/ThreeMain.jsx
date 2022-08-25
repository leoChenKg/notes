import ThreeDemoWrapper from '../demo/ThreeDemoWrapper'

// 仅用于展示three.js 的main组件
export default function Primitives({ demos }) {
  return (
    <>
      {demos.map(({ Demo, title, Describe, DetailInfor }) => (
        <ThreeDemoWrapper key={'key——' + title} renderWebGL={Demo} title={title} describe={<Describe />}>
          <DetailInfor />
        </ThreeDemoWrapper>
      ))}
    </>
  )
}
