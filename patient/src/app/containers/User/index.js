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
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ItemInfo from './components/ItemInfo';
import DatePicker from 'react-native-datepicker';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {ActionCreators} from '@actions';
import {bindActionCreators} from 'redux';
import {Constants} from '@common';
import {styles as dynamicStyles, styles} from './style';
import LoadingProgress from '@components/LoadingProgress';

const User = props => {
  const {navigation} = props;
  const loginReducer = useSelector(state => state.userReducers.login);
  const dispatch = useDispatch();
  const styles = useDynamicStyleSheet(dynamicStyles);
  const isDarkMode = useDarkMode();
  const [editable, setEditable] = useState(false);

  const [email, setEmail] = useState('');
  const [sdt, setSdt] = useState('');
  const [ngaySinh, setNgaySinh] = useState('');
  const [gioiTinh, setGioiTinh] = useState('');
  const [diaChi, setDiaChi] = useState('');

  const dropdownAlertRef = useRef('');

  const userLogin = loginReducer.result.data;

  useEffect(() => {
    userLogin.email && setEmail(userLogin.email);
    setSdt(userLogin.sodienthoai);
    userLogin.ngaysinh && setNgaySinh(userLogin.ngaysinh);
    userLogin.gioiTinh && setGioiTinh(userLogin.gioitinh);
    // userLogin.diaChi && setDiaChi(userLogin.diaChi);
  }, [userLogin]);

  const renderStar = doctor => {
    let listStar = [];
    for (let index = 1; index <= 5; index++) {
      const color = Math.round(doctor.rating) >= index ? '#EFB110' : '#989692';
      listStar.push(
        <View style={styles.star}>
          <Foundation key={doctor.index} name="star" size={16} color={color} />
          <Text style={{width: 10}}> </Text>
        </View>,
      );
    }
    return listStar;
  };

  const chinhSuaBenhNhan = () => {
    if (userLogin != undefined) {
      var lich = {
        ...userLogin,
        email,
        sdt,
        ngaySinh,
        gioiTinh,
        // diaChi,
      };
      console.log('=======', lich);
      dispatch(ActionCreators.chinhSuaBenhNhan(lich));

      dropdownAlertRef.current.alertWithType(
        'success',
        'Chỉng sữa thành công!',
      );
    } else {
      dropdownAlertRef.current.alertWithType(
        'error',
        'Hãy nhập lý do huỷ lich!',
      );
    }
  };
  const DoctorItem = doctor => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('BookScreen', {doctor: doctor})}>
        <Image source={{uri: doctor.image}} style={styles.imgDoctor} />
        <View style={styles.viewInfoDoctor}>
          <Text style={styles.txtItemName}>{doctor.name}</Text>
          <Text style={styles.txtAcademic}>{doctor.academic_title}</Text>
          <Text style={styles.startRating}> {renderStar(doctor)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const logout = () => {
    navigation.navigate('LoginScreen');
  };
  return (
    <>
      <KeyboardAwareScrollView
        enableResetScrollToCoords
        style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerButton}>
            <TouchableOpacity
              style={styles.iconBack}
              onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back"
                color={'rgba(7, 140, 128, 0.9)'}
                size={30}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => logout()}
              style={[styles.iconBack, {backgroundColor: 'red'}]}>
              <AntDesign name="logout" color={'white'} size={18} />
            </TouchableOpacity>
          </View>
          <View style={styles.avatar}>
            <View style={styles.img}>
              <Image
                source={{
                  uri: 'https://windows79.com/wp-content/uploads/2021/02/Thay-the-hinh-dai-dien-tai-khoan-nguoi-dung-mac.png',
                }}
                style={styles.imgAvatar}
              />
              <TouchableOpacity style={styles.iconPen}>
                <FontAwesome5
                  name="pen"
                  color={'rgba(7, 140, 128, 0.9)'}
                  size={18}
                />
              </TouchableOpacity>
              <Text style={styles.name}>{userLogin.hoten}</Text>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.info}>
            <ItemInfo
              title="Gmail"
              value={userLogin.email}
              editable={editable}
              autoFocus={editable ? true : false}
              style={editable && styles.txtInput}
              setText={setEmail}
            />
            <ItemInfo
              title="Số điện thoại"
              value={userLogin.sodienthoai}
              editable={editable}
              style={editable && styles.txtInput}
              setText={setSdt}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <ItemInfo
                editable={editable}
                title="Ngày sinh"
                value={userLogin.ngaysinh}
                style={[editable && styles.txtInput, {width: 160}]}
                setText={setNgaySinh}
              />
              {/* <DatePicker
                style={styles.datePickerStyle}
                date={userLogin.ngaysinh}
                mode="date"
                placeholder="select date"
                format="DD/MM/YYYY"
                minDate="01-01-1900"
                maxDate="01-01-2000"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    right: -5,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    borderColor: 'gray',
                    alignItems: 'flex-start',
                    borderWidth: 0,
                    borderBottomWidth: 1,
                  },
                  placeholderText: {
                    fontSize: 17,
                    color: 'gray',
                  },
                  dateText: {
                    fontSize: 17,
                  },
                }}
              /> */}
              <ItemInfo
                editable={editable}
                title="Giới tính"
                value={userLogin.gioitinh}
                style={[editable && styles.txtInput, {width: 160}]}
                setText={setGioiTinh}
              />
            </View>
            <ItemInfo
              title="Địa chỉ"
              value="12 Nguyễn Văn Bảo, F4, Gò Vấp"
              editable={editable}
              style={editable && styles.txtInput}>
              <TouchableOpacity style={styles.iconMap}>
                <Ionicons
                  name="map-sharp"
                  size={26}
                  color="rgba(231, 124, 124, 0.6)"
                />
              </TouchableOpacity>
            </ItemInfo>

            {editable ? (
              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.btnChange}
                  onPress={() => {
                    setEditable(false);
                    chinhSuaBenhNhan();
                  }}
                  disabled={loginReducer.requesting}>
                  <Text style={styles.lbChange}>Lưu thông tin cá nhân</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.btnChange}
                  onPress={() => setEditable(true)}
                  disabled={loginReducer.requesting}>
                  <Text style={styles.lbChange}>
                    Chỉnh sửa thông tin cá nhân
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.menuFooter}>
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeScreen')}
          style={styles.itemMenuFooter}>
          <Image
            source={require('../../../../assets/icons/home.png')}
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
          style={styles.itemMenuFooterChoose}>
          <FontAwesome
            name="user-circle-o"
            size={28}
            color={'rgba(7, 140, 128, 0.9)'}
          />
        </TouchableOpacity>
      </View>
      <DropdownAlert ref={dropdownAlertRef} updateStatusBar={false} />
    </>
  );
};

export default User;
