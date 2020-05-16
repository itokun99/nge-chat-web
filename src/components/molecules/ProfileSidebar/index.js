import { React, PropTypes, connect } from 'libraries';
import { profileSelector } from 'modules';
import { Image, Skeleton } from 'components/atoms';

const ProfileSidebar = ({ profile }) => {
  const renderPhoto = () => {
    if (!profile) {
      return <Skeleton circle width={150} />;
    }

    return (
      <Image
        backgroundImage
        source={profile.photo}
        className="ProfileSidebar__photo"
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
