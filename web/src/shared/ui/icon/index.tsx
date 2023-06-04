import cn from 'classnames';
import styles from './styles/icon.module.scss';

type Props = { className?: string; link: string; size?: number | 'contain'; svgFillColor?: string };

export default function Icon({ className, link, size, svgFillColor }: Props) {
  const icon = svgFillColor
    ? {
        mask: `url(${link})`,
        WebkitMaskImage: `url(${link})`,
        maskSize: typeof size === 'number' ? `${size}%` : size,
        WebkitMaskSize: typeof size === 'number' ? `${size}%` : size,
        backgroundColor: svgFillColor,
      }
    : {
        backgroundImage: `url(${link})`,
        backgroundSize: typeof size === 'number' ? `${size}%` : size,
      };
  return (
    <span
      className={cn(styles['icon'], className)}
      style={{
        ...icon,
      }}
    />
  );
}
