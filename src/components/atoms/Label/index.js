/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import { React, useMemo } from 'libraries';

const Label = ({ children, ...props }) =>
  useMemo(
    () => (
      <label className="Label" {...props}>
        {children}
      </label>
    ),
    [children, props]
  );

export default Label;
