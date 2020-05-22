import { React, PropTypes, connect } from 'libraries';
import { profileSelector } from 'modules';
import { Image, Skeleton } from 'components/atoms';
import { getInitialName } from 'utils';

const ProfileSidebar = ({ profile }) => {
  const renderPhoto = () => {
    if (!profile) {
      return <Skeleton circle width={150} />;
    }

    if (!profile.photo) {
      const letterName = getInitialName(profile.name);
      return (
        <div className="ProfileSidebar__photo">
          <span className="ProfileSidebar__letterName">{letterName}</span>
        </div>
      );
    }

    return (
      <Image
        backgroundImage
        source={profile.photo}
        className="ProfileSidebar__photo"
        resizeMode="cover"
      />
    );
  };

  const renderTitle = () => {
    if (!profile) {
      return null;
    }

    return <span className="ProfileSidebar__title">{profile.name}</span>;
  };

  return (
    <div className="ProfileSidebar">
      {renderPhoto()}
      {renderTitle()}
    </div>
  );
};

const reduxState = state => ({
  profile: profileSelector(state)
});

ProfileSidebar.propTypes = {
  profile: PropTypes.object
};

ProfileSidebar.defaultProps = {
  profile: null
};

export default connect(reduxState)(ProfileSidebar);
