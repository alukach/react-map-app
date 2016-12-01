import React, { PropTypes } from 'react';
import OAuth2               from './OAuth2';

export const styles = {
  button: {
    backgroundColor: 'steelblue'
  }
};

const Facebook = props => {
  const { config, textDisplay, style, callback } = props;
  let baseStyles = [styles.button];
  if (style) baseStyles.push(style);
  config.callback = callback;
  return (
    <OAuth2 {...config}>
      <button style={baseStyles}>{textDisplay}</button>
    </OAuth2>
  );
};

Facebook.defaultProps = {
  textDisplay: 'Sign in with Facebook'
};

Facebook.propTypes = {
  config     : PropTypes.object.isRequired,
  textDisplay: PropTypes.string,
  style      : PropTypes.object
};

export default Facebook;
