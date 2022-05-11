import React from 'react';
import classNames from 'classnames';

import styles from './white-box.module.scss';

interface OwnProps {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
}

type Props = OwnProps;

const WhiteBoxContent: React.FC<Props> = (props: Props) => {
  const {
    children,
    containerClassName,
    className,
  } = props;

  const containerClass: string = classNames(containerClassName, styles.whiteBoxContainer);

  const boxClass: string = classNames(className, styles.whiteBox);

  return (
    <div className={containerClass}>
      <div className={boxClass}>
        {children}
      </div>
    </div>
  );
};

export { WhiteBoxContent };
