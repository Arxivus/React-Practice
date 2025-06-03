import { cc } from 'utils/combineClasses'
import styles from './styles.module.scss'
import React, { Children } from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  loading?: boolean;
  onClick?: React.MouseEventHandler
}

const Button = ({ className, children, onClick, loading }: Props) => {
  return <button
    className={cc(styles.buttonRoot, className, loading && styles.loading)}
    onClick={onClick}>
    {children}
  </button>
}


export default Button
