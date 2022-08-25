import { Link } from 'react-router-dom'
import styles from './NavigateBar.module.css'
// import { s } from '../../utils/separator'

function Nav(props) {
  return <ul>{props.routes ? props.routes.map(item => <LinkItem key={item.path} route={item} />) : props.children}</ul>
}

function LinkItem(props) {
  return (
    <li className={styles['li-nowrap']}>
      {props.route.path ? <Link to={props.route.path}>{props.route.name}</Link> : props.route.name}
    </li>
  )
}

const ComponentsList = (routes, baseUrl = '') => {
  let navItemList = []
  routes.forEach((route, index) => {
    const nextPath = baseUrl + (route.path || route.base)
    if (route.children && route.children.length > 0) {
      navItemList.push(<LinkItem key={nextPath + index} route={route.path ? { ...route, path: nextPath } : route} />)
      navItemList.push(<Nav key={baseUrl + index}>{ComponentsList(route.children, nextPath)}</Nav>)
    } else {
      navItemList.push(<LinkItem key={nextPath + index} route={route.path ? { ...route, path: nextPath } : route} />)
    }
  })

  return navItemList
}

export default function NavigateBar(props) {
  const { routes } = props
  const Components = ComponentsList(routes)

  return (
    <div className={[styles.NavCon].join(' ')}>
      <div className={styles.logoCon}>
        <h1>
          <Link to="/">
            <svg
              style={{ 'vertical-align': 'middle' }}
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="BlurOnIcon"
              title="BlurOn"
              width="36px"
              height="36px"
            >
              <path d="M6 13c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0 4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0-8c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-3 .5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zM6 5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm15 5.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5zM14 7c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0-3.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5zm-11 10c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm7 7c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm0-17c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5zM10 7c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0 5.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm8 .5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0 4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0-8c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0-4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm3 8.5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zM14 17c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0 3.5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm-4-12c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0 8.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm4-4.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-4c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"></path>
            </svg>
          </Link>
        </h1>
      </div>
      <div className={styles.NavigateBarCon}>
        <Nav>{Components}</Nav>
      </div>
    </div>
  )
}
