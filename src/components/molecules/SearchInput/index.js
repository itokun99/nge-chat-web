import { React, PropTypes, MdSearch } from 'libraries';

const SearchInput = ({ value, onChange }) => (
  <div className="SearchInput">
    <input
      className="SearchInput__input"
      type="text"
      placeholder="Search..."
      value={value}
      onChange={onChange}
    />
  </div>
);

SearchInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

SearchInput.defaultProps = {
  value: '',
  onChange: () => {}
};

export default SearchInput;
