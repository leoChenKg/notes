import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavigateBar from './side/NavigateBar'
import routes from '../routes/routes'
import flatRoutes from '../utils/flatRoutes'
import AppHeader from './header/AppHeader'
import styles from './Layout.module.css'
import Home from './home/Home'

import dropmenue from './resource/dropmenue.svg'

export default function Layout(props) {
  const routesList = flatRoutes(routes).filter(route => route.path)

  const [showNavBar, setShowNavBar] = useState(false)
  const navbarClickHandler = e => {}

  return (
    <div className={styles['app-con']}>
      <NavigateBar routes={routes} show={showNavBar} />
      <div className={styles['main-con']}>
        <AppHeader>
          <button onClick={navbarClickHandler} className={[styles['icon-button'], styles['navbar']].join(' ')}>
            <img src={dropmenue} />
          </button>
        </AppHeader>
        <div className={styles['routes-con']}>
          <Routes>
            {routesList.map(route => (
              <Route key={'route' + route.path} path={route.path} element={route.element} />
            ))}
            <Route key="route-home" path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
