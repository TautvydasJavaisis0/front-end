import React from 'react';
import classNames from 'classnames';
import { connect } from 'formik';

import { ReactComponent as Arrow } from 'app/resources/icons/rodyklė.svg';

import styles from './arrow-button.module.scss';

interface OwnProps {
  pointingLeft: boolean;
  className?: string;
  onClick?: () => void;
}

type Props = OwnProps;

const ArrowButtonComponent: React.FC<Props> = (props: Props) => {
  const {
    pointingLeft,
    className,
    ...rest
  } = props;

  const containerClassName: string = classNames(styles.buttonNext, className);

  return (
    <div
      className={`${containerClassName} ${pointingLeft ? styles.pointingLeft : ''}`}
      {...rest}
    >
      <Arrow />
    </div>
  );
};

const ArrowButton = connect<OwnProps>(ArrowButtonComponent);

export { ArrowButton };
