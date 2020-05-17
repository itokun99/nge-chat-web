import { React, PropTypes, connect, cx } from 'libraries';
import { popupSelector } from 'modules';
import { Button } from 'components/atoms';
import { hidePopup } from 'services';

const Popup = ({ data }) => {
  const popupClass = cx('Popup', {
    'Popup--show': data.show
  });

  const handleClickButton = () => {
    if (data.onClickButton) {
      data.onClickButton();
    }
    hidePopup();
  };

  const handleClickSecondButton = () => {
    if (data.onClickSecondButton) {
      data.onClickSecondButton();
    }
    hidePopup();
  };

  const renderAction = () => {
    if (data.customButton) {
      return <div className="Popup__action">{data.customButton}</div>;
    }
    return (
      <div className="Popup__action">
        <Button block onClick={handleClickButton}>
          {data.buttonTitle}
        </Button>
        {data.showSecondButton && (
          <Button
            color="gray"
            style={{ marginTop: 8 }}
            block
            onClick={handleClickSecondButton}
          >
            {data.buttonSecondTitle}
          </Button>
        )}
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
