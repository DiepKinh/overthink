import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useDynamicStyleSheet, useDarkMode} from 'react-native-dark-mode';
import {useDispatch, useSelector} from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {ActionCreators} from '@actions';
import {bindActionCreators} from 'redux';
import {Constants} from '@common';
import {styles as dynamicStyles, styles} from './style';
import LoadingProgress from '@components/LoadingProgress';
const {CLOSE_INTERVAL_ALERT_ERROR} = Constants;

const listCategory = ['ADIDAS', 'MEN', 'NIKE', 'VANS CONVERSE', 'WOMEN'];
const doctors = [
  {
    id: 1,
    name: 'phuong123',
    image: 'Anh3',
  },
  {
    id: 2,
    name: 'hieu123',
    image: 'Anh2',
  },
  {
    id: 3,
    name: 'khoa123',
    image: 'Anh1',
  },
];

const Home = props => {
  const {navigation} = props;
  const loginReducer = useSelector(state => state.userReducers.login);
  const dispatch = useDispatch();
  const styles = useDynamicStyleSheet(dynamicStyles);
  const isDarkMode = useDarkMode();

  const bacsiReducers = useSelector(state => state.bacsiReducers.bacsis);
  const bacsichuyenkhoaReducers = useSelector(
    state => state.bacsiReducers.bacsichuyenkhoa,
  );

  const chuyenKhoaReducer = useSelector(
    state => state.chuyenKhoaReducers.chuyenkhoa,
  );

  const allBacSi = bacsiReducers.result;
  const allChuyenKhoa = chuyenKhoaReducer.result;
  const userLogin = loginReducer.result;

  const [listBacSi, setListBacSi] = useState(allBacSi);

  useEffect(() => {
    getData();
  }, []);
  console.log('loginReducer', userLogin);

  const getData = function () {
    const {getTatCaBacSi, getAllChuyenKhoa} = ActionCreators;
    dispatch(getTatCaBacSi());
    dispatch(getAllChuyenKhoa());
  };

  const DoctorItem = doctor => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('BookScreen', {doctor: doctor})}>
        {doctor.anh != undefined && doctor.anh != '' ? (
          <View style={[styles.viewImgDoctor, {backgroundColor: '#E5E5E5'}]}>
            <Image
              style={styles.imgItem}
              source={require('../../../../assets/logo/Anh1.png')}
            />
            <Text style={styles.textCategory}>{doctor.name} </Text>
          </View>
        ) : (
          <View style={[styles.viewImgDoctor]}>
            <Image
              style={styles.imgItem}
              source={require('../../../../assets/logo/Anh1.png')}
            />
            <Text style={styles.textCategory}>{doctor.name} </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <>
      <View enableResetScrollToCoords style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.buttonBack}
              onPress={() => navigation.navigate('LoginScreen')}>
              <AntDesign name="arrowleft" size={22} color={'#000000'} />
            </TouchableOpacity>

            <Text style={styles.txtWelcom}>Chat</Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={{width: '90%'}}>
            <View style={styles.viewSearch}>
              <Feather name="search" size={22} color={'#888E9A'} />
              <TextInput
                placeholderTextColor={'rgba(168, 167, 167, 0.7)'}
                style={styles.txtInputSearch}
                placeholder="Search here..."
                autoCapitalize="none"
              />
            </View>
            <FlatList
              keyExtractor={(item, index) => item.id + index.toString()}
              style={{marginTop: 20}}
              data={doctors}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => DoctorItem(item)}
              scrollEnabled={false}
            />
          </View>
        </View>
      </View>
      <View style={styles.menuFooter}>
        <TouchableOpacity style={styles.itemMenuFooter}>
          <Image
            source={require('../../../../assets/logo/Menu1.png')}
            style={styles.imgMenuFooter}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemMenuFooterChoose}
          onPress={() => navigation.navigate('HomeScreen')}>
          <Image
            source={require('../../../../assets/logo/Menu2.png')}
            style={styles.imgMenuFooter2}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemMenuFooter}>
          <Image
            source={require('../../../../assets/logo/Menu3.png')}
            style={styles.imgMenuFooter}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemMenuFooter}>
          <Image
            source={require('../../../../assets/logo/Menu4.png')}
            style={styles.imgMenuFooter}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Home;
