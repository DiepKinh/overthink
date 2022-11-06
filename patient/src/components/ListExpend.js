// Import React
import React, {useEffect, useState} from 'react';
// Import required components
import {
  SafeAreaView,
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Colors from '@common/Colors';

const ExpandableComponent = ({item, onClickFunction}) => {
  //Custom Component for the Expandable List
  const [layoutHeight, setLayoutHeight] = useState(0);

  useEffect(() => {
    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickFunction}
        style={styles.header}>
        <Text style={styles.headerText}>{item.name}</Text>
      </TouchableOpacity>
      <View
        style={{
          height: layoutHeight,
        }}>
        {item.children_category &&
          item.children_category.map((item, key) => (
            <TouchableOpacity
              key={key}
              style={styles.content}
              onPress={e => {}}>
              <Text style={styles.text}>
                {key}. {item.name}
              </Text>
              <View style={styles.separator} />
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

const ListExpend = ({data, title}) => {
  const [listDataSource, setListDataSource] = useState(data);
  const [multiSelect, setMultiSelect] = useState(false);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const updateLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];
    if (multiSelect) {
      // If multiple select is enabled
      array[index]['isExpanded'] = !array[index]['isExpanded'];
    } else {
      // If single select is enabled
      array.map((value, placeindex) =>
        placeindex === index
          ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded'])
          : (array[placeindex]['isExpanded'] = false),
      );
    }
    setListDataSource(array);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.viewContainer}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <ScrollView>
          {listDataSource.map((item, key) => (
            <ExpandableComponent
              key={item.category_name}
              onClickFunction={() => {
                updateLayout(key);
              }}
              item={item}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ListExpend;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  titleText: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 20,
    borderColor: Colors.primaryColor.light,
    borderWidth: 1,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#808080',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    padding: 10,
    color: 'black',
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    height: 40,
  },
});
