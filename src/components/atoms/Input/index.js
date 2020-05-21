import { React, PropTypes } from 'libraries';

const Input = ({ className, type, ...props }) => {
  if (type === 'textarea') {
    return <textarea className={`Input ${className}`} {...props} />;
  }

  return <input type={type} className={`Input ${className}`} {...props} />;
};

Input.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string
};

Input.defaultProps = {
  className: '',
  type: 'text'
};

export default Input;
