import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
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
import moment from 'moment';
import {Modal as Modals} from 'react-native-paper';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {ActionCreators} from '@actions';
import {bindActionCreators} from 'redux';
import {Constants} from '@common';
import {styles as dynamicStyles, styles} from './style';
import LoadingProgress from '@components/LoadingProgress';
const {CLOSE_INTERVAL_ALERT_ERROR} = Constants;
const listCategory = ['ADIDAS', 'MEN', 'NIKE', 'VANS CONVERSE', 'WOMEN'];

const List = props => {
  const {navigation} = props;
  const dropdownAlertRef = useRef('');

  const loginReducer = useSelector(state => state.userReducers.login);
  const listlichReducer = useSelector(state => state.lichReducers.lichbenhnhan);

  const dispatch = useDispatch();
  const styles = useDynamicStyleSheet(dynamicStyles);
  const isDarkMode = useDarkMode();

  const [modalHuy, setModalHuy] = useState(false);
  const [lichChonHuy, setLichChonHuy] = useState();
  const [lyDoHuy, setLyDoHuy] = useState('');

  const userLogin = loginReducer.result;
  const listLich = listlichReducer.result;

  useEffect(() => {
    getData();
  }, []);

  const getData = function () {
    const {getTatCaBacSi, getAllChuyenKhoa, getLichKhamBenhNhan} =
      ActionCreators;
    dispatch(getTatCaBacSi());
    dispatch(getAllChuyenKhoa());
    dispatch(getLichKhamBenhNhan(userLogin.data));
  };

  const handleHuyLich = () => {
    if (lyDoHuy.length > 0 != undefined) {
      var lich = {
        ...lichChonHuy,
        trangthai: 'Bệnh nhân đã huỷ lịch',
        lydohuy: lyDoHuy,
      };
      dispatch(ActionCreators.updateLichKham(lich));

      dropdownAlertRef.current.alertWithType('success', 'Huỷ lịch thành công!');
      setTimeout(() => {
        setModalHuy(!modalHuy);
        getData();
        navigation.navigate('ListScreen');
      }, 1000);
    } else {
      dropdownAlertRef.current.alertWithType(
        'error',
        'Hãy nhập lý do huỷ lich!',
      );
    }
  };

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
  const CalendarItem = item => {
    console.log(item);
    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          item.trangthai === 'Bác Sĩ đã xác nhận' && {
            backgroundColor: '#AADED9',
          },
          item.trangthai === 'Chờ Bác Sĩ xác nhận' && {
            backgroundColor: '#E5EEAE',
          },
          item.trangthai === 'Bác Sĩ đã huỷ lịch' && {
            backgroundColor: '#EEB9AE',
            borderWidth: 0,
          },
          item.trangthai === 'Bệnh nhân đã huỷ lịch' && {
            backgroundColor: '#EEB9AE',
            borderWidth: 0,
          },
        ]}>
        <View style={styles.viewInfoDoctor}>
          <Text style={styles.txtName}>{item.hotenbacsi}</Text>
          <Text style={styles.txtAddress}>{item.diachiphongkham}</Text>
        </View>
        <View style={styles.viewDay}>
          <Text style={styles.txtDay}>
            {moment(item.ngaykham).format('DD/MM/YYYY')}
          </Text>
        </View>
        <View style={styles.viewTime}>
          <Text style={styles.txtTime}>{item.giokham.slice(0, 3)}</Text>
          <Image
            source={require('../../../../assets/icons/lineList.png')}
            style={styles.imgLine}
          />
          <Text style={styles.txtTime}>{item.giokham.slice(5, 10)}</Text>
        </View>
        <View style={styles.viewStatus}>
          <Text style={styles.txtStatus}>
            Trạng thái:{' '}
            <Text style={[styles.txtStatus, {color: 'rgba(7, 140, 128, 0.9)'}]}>
              {item.trangthai}
            </Text>
          </Text>
        </View>
        <View style={styles.viewPrice}>
          {item.trangthai != 'Bác Sĩ đã huỷ lịch' &&
            item.trangthai != 'Bệnh nhân đã huỷ lịch' && (
              <TouchableOpacity
                style={styles.btnHuy}
                onPress={() => {
                  setModalHuy(!modalHuy);
                  setLichChonHuy(item);
                }}>
                <Text style={styles.txtHuy}>Huỷ lịch</Text>
              </TouchableOpacity>
            )}
          {item.trangthai != 'Bác Sĩ đã huỷ lịch' &&
            item.trangthai != 'Bệnh nhân đã huỷ lịch' && (
              <Text style={styles.txtPrice}>{item.dongia} VND</Text>
            )}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <KeyboardAwareScrollView
        enableResetScrollToCoords
        style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.body}>
            <TouchableOpacity
              style={styles.iconBack}
              onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back"
                color={'rgba(7, 140, 128, 0.9)'}
                size={30}
              />
            </TouchableOpacity>
            <Text style={styles.txtTitleList}>Danh sách lịch khám đã đặt</Text>
            <ScrollView
              style={{marginTop: 20}}
              showsVerticalScrollIndicator={false}>
              {listLich != null &&
                listLich != undefined &&
                listLich.map(item => CalendarItem(item))}
            </ScrollView>
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
          style={styles.itemMenuFooterChoose}>
          <FontAwesome5
            name="clipboard-list"
            size={28}
            color={'rgba(7, 140, 128, 0.9)'}
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
      <DropdownAlert ref={dropdownAlertRef} updateStatusBar={false} />
      <Modals
        style={{
          width: '90%',
          height: '80%',
          alignSelf: 'center',
          marginTop: '8%',
          marginLeft: '5%',
        }}
        animationType=""
        transparent={true}
        visible={modalHuy}
        onDismiss={e => {
          setModalHuy(!modalHuy);
        }}>
        <KeyboardAwareScrollView enableResetScrollToCoords>
          <View style={styles.centeredViewHuy}>
            <View style={styles.viewContainerModal}>
              <Text style={[styles.txtTitle, {color: 'red'}]}>
                Xác nhận huỷ lich
              </Text>
              <Text style={[styles.txtTitle, {fontSize: 12}]}>
                Giờ: {lichChonHuy && lichChonHuy.giokham} --- Ngày:{' '}
                {lichChonHuy && lichChonHuy.ngaykham}
              </Text>
              <View style={styles.viewInput}>
                <Text style={[styles.txtTitle, {fontSize: 16}]}>
                  Lý do huỷ lich:
                </Text>
                <TextInput
                  style={styles.txtInput}
                  autoFocus
                  onChangeText={text => setLyDoHuy(text)}
                />
              </View>

              <View style={styles.viewButtonModal}>
                <TouchableOpacity
                  onPress={() => setModalHuy(!modalHuy)}
                  style={[styles.button]}>
                  <Text style={styles.txtButton}>Huỷ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: 'red'}]}
                  onPress={() => handleHuyLich()}>
                  <Text style={styles.txtButton}>Xác nhận</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Modals>
    </>
  );
};

export default List;
