import React from 'react';
import cn from 'classnames';

const SpinnerSvg = props => {
  const { className, modifier } = props;
  const svgClass = cn('spinner', className, {
    [`spinner_${modifier}`]: modifier,
  });
  const pathClass = cn('spinner__path', {
    [`spinner__path_${modifier}`]: modifier,
  });
  return (
    <svg viewBox="0 0 66 66" {...props} className={svgClass}>
      <circle className={pathClass} cx="33" cy="33" />
    </svg>
  );
};

export default SpinnerSvg;
