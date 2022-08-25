import { useState, useEffect, useRef } from 'react'
const sizeList = ['xs', 'sm', 'md', 'lg', 'xl']
class WidthListener {
  resizeHubList = []
  constructor() {
    this.curSize = undefined
    this.config = {
      xs: width => width < 544,
      sm: width => width >= 544 && width < 768,
      md: width => width >= 768 && width < 992,
      lg: width => width >= 992 && width < 1200,
      xl: width => width >= 1200
    }
    this.listen()
  }

  getSize(width) {
    for (const size in this.config) {
      if (this.config[size](width)) {
        return size
      }
    }
  }

  observe(ctx) {
    this.resizeHubList.push(ctx)
  }

  listen() {
    window.addEventListener('resize', () => {
      const width = window.innerWidth
      for (const size of sizeList) {
        if (this.config[size](width)) {
          if (this.curSize === size) break
          this.notify(size)
          this.curSize = size
        }
      }
    })
  }

  notify(size) {
    this.resizeHubList.forEach(hub => hub.update(size))
  }

  static getIncetance(ctx) {
    const instance = WidthListener.instance || (WidthListener.instance = window.instance = new WidthListener())
    WidthListener.instance.observe(ctx)
    return instance
  }
}

class ResizeHub {
  constructor(separator = {}) {
    this.widthListener = WidthListener.getIncetance(this)
    this.registeList = []
    this.resizeMap = {
      xs: [],
      sm: [],
      md: [],
      lg: [],
      xl: []
    }
  }

  on(size, fn) {
    this.resizeMap[size].push(fn)
  }

  registe(fn) {
    this.registeList.push(fn)
  }

  update(size) {
    const innerSize = size || this.widthListener.getSize(window.innerWidth)
    this.resizeMap[innerSize].forEach(fn => fn())
    this.registeList.forEach(fn => fn())
  }
}

export function useSeparator(opt) {
  const [target, setTarget] = useState({})

  useEffect(() => {
    const res = {}
    const rh = new ResizeHub()
    for (const pName in opt) {
      const resizeConfig = opt[pName]
      sizeList.forEach(size => {
        const value = resizeConfig[size] ? resizeConfig[size] : undefined
        rh.on(size, () => (res[pName] = value))
      })
    }
    rh.registe(() => setTarget({ ...res }))
    // 先执行一次
    rh.update()
  }, [])

  return target
}
