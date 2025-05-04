import { cc } from 'utils/combineClasses'
import styles from './styles.module.scss'

interface Props {
  className?: string
}

const Checkbox = ({ className }: Props) => {
  return <input type='checkbox' className={cc(styles.checkboxRoot, className)}></input>
}


export default Checkbox
