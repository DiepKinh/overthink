import React, {useState, useRef} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {useDynamicStyleSheet, useDarkMode} from 'react-native-dark-mode';
import {StackActions, NavigationActions} from 'react-navigation';
import DropdownAlert from 'react-native-dropdownalert';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import validator from 'validator';
import {useDispatch, useSelector} from 'react-redux';
import {Config, Constants} from '@common';
import SecureTextInput from '@components/SecureTextInput';
import TextInput from '@components/TextInput';
import UserServices from '@services/UserServices';
import {styles as dynamicStyles} from './style';
import {ActionCreators} from '@actions';

const {CLOSE_INTERVAL_ALERT_ERROR, CLOSE_INTERVAL_ALERT_SUCCESS} = Constants;

const Register = props => {
  const dispatch = useDispatch();
  const {navigation} = props;
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isFocusUsername, setFocusUsername] = useState(false);
  const [isFocusPassword, setFocusPassword] = useState(false);
  const [isFocusEmail, setFocusEmail] = useState(false);
  const [isFocusCofirmPassword, setFocusCofirmPassword] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowConfirmPass, setIsShowConfirmPass] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [confirm, setConfirm] = useState();
  const [lengthPass, setLenghtPass] = useState();

  const [userLenght, setUserLenght] = useState();
  const [numberLenght, setNumberLenght] = useState();

  const styles = useDynamicStyleSheet(dynamicStyles);
  const isDarkMode = useDarkMode();
  const dropdownAlertRef = useRef('');

  const loginReducer = useSelector(state => state.userReducers.register);

  // const handleChangePassword = async () => {
  //   try {
  //     if (
  //       validator.isEmpty(firstName.trim()) ||
  //       validator.isEmpty(lastName.trim()) ||
  //       validator.isEmpty(email.trim())
  //     ) {
  //       throw 'Please enter first name, last name and email.';
  //     }
  //     if (validator.isEmpty(password.trim())) {
  //       throw 'Password is required.';
  //     }
  //     if (!validator.isEmail(email.trim())) {
  //       throw 'Email is incorrect format.';
  //     }
  //     setRequesting(true);
  //     const params = {
  //       firstName: firstName.trim(),
  //       lastName: lastName.trim(),
  //       email: email.trim(),
  //       password: password.trim(),
  //     };
  //     await UserServices.register(params).then(() => {
  //       dropdownAlertRef.current.alertWithType(
  //         'success',
  //         'Success',
  //         'Your account is created.',
  //         {},
  //         CLOSE_INTERVAL_ALERT_SUCCESS,
  //       );
  //       setRequesting(false);
  //       goToLogin();
  //     });
  //   } catch (error) {
  //     dropdownAlertRef.current.alertWithType(
  //       'error',
  //       'Error',
  //       error,
  //       {},
  //       CLOSE_INTERVAL_ALERT_ERROR,
  //     );
  //     setRequesting(false);
  //   }
  // };
  const onConfirmPassword = text => {
    if (text === password) {
      setConfirm(true);
    } else {
      setConfirm(false);
    }
  };

  const onConfirm = text => {
    if (text.length > 7) {
      setLenghtPass(true);
    } else {
      setLenghtPass(false);
    }
  };

  const register = () => {
    if (username.length > 0) {
      setUserLenght(true);
      if (email.length > 0) {
        setNumberLenght(true);
        if (password.length > 5) {
          setLenghtPass(true);
          if (confirmPassword == password) {
            setConfirm(true);
            let body = {
              hoten: username,
              sodienthoai: email,
              matkhau: password,
            };
            dispatch(ActionCreators.register(body));
            if (loginReducer.status === 'success') {
              dropdownAlertRef.current.alertWithType(
                'success',
                'Success',
                loginReducer.result.message,
              );
              setTimeout(() => {
                navigation.navigate('LoginScreen');
              }, 2000);
            } else if (loginReducer.status === 'error') {
              dropdownAlertRef.current.alertWithType(
                'error',
                'Error',
                loginReducer.error,
              );
            }
          } else {
            setConfirm(false);
          }
        } else {
          setLenghtPass(false);
        }
      } else {
        setNumberLenght(false);
      }
    } else {
      setUserLenght(false);
    }
  };
  console.log('loginReducer==', loginReducer);

  const goToLogin = () => {
    setTimeout(() => {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'LoginScreen'})],
      });
      navigation.dispatch(resetAction);
    }, 1000);
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
            Overthink
          </Text>
        </View>
        <View style={styles.body}>
          <View style={{width: '90%'}}>
            <Text style={styles.lbLoginYourAccount}>Đăng ký tài khoản mới</Text>
            <Text style={[styles.lbLoginYourAccount, {marginBottom: 20}]}>
              để tiếp tục:
            </Text>
          </View>
          <View style={styles.viewContainerInput}>
            <Text style={styles.txtLable}>Tên đăng nhập</Text>
            {userLenght === false && (
              <Text style={styles.txtLableError}>
                Tên đăng nhập không được bỏ trống
              </Text>
            )}
            <View
              style={
                isFocusUsername ? styles.viewInputFocus : styles.viewInput
              }>
              <TextInput
                placeholderTextColor={'rgba(168, 167, 167, 0.7)'}
                style={styles.txtInput}
                placeholder="Nhập họ và tên của bạn"
                value={username}
                onChangeText={text => setUsername(text)}
                autoCapitalize="none"
                onFocus={() => setFocusUsername(true)}
              />
            </View>
          </View>
          <View style={styles.viewContainerInput}>
            <Text style={styles.txtLable}>Nhập email</Text>
            {numberLenght === false && (
              <Text style={styles.txtLableError}>
                Email không được bỏ trống
              </Text>
            )}
            <View
              style={isFocusEmail ? styles.viewInputFocus : styles.viewInput}>
              <TextInput
                placeholderTextColor={'rgba(168, 167, 167, 0.7)'}
                style={styles.txtInput}
                placeholder="Nhập email của bạn"
                value={email}
                onChangeText={text => setEmail(text)}
                autoCapitalize="none"
                onFocus={() => setFocusEmail(true)}
              />
            </View>
          </View>
          <View style={styles.viewContainerInput}>
            <Text style={styles.txtLable}>Mật khẩu</Text>
            {
              // (password.length > 1 && password.length < 6) ||
              lengthPass === false && (
                <Text style={styles.txtLableError}>
                  Mật khẩu phải sử dụng 8 ký tự trở lên
                </Text>
              )
            }
            <View
              style={
                isFocusPassword ? styles.viewInputFocus : styles.viewInput
              }>
              <TextInput
                placeholderTextColor={'rgba(168, 167, 167, 0.7)'}
                style={styles.txtInput}
                value={password}
                placeholder="Nhập mật khẩu của bạn"
                onChangeText={text => {
                  setPassword(text);
                  onConfirm(text);
                }}
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
          <View style={styles.viewContainerInput}>
            <Text style={styles.txtLable}>Xác nhận mật khẩu</Text>
            {confirm === false && (
              <Text style={styles.txtLableError}>
                Mật khẩu xác nhận không khớp
              </Text>
            )}

            <View
              style={
                isFocusCofirmPassword ? styles.viewInputFocus : styles.viewInput
              }>
              <TextInput
                placeholderTextColor={'rgba(168, 167, 167, 0.7)'}
                style={styles.txtInput}
                value={confirmPassword}
                placeholder="Nhập vào xác nhận mật khẩu"
                onChangeText={text => {
                  setConfirmPassword(text);
                  onConfirmPassword(text);
                }}
                autoCapitalize="none"
                secureTextEntry={!isShowConfirmPass}
                onFocus={() => setFocusCofirmPassword(true)}
              />
              <TouchableOpacity
                style={styles.btnPass}
                onPress={e => {
                  setIsShowConfirmPass(!isShowConfirmPass);
                }}>
                <Image
                  resizeMode={'contain'}
                  source={
                    isShowConfirmPass === true
                      ? require('../../../../assets/icons/ic_eye.png')
                      : require('../../../../assets/icons/ic_close_eye.png')
                  }
                  style={styles.icShow}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.btnLogin} onPress={() => register()}>
            <Text style={styles.lbLogin}>Đăng ký</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen')}
            style={styles.btnRegister}>
            <Text style={styles.txtRegister}>Đã có tài khoản? </Text>
            <Text
              style={[
                styles.txtRegister,
                {color: '#4E0EFF', fontWeight: '700'},
              ]}>
              Đăng nhập ngay
            </Text>
          </TouchableOpacity>
          <DropdownAlert ref={dropdownAlertRef} updateStatusBar={false} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
export default Register;
