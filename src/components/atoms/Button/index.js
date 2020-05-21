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
  circle,
  circleSize,
  className,
  ...props
}) => {
  const buttonBlock = `Button`;
  const buttonClass = cx(
    buttonBlock,
    {
      [`${buttonBlock}--${color}`]: color,
      [`${buttonBlock}--block`]: block,
      [`${buttonBlock}--${size}`]: size,
      [`${buttonBlock}--disabled`]: disabled,
      [`${buttonBlock}--circle`]: circle
    },
    className
  );

  return (
    <React.Fragment>
      <button
        type={type}
        className={buttonClass}
        onClick={disabled ? () => {} : e => onClick(e)}
        style={{
          ...(circle && { width: circleSize, height: circleSize }),
          ...style
        }}
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
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  circle: PropTypes.bool,
  circleSize: PropTypes.number,
  className: PropTypes.string
};

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
  block: false,
  type: 'button',
  color: 'primary',
  size: 'medium',
  circle: false,
  circleSize: 42,
  className: ''
};

export default Button;
