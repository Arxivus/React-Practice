import { cc } from 'utils/combineClasses'
import styles from './styles.module.scss'

interface Props {
  className?: string
  icon: string
}

const IconButton = ({ className, icon }: Props) => {
  return <button className={cc(styles.iconButtonRoot, className)}>
    <img src={icon} />
  </button>
}


export default IconButton
