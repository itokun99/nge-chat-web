import { React, PropTypes, useMemo } from 'libraries';

const Skeleton = ({
  width,
  height,
  radius,
  circle,
  style,
  className,
  children,
  ...props
}) =>
  useMemo(() => {
    let styleHeight = height;
    let styleRadius = radius;
    if (circle) {
      styleHeight = width;
      styleRadius = '50%';
    }

    return (
      <div
        style={{
          width,
          height: styleHeight,
          borderRadius: styleRadius,
          ...style
        }}
        className={`Skeleton ${className || ''}`}
        {...props}
      >
        {children}
      </div>
    );
  }, [children, circle, className, height, props, radius, style, width]);

Skeleton.propTypes = {
  circle: PropTypes.bool,
  radius: PropTypes.any,
  height: PropTypes.any,
  width: PropTypes.any,
  style: PropTypes.any,
  className: PropTypes.string,
  children: PropTypes.any
};

Skeleton.defaultProps = {
  circle: false,
  width: '100%',
  height: 24,
  radius: 0
};

export default Skeleton;
