import { React, useHistory } from 'libraries';
import { BaseContainer, PrivateContainer } from 'containers';
import { AccountForm } from 'components';

const Account = () => {
  const history = useHistory();

  return (
    <PrivateContainer>
      <BaseContainer
        title="Akun"
        headerProps={{
          theme: 'light',
          disableRightAction: true,
          disableShadow: true,
          onPressLeft: () => history.goBack()
        }}
      >
        <div className="Account">
          <AccountForm />
        </div>
      </BaseContainer>
    </PrivateContainer>
  );
};

export default Account;
