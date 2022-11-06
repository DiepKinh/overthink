import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import {useDynamicStyleSheet, useDarkMode} from 'react-native-dark-mode';
import {useDispatch, useSelector} from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {ActionCreators} from '@actions';
import {bindActionCreators} from 'redux';
import {Constants} from '@common';
import {styles as dynamicStyles} from './style';
import LoadingProgress from '@components/LoadingProgress';
const {CLOSE_INTERVAL_ALERT_ERROR} = Constants;

const Login = props => {
  const {navigation} = props;
  const [isFocusUsername, setFocusUsername] = useState(false);
  const [isFocusPassword, setFocusPassword] = useState(false);
  const [username, setUsername] = useState('0326876983');
  const [password, setPassword] = useState('123456');
  const loginReducer = useSelector(state => state.userReducers.login);
  const dispatch = useDispatch();
  const styles = useDynamicStyleSheet(dynamicStyles);
  const isDarkMode = useDarkMode();
  const dropdownAlertRef = useRef('');
  const [isShowPass, setIsShowPass] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const bacsiReducers = useSelector(state => state.bacsiReducers.bacsis);
  const tableReducer = useSelector(state => state.tableReducers.table);

  const chuyenKhoaReducer = useSelector(
    state => state.chuyenKhoaReducers.chuyenkhoa,
  );
  const ipReducer = useSelector(state => state.ipReducers.ip);

  const allCategories = chuyenKhoaReducer.result;
  const allProducts = bacsiReducers.result;
  const allIp = ipReducer.result;

  useEffect(() => {
    checkLogin();
    return () => {
      // almost same as componentWillUnmount
    };
  }, [loginReducer]);

  const getData = function () {
    const {getTatCaBacSi, getAllChuyenKhoa, getAllStores, getAllTables} =
      ActionCreators;
    dispatch(getTatCaBacSi());

    dispatch(getAllChuyenKhoa());

    dispatch(getAllStores());

    dispatch(getAllTables());
  };

  const checkLogin = () => {
    if (loginReducer.requesting) {
      return;
    }

    if (
      loginReducer.status === 'success'
      //  ||
      // (loginReducer && loginReducer.result)
    ) {
      getData();
      setLoading(false);
      navigation.navigate('HomeScreen');
    } else if (loginReducer.status === 'error') {
      dropdownAlertRef.current.alertWithType(
        'error',
        'Error',
        loginReducer.error,
        {},
        CLOSE_INTERVAL_ALERT_ERROR,
      );
    }
  };

  const handleLogin = () => {
    setLoading(true);
    const {login} = ActionCreators;
    dispatch(login({username: username, password: password}));
    getData();
  };

  return (
    <KeyboardAwareScrollView enableResetScrollToCoords style={styles.container}>
      <Image
        source={require('../../../../assets/background/bg_login.png')}
        style={styles.imgBg}
      />
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={[styles.textWelcome, {fontWeight: '400'}]}>
            Chào mừng bạn đến với
          </Text>
          <Text style={[styles.textWelcome, {fontWeight: '700', fontSize: 35}]}>
            Doctor Health
          </Text>
        </View>
        <View style={styles.body}>
          <View style={{width: '90%'}}>
            <Text style={styles.lbLoginYourAccount}>
              Đăng nhập vào tài khoản của bạn
            </Text>
            <Text style={[styles.lbLoginYourAccount, {marginBottom: 20}]}>
              để tiếp tục:
            </Text>
          </View>
          <View style={styles.viewContainerInput}>
            <Text style={styles.txtLable}>Số điện thoại</Text>
            <View
              style={
                isFocusUsername ? styles.viewInputFocus : styles.viewInput
              }>
              <TextInput
                placeholderTextColor={'rgba(168, 167, 167, 0.7)'}
                style={styles.txtInput}
                placeholder="Nhập số điện thoại của bạn"
                value={username}
                onChangeText={text => setUsername(text)}
                autoCapitalize="none"
                onFocus={() => setFocusUsername(true)}
              />
            </View>
          </View>
          <View style={styles.viewContainerInput}>
            <Text style={styles.txtLable}>Mật khẩu</Text>
            <View
              style={
                isFocusPassword ? styles.viewInputFocus : styles.viewInput
              }>
              <TextInput
                placeholderTextColor={'rgba(168, 167, 167, 0.7)'}
                style={styles.txtInput}
                value={password}
                placeholder="Nhập vào mật khẩu của bạn"
                onChangeText={text => setPassword(text)}
                autoCapitalize="none"
                secureTextEntry={!isShowPass}
                onFocus={() => setFocusPassword(true)}
              />
              <TouchableOpacity
                style={styles.btnPass}
                onPress={e => {
                  setIsShowPass(!isShowPass);
                }}>
                <Image
                  resizeMode={'contain'}
                  source={
                    isShowPass === true
                      ? require('../../../../assets/icons/ic_eye.png')
                      : require('../../../../assets/icons/ic_close_eye.png')
                  }
                  style={styles.icShow}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.btnLogin}
            onPress={handleLogin}
            // onPress={() => navigation.navigate('HomeScreen')}
            disabled={loginReducer.requesting}>
            <Text style={styles.lbLogin}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegisterScreen')}
            style={styles.btnRegister}>
            <Text style={styles.txtRegister}>Chưa có tài khoản? </Text>
            <Text
              style={[
                styles.txtRegister,
                {color: '#5DC9BF', fontWeight: '700'},
              ]}>
              Đăng ký ngay
            </Text>
          </TouchableOpacity>
        </View>
        <DropdownAlert ref={dropdownAlertRef} updateStatusBar={false} />
      </View>
    </KeyboardAwareScrollView>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapDispatchToProps)(Login);
