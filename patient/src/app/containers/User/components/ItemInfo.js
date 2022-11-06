import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';

const ItemInfo = ({
  title,
  value,
  style,
  children,
  editable,
  autoFocus,
  setText,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View>
        <TextInput
          style={[styles.textInput, style]}
          value={value}
          editable={editable}
          autoFocus={autoFocus}
          onChangeText={text => setText(text)}
        />
        {children}
      </View>
    </View>
  );
};
export default ItemInfo;
const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
  },
  title: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  textInput: {
    position: 'relative',
    backgroundColor: '#F8F8FB',
    height: 50,
    borderRadius: 16,
    padding: 10,
    color: '#3A3C3F',
    fontSize: 14,
    fontWeight: '600',
  },
});
