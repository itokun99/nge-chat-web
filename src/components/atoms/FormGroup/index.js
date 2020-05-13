import { React, PropTypes, useMemo } from 'libraries';

const FormGroup = ({ children }) =>
  useMemo(() => <div className="FormGroup">{children}</div>, [children]);

FormGroup.propTypes = {
  children: PropTypes.any
};
export default FormGroup;
