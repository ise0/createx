import { useRouter } from 'next/router';
import Link, { LinkProps } from 'next/link';
import React, { useState, useEffect, ReactElement, Children } from 'react';

type Props = LinkProps & {
  children: ReactElement;
  activeClassName: string;
};

export function ActiveLink({ children, activeClassName, ...props }: Props) {
  const { asPath, isReady } = useRouter();

  const child = Children.only(children);
  const childClassName = child.props.className || '';
  const [className, setClassName] = useState(childClassName);

  useEffect(() => {
    if (isReady) {
      const linkPathname = new URL((props.as || props.href) as string, window.location.href)
        .pathname;
      const activePathname = new URL(asPath, window.location.href).pathname;

      const newClassName =
        linkPathname === activePathname
          ? `${childClassName} ${activeClassName}`.trim()
          : childClassName;

      if (newClassName !== className) {
        setClassName(newClassName);
      }
    }
  }, [
    asPath,
    isReady,
    props.as,
    props.href,
    childClassName,
    activeClassName,
    setClassName,
    className,
  ]);

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
}
