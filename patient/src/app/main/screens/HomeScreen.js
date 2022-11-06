import React from 'react';
import {Home} from '@containers';

class HomeScreen extends React.Component {
  render() {
    const {navigation} = this.props;
    return <Home navigation={navigation} />;
  }
}

export default HomeScreen;
