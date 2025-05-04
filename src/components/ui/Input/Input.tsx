import { cc } from 'utils/combineClasses'
import styles from './styles.module.scss'

interface Props {
  className?: string
  placeholder?: string
}

const Input = ({ className, placeholder }: Props) => {
  return <input className={cc(styles.inputRoot, className)} placeholder={placeholder}></input>
}


export default Input
