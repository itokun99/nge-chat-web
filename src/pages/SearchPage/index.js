import { React, useHistory } from 'libraries';
import { BaseContainer, PrivateContainer } from 'containers';
import { SearchInput } from 'components';

const SearchPage = () => {
  const history = useHistory();

  return (
    <PrivateContainer>
      <BaseContainer
        disableRightAction
        headerProps={{
          title: 'Search',
          theme: 'light',
          centerComponent: <SearchInput />,
          disableShadow: true,
          onPressLeft: () => history.goBack()
        }}
      >
        <div className="SearchPage">
          <h1>Search here..</h1>
        </div>
      </BaseContainer>
    </PrivateContainer>
  );
};

export default SearchPage;
