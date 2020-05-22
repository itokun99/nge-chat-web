import { React, useHistory, connect, PropTypes } from 'libraries';
import { BaseContainer, PrivateContainer } from 'containers';
import { SearchInput, ChatItem, Skeleton } from 'components';
import { getUsers, showPopup } from 'services';
import { createMessageFirebase } from 'utils';
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
  const [loading, setLoading] = React.useState(true);
  const history = useHistory();

  const navigateToDetail = userId => {
    history.push(`/user/${userId}`);
  };

  const initData = React.useCallback(async () => {
    try {
      setLoading(true);
      await getUsers();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      showPopup({
        title: 'Terjadi Kesalahan!',
        description: createMessageFirebase(),
        onClickButton: initData
      });
      throw err;
    }
  }, []);

  const renderList = () => {
    if (loading) {
      return [1, 2, 3].map(val => (
        <div
          key={val}
          style={{
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            marginBottom: 24
          }}
        >
          <Skeleton radius={8} width={50} circle style={{ marginRight: 16 }} />
          <div>
            <Skeleton
              radius={8}
              width={200}
              height={18}
              style={{ marginBottom: 8 }}
            />
            <Skeleton radius={8} width={100} height={12} />
          </div>
        </div>
      ));
    }

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
    initData();

    return () => handleUserFilter('');
  }, [handleUserFilter, initData]);

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
