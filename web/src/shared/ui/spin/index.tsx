import cn from 'classnames';
import styles from './styles/spin.module.scss';

type Props = { className?: string };

export default function Spin({ className }: Props) {
  return <div className={cn(className, styles['spin'])} role="status" />;
}
