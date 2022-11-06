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
    name: 'Lê Ngọc Ánh',
    academic_title: 'Thạc Sĩ, Bác Sĩ',
    position: 'Trưởng khoa Nhi Bênh Viện Nhi Đồng',
    category: 'ADIDAS',
    price: 350,
    patients: 100,
    experience: ' 5 năm',
    rating: 5.0,
    description:
      'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
    calender: [
      {'15/03/2022': ['7h - 9h', '9h - 11h']},
      {'16/03/2022': ['7h - 9h', '9h - 11h']},
      {'17/03/2022': ['13h - 15h', '15h - 17h']},
      {'18/03/2022': ['7h - 9h', '9h - 11h']},
      {'19/03/2022': ['7h - 9h', '9h - 11h']},
      {'20/03/2022': ['7h - 9h', '9h - 11h', '15h - 17h']},
      {'21/03/2022': ['13h - 15h', '15h - 17h']},
    ],
    image:
      'https://taimuihongsg.com/wp-content/uploads/2018/05/Le-Thi-Bich-Thoa-01.jpg',
  },
  {
    id: 2,
    name: 'Trần Minh Tuấn',
    academic_title: 'Thạc Sĩ, Bác Sĩ',
    position: 'Trưởng khoa Nhi Bênh Viện Nhi Đồng',
    category: 'ADIDAS',
    price: 350,
    patients: 100,
    experience: ' 5 năm',
    rating: 4.2,
    description:
      'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
    calender: [
      {'15/03/2022': ['7h - 9h', '9h - 11h']},
      {'16/03/2022': ['7h - 9h', '9h - 11h']},
      {'17/03/2022': ['13h - 15h', '15h - 17h']},
      {'18/03/2022': ['7h - 9h', '9h - 11h']},
      {'19/03/2022': ['7h - 9h', '9h - 11h']},
      {'20/03/2022': ['7h - 9h', '9h - 11h', '15h - 17h']},
      {'21/03/2022': ['13h - 15h', '15h - 17h']},
    ],
    image:
      'https://taimuihongsg.com/wp-content/uploads/2019/01/Trinh-Tan-Lap-01.jpg',
  },
  {
    id: 3,
    name: 'Nguyễn Thanh Tú',
    academic_title: 'Thạc Sĩ, Bác Sĩ',
    position: 'Trưởng khoa Nhi Bênh Viện Nhi Đồng',
    category: 'ADIDAS',
    price: 350,
    patients: 100,
    experience: ' 5 năm',
    rating: 4.0,
    description:
      'The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n',
    calender: [
      {'15/03/2022': ['7h - 9h', '9h - 11h']},
      {'16/03/2022': ['7h - 9h', '9h - 11h']},
      {'17/03/2022': ['13h - 15h', '15h - 17h']},
      {'18/03/2022': ['7h - 9h', '9h - 11h']},
      {'19/03/2022': ['7h - 9h', '9h - 11h']},
      {'20/03/2022': ['7h - 9h', '9h - 11h', '15h - 17h']},
      {'21/03/2022': ['13h - 15h', '15h - 17h']},
    ],
    image:
      'https://taimuihongsg.com/wp-content/uploads/2018/05/Kim-Bun-ThuongE-01.jpg',
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

  const renderStar = doctor => {
    let listStar = [];
    for (let index = 1; index <= 5; index++) {
      const color = Math.round(doctor.danhgia) >= index ? '#EFB110' : '#989692';
      listStar.push(
        <View style={styles.star}>
          <Foundation key={doctor.index} name="star" size={16} color={color} />
          <Text style={{width: 10}}> </Text>
        </View>,
      );
    }
    return listStar;
  };
  const DoctorItem = doctor => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('BookScreen', {doctor: doctor})}>
        {doctor.anh != undefined && doctor.anh != '' ? (
          <View style={[styles.viewImgDoctor, {backgroundColor: '#E5E5E5'}]}>
            <Image source={{uri: doctor.anh}} style={styles.imgDoctor} />
          </View>
        ) : (
          <View style={[styles.viewImgDoctor, {backgroundColor: '#E5E5E5'}]}>
            <Image
              source={require('../../../../assets/background/avatarDefault.png')}
            />
          </View>
        )}
        <View style={styles.viewInfoDoctor}>
          <Text style={styles.txtItemName}>{doctor.hoten}</Text>
          <Text style={styles.txtAcademic}>{doctor.hochamhocvi}</Text>
          <Text style={styles.startRating}> {renderStar(doctor)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const clickChuyenKHoa = chuyenkhoa => {
    const {getBacSiTheoChuyenKhoa} = ActionCreators;
    dispatch(getBacSiTheoChuyenKhoa(chuyenkhoa));
    const bacSiChuyenKhoa = bacsichuyenkhoaReducers.result;
    console.log('bacSiChuyenKhoa', bacSiChuyenKhoa);
    setListBacSi(bacSiChuyenKhoa);
  };
  return (
    <>
      <KeyboardAwareScrollView
        enableResetScrollToCoords
        style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.viewTxtHeader}>
              <Text style={styles.txtUserName}>
                Xin chào, {userLogin.data.hoten}
              </Text>
              <Text style={styles.txtWelcom}>
                Hãy kiểm tra lịch khám của bạn đã được xác nhận chưa nhé!
              </Text>
            </View>
            <Image
              source={require('../../../../assets/background/imgHeaderHome.png')}
              style={styles.imgBg}
            />
          </View>
        </View>
        <View style={styles.body}>
          <View style={{width: '90%'}}>
            <View style={styles.viewSearch}>
              <Feather name="search" size={28} color={'#888E9A'} />
              <TextInput
                placeholderTextColor={'rgba(168, 167, 167, 0.7)'}
                style={styles.txtInputSearch}
                // value={password}
                placeholder="Tìm kiếm Bác Sĩ..."
                // onChangeText={text => setPassword(text)}
                autoCapitalize="none"
                // secureTextEntry={!isShowPass}
                // onFocus={() => setFocusPassword(true)}s
              />
            </View>
            <Text style={styles.titleDoctor}>Bác Sĩ</Text>
            <FlatList
              data={allChuyenKhoa}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.btnCategory}
                  onPress={() => clickChuyenKHoa(item)}>
                  <Text style={styles.textCategory}>{item.tenchuyenkhoa}</Text>
                </TouchableOpacity>
              )}
              // ItemSeparatorComponent={() => <View style={{height: 70}} />}
              // contentContainerStyle={{paddingBottom: 100}}
            />
            <FlatList
              style={{marginTop: 20}}
              data={listBacSi}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => DoctorItem(item)}
            />
            <View style={styles.advertisement}>
              <View style={styles.viewAdvertisementTitle}>
                <View style={styles.infoAdvertisement}>
                  <MaterialIcons
                    name="info-outline"
                    size={28}
                    color={'rgba(7, 140, 128, 0.9)'}
                  />
                </View>
                <View>
                  <Text style={styles.txtTitleAdvertisement}>
                    About Health Doctor
                  </Text>
                  <Text style={styles.txtSubAdvertisement}>
                    Education about Health Doctor
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <Image
                  source={require('../../../../assets/background/imgAdvertisement.png')}
                  style={styles.imgAdvertisement}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.menuFooter}>
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeScreen')}
          style={styles.itemMenuFooterChoose}>
          <Image
            source={require('../../../../assets/icons/home_choose.png')}
            style={styles.imgMenuFooter}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ListScreen')}
          style={styles.itemMenuFooter}>
          <FontAwesome5
            name="clipboard-list"
            size={28}
            color={'rgba(168, 167, 167, 0.5)'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('UserScreen')}
          style={styles.itemMenuFooter}>
          <FontAwesome
            name="user-circle-o"
            size={28}
            color={'rgba(168, 167, 167, 0.5)'}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Home;
