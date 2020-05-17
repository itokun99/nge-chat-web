import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import axios from 'axios';
import thunk from 'redux-thunk';
import firebase from 'firebase';
import cx from 'classnames';

import {
  MdArrowBack,
  MdClose,
  MdArrowForward,
  MdArrowUpward,
  MdCheck,
  MdMenu,
  MdHome,
  MdContacts,
  MdChatBubble,
  MdSettings,
  MdError,
  MdAccountCircle,
  MdHelp
} from 'react-icons/md';

export {
  cx,
  React,
  ReactDOM,
  PropTypes,
  moment,
  axios,
  thunk,
  MdArrowBack,
  MdClose,
  MdArrowForward,
  MdSettings,
  MdArrowUpward,
  MdAccountCircle,
  MdError,
  MdHome,
  MdChatBubble,
  MdContacts,
  MdCheck,
  firebase,
  MdMenu,
  MdHelp
};

export * from 'react';
export * from 'react-router-dom';
export * from 'react-router-transition';
export * from 'redux';
export * from 'react-redux';
export * from 'redux-devtools-extension';
