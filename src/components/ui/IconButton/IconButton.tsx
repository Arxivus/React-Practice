import { cc } from 'utils/combineClasses'
import styles from './styles.module.scss'
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  icon: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const IconButton = ({ className, icon, onClick }: Props) => {
  return <button
    className={cc(styles.iconButtonRoot, className)}
    onClick={onClick}>
    <img src={icon} />
  </button>
}


export default IconButton
