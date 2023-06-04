type BtnProps = { type: 'button' | 'submit' | 'reset' };

type LinkProps = { type: 'link'; href: string };

export type CommonProps = {
  className?: string;
  text?: string;
  onClick?: () => void;
  onSubmit?: () => void;
} & (BtnProps | LinkProps);
