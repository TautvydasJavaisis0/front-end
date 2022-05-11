import React from 'react';
import { Button } from 'antd';
import { ReactComponent as FilterSvg } from '../../../resources/icons/filter.svg';

import styles from './filter-button.module.scss';
import classNames from "classnames";
import {connect} from "formik";

interface OwnProps {
  className?: string;
}

type Props = OwnProps;

const FilterButtonComponent: React.FC<Props> = (props: Props) => {
  const {
    className,
    ...rest
  } = props;

  const containerClassName: string = classNames(styles.filterButton, className);

  return (
    <Button
      type="default"
      htmlType="button"
      className={`${containerClassName}`}
      icon={<FilterSvg />}
      {...rest}
    >
      Filtruoti
    </Button>
  );
};

const FilterButton = connect<OwnProps>(FilterButtonComponent);

export { FilterButton };
