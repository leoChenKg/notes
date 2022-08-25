const flatRoutes = (routes = [], baseUrl = '') => {
  let res = []
  routes.forEach(route => {
    const nextPath = baseUrl + (route.path || route.base)
    res.push(route.path ? { ...route, path: nextPath } : { ...route, base: nextPath })
    if (route.children && route.children.length > 0) {
      res.push(...flatRoutes(route.children, nextPath))
    }
  })

  return res
}
export default flatRoutes
