const activeConfig = 'dev';

const constants = {
  dev: {
    url: {
      api: '',
      assets: '',
      origin: ''
    },
    firebase: {
      apiKey: 'AIzaSyDH8TwVMO2lGuXH2oU4n0jO-i2yIrEu2o8',
      authDomain: 'nge-chat-c25cb.firebaseapp.com',
      databaseURL: 'https://nge-chat-c25cb.firebaseio.com',
      projectId: 'nge-chat-c25cb',
      storageBucket: 'nge-chat-c25cb.appspot.com',
      messagingSenderId: '923715867214',
      appId: '1:923715867214:web:275acb40e99d65c606a91f',
      measurementId: 'G-1ZS2Y1G6MF'
    },
    fcm: {
      key:
        'BEuNvZtdjVK0xKbZIOWnG_1wz4ReEDfwL6Ng3dMcMZLj4mGMMFsdkxaYazp_Xd1G3wtE4EwtzaCXGRA06I7AlAI'
    }
  },

  production: {
    url: {
      api: '',
      assets: '',
      origin: ''
    },
    firebase: {
      apiKey: 'AIzaSyDH8TwVMO2lGuXH2oU4n0jO-i2yIrEu2o8',
      authDomain: 'nge-chat-c25cb.firebaseapp.com',
      databaseURL: 'https://nge-chat-c25cb.firebaseio.com',
      projectId: 'nge-chat-c25cb',
      storageBucket: 'nge-chat-c25cb.appspot.com',
      messagingSenderId: '923715867214',
      appId: '1:923715867214:web:275acb40e99d65c606a91f',
      measurementId: 'G-1ZS2Y1G6MF'
    },
    fcm: {
      key:
        'BEuNvZtdjVK0xKbZIOWnG_1wz4ReEDfwL6Ng3dMcMZLj4mGMMFsdkxaYazp_Xd1G3wtE4EwtzaCXGRA06I7AlAI'
    }
  }
};

const appConfig = constants[activeConfig];

export default appConfig;
