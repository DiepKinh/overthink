import {DynamicStyleSheet} from 'react-native-dark-mode';
import {ResponsiveUtils, ThemeUtils} from '@common';
import {pxToPercentage} from '@common/Size.ts';
import {Platform} from 'react-native';

export const styles = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    width: '100%',
    // height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBack: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8FB',
    borderRadius: 10,
    marginTop: Platform.OS === 'ios' ? 40 : 10,
    marginLeft: 10,
  },
  viewAvatar: {
    width: '100%',
    height: 350,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  imgDoctor: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  viewInfo: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtName: {
    fontSize: pxToPercentage(35),
    fontWeight: '700',
    color: 'black',
    alignSelf: 'flex-start',
  },
  txtAcademic: {
    fontSize: pxToPercentage(20),
    color: 'rgba(0, 0, 0, 0.59)',
    fontWeight: '500',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  viewSubInfo: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  viewSubInfoTop: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  titleSub: {
    fontSize: pxToPercentage(18),
    color: 'rgba(0, 0, 0, 0.59)',
  },
  valueTitleSub: {
    fontSize: pxToPercentage(20),
    color: 'rgba(0, 0, 0, 0.7)',
    fontWeight: '700',
  },
  viewSubInfoBot: {
    width: '100%',
  },
  txtTitleAbout: {
    fontSize: pxToPercentage(22),
    fontWeight: '700',
    color: 'black',
  },
  txtValueAbout: {
    fontSize: pxToPercentage(18),
    color: 'rgba(0, 0, 0, 0.59)',
  },
  viewBook: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  btnBook: {
    marginVertical: pxToPercentage(10),
    backgroundColor: 'rgba(7, 140, 128, 0.9)',
    alignItems: 'center',
    borderRadius: pxToPercentage(30),
    height: pxToPercentage(47),
    justifyContent: 'center',
    width: '100%',
  },
  lbBook: {
    color: 'white',
    fontSize: ResponsiveUtils.normalize(26),
    ...ThemeUtils.fontMaker({weight: '700'}),
    fontWeight: 'bold',
  },
  viewDatLich: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleDatLich: {
    color: 'rgba(7, 140, 128, 0.9)',
    alignSelf: 'center',
    fontWeight: '700',
    fontSize: 30,
    marginTop: 20,
  },
  viewBtnNumberUser: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 30,
    borderColor: '#505050',
    borderWidth: 0.5,
  },
  txtNumberUser: {
    fontWeight: '700',
  },
});
