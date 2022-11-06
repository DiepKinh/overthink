import React from 'react';
import {User} from '@containers';

class UserScreen extends React.Component {
  render() {
    const {navigation} = this.props;
    return <User navigation={navigation} />;
  }
}

export default UserScreen;
