import React, {useState, useEffect} from 'react';
import {
  Platform,
  TouchableOpacity,
  Image,
  View,
  Text,
  Alert,
  Modal,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {ResponsiveUtils, ThemeUtils, Utils, Constants} from '@common';
import {TextInput} from 'react-native-gesture-handler';
import I18n from '@common/I18n';
import {Select, Option} from 'react-native-chooser';

const AddPrinter = ({navigation}) => {
  const [name, setName] = useState('');
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [showModal, setShowModal] = useState(false);

  const data = [
    // {label: 'K80 (80mm)', value: 1},
    // {label: 'K90 (80mm)', value: 2},
    // {label: 'K180 (80mm)', value: 3},
    // {label: 'K280 (80mm)', value: 4},
  ];

  const onAddPrinter = function () {
    setShowModal(!showModal);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.viewLeft}>
          <View style={styles.viewInput}>
            <Text style={styles.txtTitle}> {'Tên máy in'}</Text>
            <TextInput
              value={name}
              onChangeText={text => setName(text)}
              style={styles.txtInput}
              placeholder={'Nhập tên máy in'}
              placeholderTextColor={'#ddd'}
            />
          </View>
          <View style={styles.viewInput}>
            <Text style={styles.txtTitle}> {'Loại khổ giấy'}</Text>
            <Select
              onSelect={(value, label) => {
                // setSlInputValue(label);
                // setSlInput(value);
              }}
              defaultText={'K80 (80mm)'}
              style={styles.viewBtn}
              indicator={'down'}
              indicatorColor={'#555555'}
              indicatorSize={8}
              transparent={true}
              textStyle={styles.txtBtnSl}
              backdropStyle={styles.viewBackR}
              optionListStyle={styles.viewPopUpSl}>
              {data.map(item => (
                <Option styleText={styles.txtPopupSl} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </View>
          <View style={styles.viewInput}>
            <Text style={styles.txtTitle}> {'Mẫu in'}</Text>
            <Select
              onSelect={(value, label) => {
                // setSlInputValue(label);
                // setSlInput(value);
              }}
              defaultText={'Mẫu in 1 '}
              style={styles.viewBtn}
              indicator={'down'}
              indicatorColor={'#555555'}
              indicatorSize={8}
              transparent={true}
              textStyle={styles.txtBtnSl}
              backdropStyle={styles.viewBackR}
              optionListStyle={styles.viewPopUpSl}>
              {data.map(item => (
                <Option styleText={styles.txtPopupSl} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </View>
        </View>
        <View style={styles.viewRight}>
          <View style={styles.viewInput}>
            <Text style={styles.txtTitle}> {'Port'}</Text>
            <TextInput
              value={port}
              onChangeText={text => setPort(text)}
              style={styles.txtInput}
              placeholder={'Nhập port'}
              placeholderTextColor={'#ddd'}
            />
          </View>
          <View style={styles.viewInput}>
            <Text style={styles.txtTitle}> {'Host'}</Text>
            <TextInput
              value={host}
              onChangeText={text => setHost(text)}
              style={styles.txtInput}
              placeholder={'Nhập host'}
              placeholderTextColor={'#ddd'}
            />
          </View>
          <View style={styles.viewZoom}>
            <View style={styles.viewInZoom}>
              <Text style={styles.txtMode}> {'Mẫu in'}</Text>
            </View>
            <View style={styles.viewListBtnZoom}>
              <TouchableOpacity style={styles.btnZoom1}>
                <Text style={styles.txtZoom}> {'-'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnZoom2}>
                <Text style={styles.txtZoom}> {'+'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.viewBottom}>
        <TouchableOpacity
          onPress={e => {
            onAddPrinter();
          }}
          style={styles.btnAdd}>
          <Text style={styles.txtAdd}> {'Thêm máy in'}</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="" transparent={true} visible={showModal}>
        <View style={styles.centeredView}>
          <View style={styles.viewModal}>
            <Text style={styles.txtTitleDiscount}>
              {'Thêm máy in thành công'}
            </Text>
            <TouchableOpacity
              style={styles.btnBack}
              onPress={e => {
                setShowModal(!showModal);
                // navigation.goBack();
                navigation.navigate('Printer', {
                  data: 'abjk',
                });
              }}>
              <Text style={styles.txtBack}>{'Quay lại'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  viewLeft: {
    width: '45%',
  },
  viewRight: {
    width: '45%',
  },
  viewContainer: {
    height: ResponsiveUtils.normalize(420),
    marginTop: '3%',
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  viewBottom: {
    height: ResponsiveUtils.normalize(120),
    width: '90%',
    alignSelf: 'center',
  },
  btnAdd: {
    marginRight: ResponsiveUtils.normalize(30),
    marginTop: ResponsiveUtils.normalize(20),
    alignSelf: 'flex-end',
    width: ResponsiveUtils.normalize(130),
    height: ResponsiveUtils.normalize(40),
    borderRadius: ResponsiveUtils.normalize(5),
    backgroundColor: '#F26F21',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtAdd: {
    color: '#FFF',
    fontSize: ResponsiveUtils.normalize(18),
    fontWeight: 'bold',
  },
  viewInput: {
    width: '100%',
  },
  txtTitle: {
    marginTop: ResponsiveUtils.normalize(10),
    fontWeight: '500',
    fontSize: ResponsiveUtils.normalize(18),
    color: '#000',
  },
  txtInput: {
    paddingLeft: ResponsiveUtils.normalize(10),
    marginTop: ResponsiveUtils.normalize(10),
    height: ResponsiveUtils.normalize(40),
    marginLeft: '5%',
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 5,
    width: '90%',
    backgroundColor: '#FFFFFF',
    fontSize: ResponsiveUtils.normalize(14),
  },
  viewZoom: {
    borderRadius: ResponsiveUtils.normalize(5),
    marginTop: ResponsiveUtils.normalize(25),
    backgroundColor: '#ddd',
    width: '95%',
    height: '50%',
    borderColor: '#444',
    borderWidth: 1,
  },
  btnZoom1: {
    width: ResponsiveUtils.normalize(30),
    height: ResponsiveUtils.normalize(30),
    borderBottomLeftRadius: ResponsiveUtils.normalize(5),
    borderTopLeftRadius: ResponsiveUtils.normalize(5),
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#F26F21',
  },
  btnZoom2: {
    marginLeft: 2,
    width: ResponsiveUtils.normalize(30),
    height: ResponsiveUtils.normalize(30),
    borderBottomRightRadius: ResponsiveUtils.normalize(5),
    borderTopRightRadius: ResponsiveUtils.normalize(5),
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#F26F21',
  },
  txtZoom: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: ResponsiveUtils.normalize(12),
  },
  viewListBtnZoom: {
    elevation: 99,
    position: 'absolute',
    flexDirection: 'row',
    bottom: ResponsiveUtils.normalize(15),
    right: ResponsiveUtils.normalize(30),
  },
  viewInZoom: {
    padding: ResponsiveUtils.normalize(15),
    height: '99.5%',
    width: '60%',
    backgroundColor: '#FFF',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 6,
  },
  txtMode: {
    color: '#000',
    fontSize: ResponsiveUtils.normalize(20),
    fontWeight: 'bold',
  },
  txtBtnSl: {
    color: '#000000',
  },
  viewBackR: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  viewPopUpSl: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderRadius: ResponsiveUtils.normalize(10),
    width: '60%',
  },
  txtPopupSl: {
    color: '#000000',
    textAlign: 'center',
  },
  viewBtn: {
    borderRadius: ResponsiveUtils.normalize(5),
    marginTop: ResponsiveUtils.normalize(10),
    height: ResponsiveUtils.normalize(40),
    marginLeft: '5%',
    borderWidth: 1,
    borderColor: '#444444',
    width: '90%',
    backgroundColor: '#FFFFFF',
    fontSize: ResponsiveUtils.normalize(14),
  },
  centeredView: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  viewModal: {
    backgroundColor: '#FFF',
    height: '40%',
    width: '50%',
    marginBottom: '10%',
    alignSelf: 'center',
    borderRadius: ResponsiveUtils.normalize(15),
    paddingTop: '5%',
    justifyContent: 'space-between',
  },
  viewHeaderDiscount: {
    paddingHorizontal: ResponsiveUtils.normalize(35),
    marginTop: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtTitleDiscount: {
    textAlign: 'center',
    fontSize: ResponsiveUtils.normalize(18),
    fontWeight: 'bold',
    color: '#000',
  },
  viewContainerDiscount: {
    marginTop: '1%',
    height: '80%',
  },
  btnBack: {
    backgroundColor: '#F26F21',
    justifyContent: 'center',
    alignItems: 'center',
    height: ResponsiveUtils.normalize(45),
    borderBottomLeftRadius: ResponsiveUtils.normalize(15),
    borderBottomRightRadius: ResponsiveUtils.normalize(15),
  },
  txtBack: {
    fontSize: ResponsiveUtils.normalize(16),
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default AddPrinter;
