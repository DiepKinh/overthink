import React from 'react';
import {List} from '@containers';

class ListScreen extends React.Component {
  render() {
    const {navigation} = this.props;
    return <List navigation={navigation} />;
  }
}

export default ListScreen;
