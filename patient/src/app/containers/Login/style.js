import {DynamicStyleSheet} from 'react-native-dark-mode';
import {ResponsiveUtils, ThemeUtils} from '@common';
import {pxToPercentage} from '@common/Size.ts';

export const styles = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  imgBg: {
    position: 'relative',
    flex: 1,
    width: '100%',
    // height: '100%',
  },
  mainContainer: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 30,
  },
  header: {
    width: '90%',
    marginBottom: 30,
  },
  textWelcome: {
    color: 'white',
    fontSize: 30,
  },
  body: {
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    paddingTop: 20,
  },
  lbLoginYourAccount: {
    fontSize: pxToPercentage(18),
    color: '#000',
    fontWeight: 'bold',
  },
  viewContainerInput: {
    width: '90%',
    marginBottom: 20,
  },
  txtLable: {
    fontWeight: '600',
    color: '#A8A7A7',
    marginBottom: 5,
  },
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderRadius: pxToPercentage(10),
    paddingLeft: '3%',
    height: pxToPercentage(47),
    backgroundColor: '#fff',
    borderColor: 'rgba(168, 167, 167, 0.7)',
    borderWidth: 1,
    color: 'rgba(168, 167, 167, 0.7)',
  },
  viewInputFocus: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderRadius: pxToPercentage(10),
    paddingLeft: '3%',
    height: pxToPercentage(47),
    backgroundColor: '#F1FAF5',
    borderColor: '#4E0EFF',
    borderWidth: 1,
    color: 'black',
  },
  txtInput: {
    width: '85%',
    color: '#000',
    borderRadius: pxToPercentage(25),
    borderColor: '#4E0EFF',
  },
  icShow: {
    width: pxToPercentage(20),
    height: pxToPercentage(20),
  },
  btnLogin: {
    marginVertical: pxToPercentage(10),
    backgroundColor: '#4E0EFF',
    alignItems: 'center',
    borderRadius: pxToPercentage(10),
    height: pxToPercentage(47),
    justifyContent: 'center',
    width: '90%',
  },
  lbLogin: {
    color: 'white',
    fontSize: pxToPercentage(20),
    ...ThemeUtils.fontMaker({weight: '700'}),
    fontWeight: 'bold',
  },
  btnPass: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '10%',
    height: ResponsiveUtils.normalize(45),
  },
  btnRegister: {
    flexDirection: 'row',
    marginVertical: pxToPercentage(20),
    marginBottom: 30,
  },
  txtRegister: {
    color: '#3D3B3B',
  },
});
