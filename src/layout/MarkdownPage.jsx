import styles from './MarkdownPage.module.css'
import 'highlight.js/styles/github.css'

export default function MarkdownPage({ htmlObj, theme }) {
  return <div className={styles.container} dangerouslySetInnerHTML={htmlObj}></div>
}
