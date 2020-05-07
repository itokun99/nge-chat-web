import { React, PropTypes } from "libraries";

const MyButton = ({ title }) => {
  return <button>{title}</button>;
};

MyButton.propTypes = {
  title: PropTypes.string
};

MyButton.defaultProps = {
  title: ""
};

export default MyButton;
