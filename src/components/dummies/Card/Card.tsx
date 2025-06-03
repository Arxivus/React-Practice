import { cc } from 'utils/combineClasses'
import styles from './styles.module.scss'

interface Props {
  image: string;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  className?: string
}

const Card = ({ image, title, subtitle, children, className, onClick }: Props) => {
  return <div
    className={cc(styles.cardRoot, className)}
    onClick={onClick}>
    <img className={styles.avatar} src={image} />
    <div className={styles.cardInfo}>
      <h3>{title}</h3>
      <p>{subtitle}</p>
      <div className={styles.cardChildren}>{children}</div>
    </div>
  </div>
}


export default Card
