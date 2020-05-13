import { React, PropTypes, connect, cx } from 'libraries';
import { popupSelector } from 'modules';
import { Button } from 'components/atoms';
import { hidePopup } from 'services';

const Popup = ({ data }) => {
  const popupClass = cx('Popup', {
    'Popup--show': data.show
  });

  const renderAction = () => {
    if (data.customButton) {
      return <div className="Popup__action">{data.customButton}</div>;
    }
    return (
      <div className="Popup__action">
        <Button block onClick={data.onClickButton || hidePopup}>
          {data.buttonTitle}
        </Button>
      </div>
    );
  };

  return (
    <div className={popupClass}>
      <div className="Popup__modal" />
      <div className="Popup__box">
        <h3 className="Popup__title">{data.title}</h3>
        <div className="Popup__description">{data.description}</div>
        {renderAction()}
      </div>
    </div>
  );
};

const reduxState = state => ({
  data: popupSelector(state)
});

Popup.propTypes = {
  data: PropTypes.object.isRequired
};

export default connect(reduxState)(Popup);
