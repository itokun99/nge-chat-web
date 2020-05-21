import { React, PropTypes, MdPhotoCamera } from 'libraries';
import { Image } from 'components/atoms';

const ImageInput = ({ image, onChange }) => {
  const handleImageChange = e => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      setTimeout(() => {
        if (reader.result) {
          onChange(file, reader.result);
        }
      }, 100);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Image
      backgroundImage
      className="ImageInput"
      source={image}
      resizeMode="cover"
    >
      <span className="ImageInput__icon">
        <MdPhotoCamera size={72} />
      </span>
      <input
        onChange={handleImageChange}
        type="file"
        accept=".jpg,.png"
        className="ImageInput__input"
      />
    </Image>
  );
};

ImageInput.propTypes = {
  image: PropTypes.string,
  onChange: PropTypes.func
};
ImageInput.defaultProps = {
  image: '',
  onChange: () => {}
};

export default ImageInput;
