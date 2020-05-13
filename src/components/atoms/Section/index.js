import { React, PropTypes, useMemo } from 'libraries';

const Section = ({ id, children }) =>
  useMemo(
    () => (
      <section id={id} className="Section">
        {children}
      </section>
    ),
    [children, id]
  );

Section.propTypes = {
  children: PropTypes.any,
  id: PropTypes.string
};

Section.defaultProps = {
  id: null
};

export default Section;
