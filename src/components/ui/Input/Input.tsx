import { cc } from 'utils/combineClasses'
import styles from './styles.module.scss'

interface Props {
  className?: string
  placeholder?: string
  value?: string;
  onChange?: (value: string) => void;
}

const Input = ({ className, placeholder, value, onChange }: Props) => {
  return <input
    className={cc(styles.inputRoot, className)}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange?.(e.target.value)}>
  </input>
}


export default Input
