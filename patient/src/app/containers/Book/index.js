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

  const listGio = [
    '7h - 9h',
    '9h - 11h',
    '11h - 13h',
    '13h - 15h',
    '15h - 17h',
    '17h - 19h',
    '19h - 21h',
    '21h - 23h',
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
    <KeyboardAwareScrollView enableResetScrollToCoords style={styles.container}>
      <TouchableOpacity
        style={styles.iconBack}
        onPress={() => navigation.goBack()}>
        <Ionicons
          name="chevron-back"
          color={'rgba(7, 140, 128, 0.9)'}
          size={30}
        />
      </TouchableOpacity>
      <View style={styles.mainContainer}>
        <View style={{width: '90%'}}>
          <View style={styles.viewAvatar}>
            {doctorCurrent.anh != undefined && doctorCurrent.anh != '' ? (
              <Image
                source={{uri: doctorCurrent.anh}}
                style={styles.imgDoctor}
              />
            ) : (
              <Image
                source={require('../../../../assets/background/avatarDefault.png')}
                style={styles.imgDoctor}
              />
            )}
          </View>
          <View style={styles.viewInfo}>
            <Text style={styles.txtName}>{doctorCurrent.hoten}</Text>
            <Text style={styles.txtAcademic}>{doctorCurrent.hochamhocvi}</Text>
            <Text style={styles.startRating}>{renderStar(doctorCurrent)}</Text>
            <View style={styles.viewSubInfo}>
              <View style={styles.viewSubInfoTop}>
                {/* <View style={{alignItems: 'center'}}>
                  <Text style={styles.titleSub}>Bệnh nhân</Text>
                  <Text style={styles.valueTitleSub}>
                    {doctorCurrent.sobenhnhan}
                  </Text>
                </View> */}

                <View style={{alignItems: 'center'}}>
                  <Text style={styles.titleSub}>Kinh nghiệm</Text>
                  <Text style={styles.valueTitleSub}>
                    {doctorCurrent.kinhnghiem}
                  </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.titleSub}>Chuyên khoa</Text>
                  <Text style={styles.valueTitleSub}>
                    {doctorCurrent.chuyenkhoa}
                  </Text>
                </View>
              </View>
              <View style={styles.viewSubInfoTop}>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.titleSub}>Chức vụ</Text>
                  <Text style={styles.valueTitleSub}>
                    {doctorCurrent.chucvu}
                  </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.titleSub}>Bệnh viện công tác</Text>
                  <Text style={styles.valueTitleSub}>
                    {doctorCurrent.benhviencongtac}
                  </Text>
                </View>
              </View>
              <View style={styles.viewSubInfoBot}>
                <Text style={styles.txtTitleAbout}>Địa chỉ phòng khám:</Text>
                <Text style={styles.txtValueAbout}>
                  {doctorCurrent.diachiphongkham}
                </Text>
              </View>
              <View style={styles.viewSubInfoBot}>
                <Text style={styles.txtTitleAbout}>Giới thiệu:</Text>
                <Text style={styles.txtValueAbout}>
                  {doctorCurrent.gioithieu}
                </Text>
              </View>
            </View>
            <DropdownAlert ref={dropdownAlertRef} updateStatusBar={false} />
          </View>
        </View>
      </View>

      <Text style={styles.titleDatLich}>Đặt lịch</Text>
      {/* <CalendarStrip
        datesBlacklist={datesBlacklistFunc}
        style={{height: 150, paddingTop: 20, paddingBottom: 10}}
      /> */}
      <CalendarStrip
        scrollable
        style={{height: 120, paddingTop: 20, paddingBottom: 10}}
        calendarColor={'rgba(7, 140, 128, 0.9)'}
        calendarHeaderStyle={{color: 'white'}}
        dateNumberStyle={{color: 'white'}}
        dateNameStyle={{color: 'white'}}
        iconContainer={{flex: 0.1}}
        onDateSelected={date => {
          setNgay(date);
          var doctor = {...doctorCurrent};
          dispatch(
            ActionCreators.getLichKhamTheoNgay(
              doctor,
              date,
              // moment(date).format('YYYY-MM-DD'),
            ),
          );
        }}
      />
      <FlatGrid
        itemDimension={100}
        data={listGio}
        fixed={true}
        keyExtractor={(item, index) => item}
        renderItem={item =>
          searchItem(item.item) ? (
            <TouchableOpacity
              onPress={() => {
                setGio(item.item);
                var doctor = {...doctorCurrent};
                console.log('doctorCurrent.mabacsi', ngay);
                console.log('doctorCurrent.mabacsi item.item', item.item);

                dispatch(
                  ActionCreators.getLichKhamTheoNgayGio(
                    doctor,
                    ngay,
                    String(item.item),
                  ),
                );
              }}
              style={[
                styles.viewBtnNumberUser,

                gio &&
                  item.item === gio && {
                    backgroundColor: 'rgba(7, 140, 128, 0.9)',
                    borderWidth: 0,
                  },
              ]}>
              <Text
                style={[
                  styles.txtNumberUser,
                  gio &&
                    item.item === gio && {
                      color: 'white',
                    },
                ]}>
                {item.item}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled
              style={[
                styles.viewBtnNumberUser,
                {
                  backgroundColor: '#E5E5E5',
                  borderWidth: 0.1,
                },
              ]}>
              <Text
                style={[
                  styles.txtNumberUser,
                  {
                    color: '#A5A5A5',
                  },
                ]}>
                {item.item}
              </Text>
            </TouchableOpacity>
          )
        }
      />

      <View style={styles.viewBook}>
        <TouchableOpacity
          style={styles.btnBook}
          onPress={() => handleDangKy()}
          disabled={loginReducer.requesting}>
          <Text style={styles.lbBook}>Đặt lịch hẹn</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Book;
