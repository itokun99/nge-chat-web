/* eslint-disable react/button-has-type */
import { React, PropTypes, cx } from 'libraries';

const Button = ({
  type,
  children,
  color,
  block,
  style,
  size,
  onClick,
  disabled,
  ...props
}) => {
  const buttonBlock = `Button`;
  const buttonClass = cx(buttonBlock, {
    [`${buttonBlock}--${color}`]: color,
    [`${buttonBlock}--block`]: block,
    [`${buttonBlock}--${size}`]: size,
    [`${buttonBlock}--disabled`]: disabled
  });

  return (
    <React.Fragment>
      <button
        type={type}
        className={buttonClass}
        style={style}
        onClick={disabled ? () => {} : e => onClick(e)}
        {...props}
      >
        {children}
      </button>
    </React.Fragment>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object,
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  children: PropTypes.any,
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
    'gray'
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
  block: false,
  type: 'button',
  color: 'primary',
  size: 'medium'
};

export default Button;
