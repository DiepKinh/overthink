import React from 'react';
import {Book} from '@containers';

class BookScreen extends React.Component {
  render() {
    const {navigation} = this.props;
    return <Book navigation={navigation} />;
  }
}

export default BookScreen;
