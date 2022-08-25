import styles from './AppHeader.module.css'

export default function AppHeader(props) {
  return <div className={styles['main-header']}>{props.children}</div>
}
