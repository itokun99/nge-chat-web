import { React, PropTypes } from 'libraries';

const Input = ({ className, ...props }) => (
  <input className={`Input ${className}`} {...props} />
);

Input.propTypes = {
  className: PropTypes.string
};

Input.defaultProps = {
  className: ''
};

export default Input;
