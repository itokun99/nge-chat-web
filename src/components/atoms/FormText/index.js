/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import { React, PropTypes, useMemo, cx } from 'libraries';

const FormText = ({ label, text, textBold, labelBold }) =>
  useMemo(() => {
    const labelClass = cx('FormText__label', {
      'FormText__label--bold': labelBold
    });

    const textClass = cx('FormText__text', {
      'FormText__text--bold': textBold
    });

    return (
      <div className="FormText">
        <label className={labelClass}>{label}</label>
        <div className={textClass}>{text}</div>
      </div>
    );
  }, [label, labelBold, text, textBold]);

FormText.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string,
  labelBold: PropTypes.bool,
  textBold: PropTypes.bool
};

FormText.defaultProps = {
  label: '',
  text: '',
  labelBold: false,
  textBold: false
};

export default FormText;
