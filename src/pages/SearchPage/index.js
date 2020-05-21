import { React, useHistory, connect, PropTypes } from 'libraries';
import { BaseContainer, PrivateContainer } from 'containers';
import { SearchInput, ChatItem } from 'components';
import { getUsers } from 'services';
import {
  usersSelector,
  usersSearchSelector,
  setUserFilter,
  userFilterTextSelector
} from 'modules';

const SearchPage = ({
  users,
  usersWithFilter,
  userFilterText,
  handleUserFilter
}) => {
  const history = useHistory();

  const navigateToDetail = userId => {
    history.push(`/user/${userId}`);
  };

  const renderList = () => {
    if (userFilterText) {
      return (
        <React.Fragment>
          {usersWithFilter.map((user, index) => (
            <ChatItem
              key={index}
              onClick={() => navigateToDetail(user.userId)}
              title={user.name}
              description={user.email}
              image={user.photo}
            />
          ))}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {users.map((user, index) => (
          <ChatItem
            key={index}
            onClick={() => navigateToDetail(user.userId)}
            title={user.name}
            description={user.email}
            image={user.photo}
          />
        ))}
      </React.Fragment>
    );
  };

  React.useEffect(() => {
    getUsers();

    return () => handleUserFilter('');
  }, [handleUserFilter]);

  return (
    <PrivateContainer>
      <BaseContainer
        disableRightAction
        headerProps={{
          title: 'Search',
          theme: 'light',
          centerComponent: (
            <SearchInput
              value={userFilterText}
              onChange={e => handleUserFilter(e.target.value)}
            />
          ),
          disableShadow: true,
          onPressLeft: () => history.goBack()
        }}
      >
        <div className="SearchPage">{renderList()}</div>
      </BaseContainer>
    </PrivateContainer>
  );
};

const reduxState = state => ({
  users: usersSelector(state),
  usersWithFilter: usersSearchSelector(state),
  userFilterText: userFilterTextSelector(state)
});

const reduxDispatch = dispatch => ({
  handleUserFilter: value => dispatch(setUserFilter(value))
});

SearchPage.propTypes = {
  users: PropTypes.array,
  usersWithFilter: PropTypes.array,
  userFilterText: PropTypes.string,
  handleUserFilter: PropTypes.func
};

SearchPage.defaultProps = {
  users: [],
  usersWithFilter: [],
  userFilterText: '',
  handleUserFilter: () => {}
};

export default connect(reduxState, reduxDispatch)(SearchPage);
