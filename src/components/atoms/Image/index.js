import { React, PropTypes, useMemo } from 'libraries';

const Image = ({
  source,
  backgroundImage,
  children,
  style,
  className,
  title,
  resizeMode,
  alt
}) =>
  useMemo(() => {
    if (backgroundImage) {
      return (
        <div
          className={className}
          style={{
            backgroundImage: `url(${source})`,
            ...(resizeMode && { backgroundSize: resizeMode }),
            ...style
          }}
          alt={alt}
          title={title}
        >
          {children}
        </div>
      );
    }

    return (
      <img
        src={source}
        className={className}
        style={style}
        alt={alt}
        title={title}
      />
    );
  }, [
    alt,
    backgroundImage,
    children,
    className,
    resizeMode,
    source,
    style,
    title
  ]);

Image.propTypes = {
  source: PropTypes.any,
  children: PropTypes.any,
  backgroundImage: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
  title: PropTypes.string,
  alt: PropTypes.string,
  resizeMode: PropTypes.string
};

Image.defaultProps = {
  title: '',
  alt: '',
  source: null,
  backgroundImage: false,
  resizeMode: 'contain'
};

export default Image;
