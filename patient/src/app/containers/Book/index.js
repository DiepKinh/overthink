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
import AntDesign from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {ActionCreators} from '@actions';
import {bindActionCreators} from 'redux';
import {Constants} from '@common';
import {styles as dynamicStyles, styles} from './style';
import LoadingProgress from '@components/LoadingProgress';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CalendarStrip from 'react-native-calendar-strip';
import {FlatGrid} from 'react-native-super-grid';
import moment from 'moment';

const Book = props => {
  const {navigation} = props;
  const loginReducer = useSelector(state => state.userReducers.login);
  const dispatch = useDispatch();
  const dropdownAlertRef = useRef('');

  const [ngay, setNgay] = useState('');
  const [gio, setGio] = useState('');
  const [listGioKham, setListGioKham] = useState([]);
  const styles = useDynamicStyleSheet(dynamicStyles);
  const isDarkMode = useDarkMode();
  const [doctorCurrent, setDoctorCurrent] = useState(
    navigation.state.params.doctor,
  );

  const lichReducer = useSelector(state => state.lichReducers.lich);
  const gioReducer = useSelector(state => state.lichReducers.gio);
  const lichkhamReducer = useSelector(state => state.lichReducers.lichkham);
  const updatelichkhamReducer = useSelector(
    state => state.lichReducers.updateLichKham,
  );

  const bacsiReducers = useSelector(state => state.bacsiReducers.bacsis);
  const chuyenKhoaReducer = useSelector(
    state => state.chuyenKhoaReducers.chuyenkhoa,
  );
  const allBacSi = bacsiReducers.result;
  const allChuyenKhoa = chuyenKhoaReducer.result;
  const allLichKham = lichReducer.result;
  const allGioKhamTheoNgay = gioReducer.result;
  const lichkham = lichkhamReducer.result;
  const userLogin = loginReducer.result;

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    var gio = allGioKhamTheoNgay.map(i => {
      return i.giokham;
    });
    setListGioKham(gio);
  }, [gioReducer]);

  const getData = function () {
    const {getTatCaBacSi, getAllChuyenKhoa, getLichKham} = ActionCreators;
    dispatch(getTatCaBacSi());
    dispatch(getAllChuyenKhoa());
    var doctor = {...doctorCurrent};
    dispatch(getLichKham(doctor));
    // dispatch(getLichKham());
  };

  const searchItem = item => {
    if (listGioKham != undefined) {
      let product = listGioKham.find(pro => pro == item);
      return product;
    }
  };
  const datesBlacklistFunc = date => {
    // return date.isoWeekday() === 1; // disable Saturdays
  };

  const handleDangKy = () => {
    console.log('====ngay====', ngay);
    console.log('====gio====', gio);

    if (ngay != undefined && gio != undefined && ngay != '' && gio != '') {
      var body = {...lichkham[0]};
      var _body = {
        ...body,
        mabenhnhan: userLogin.data.mabenhnhan,
        hotenbenhnhan: userLogin.data.hoten,
        trangthai: 'Chờ Bác Sĩ xác nhận',
      };
      console.log('====body====', _body);

      dispatch(ActionCreators.updateLichKham(_body));

      // if (updatelichkhamReducer.status === 'success') {
      dropdownAlertRef.current.alertWithType(
        'success',
        'Đăng ký lịch thành công!',
      );
      setTimeout(() => {
        navigation.navigate('ListScreen');
      }, 2000);
      // } else if (updatelichkhamReducer.status === 'error') {
      //   dropdownAlertRef.current.alertWithType(
      //     'error',
      //     'Error',
      //     updatelichkhamReducer.error,
      //   );
      // }
    } else {
      dropdownAlertRef.current.alertWithType(
        'error',
        'Lỗi',
        'Bạn chưa chọn lịch đăng ký',
      );
    }
  };
  console.log('====updatelichkhamReducer====', updatelichkhamReducer);

  const messages = [
    {
      id: 1,
      message: 'Are you still travelling?',
      fromSelf: false,
    },
    {
      id: 2,
      message: 'Yes, i’m at Istanbul.. ',
      fromSelf: true,
    },
    {
      id: 3,
      message: 'OoOo, Thats so Cool! ',
      fromSelf: false,
    },
    {
      id: 4,
      message: 'Raining??',
      fromSelf: false,
    },
  ];
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
  return (
    <>
      <KeyboardAwareScrollView
        enableResetScrollToCoords
        style={styles.container}>
        <View style={styles.mainContainerHeader}>
          <View style={styles.headerContainer}>
            <View style={styles.headerContainerLeft}>
              <TouchableOpacity
                style={styles.buttonBack}
                onPress={() => navigation.navigate('HomeScreen')}>
                <AntDesign name="arrowleft" size={22} color={'#000000'} />
              </TouchableOpacity>
              <Image
                style={styles.imgItem}
                source={require('../../../../assets/logo/AnhDefault.webp')}
              />
              <View style={styles.viewNameChat}>
                <Text style={styles.txtWelcom}>phuong123</Text>
                <Image
                  style={styles.imgActive}
                  source={require('../../../../assets/logo/Active.png')}
                />
              </View>
            </View>

            <Image
              style={styles.imgCall}
              source={require('../../../../assets/logo/Call.png')}
            />
            <Image
              style={styles.imgVideo}
              source={require('../../../../assets/logo/Video.png')}
            />
          </View>
        </View>
        <View style={styles.mainContainer}>
          {messages.map(message => {
            return (
              <View>
                <View
                  className={`message ${
                    message.fromSelf ? 'sended' : 'recieved'
                  }`}>
                  {message.fromSelf ? (
                    <View style={styles.messageSend}>
                      <View style={styles.messageSendDetail}>
                        <Text style={styles.txtMessageSend}>
                          {message.message}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.messageRecieved}>
                      <View style={styles.messageRecievedDetail}>
                        <Text style={styles.txtMessageRecieved}>
                          {message.message}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.menuFooter}>
        <View style={styles.viewSearch}>
          <TextInput
            placeholderTextColor={'rgba(168, 167, 167, 0.7)'}
            style={styles.txtInputSearch}
            placeholder="Send Message"
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.buttonBack}
            onPress={() => navigation.navigate('LoginScreen')}>
            <Image
              style={styles.imgVideo}
              source={require('../../../../assets/logo/Send.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Book;
