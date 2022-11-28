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
    paddingTop: Platform.OS === 'ios' ? 30 : 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    marginTop: 10,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  viewTxtHeader: {
    width: '70%',
  },
  buttonBack: {
    height: '100%',
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  txtUserName: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
  },
  txtWelcom: {
    color: '#000000',
    fontSize: 22,
    fontWeight: '600',
  },
  imgBg: {},
  body: {
    marginTop: -15,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  viewSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderRadius: pxToPercentage(30),
    paddingLeft: '3%',
    height: pxToPercentage(42),
    color: 'black',
    borderColor: '#E5E5E5',
    borderWidth: 1,
  },
  txtInputSearch: {
    width: '85%',
    color: '#000',
    borderRadius: pxToPercentage(25),
    fontSize: 14,
    marginLeft: 10,
  },
  titleDoctor: {
    width: '90%',
    fontSize: 30,
    fontWeight: '800',
    color: 'black',
    alignSelf: 'flex-start',
    marginVertical: 10,
  },
  btnCategory: {
    marginRight: 20,
  },
  textCategory: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    marginLeft: 10,
  },

  // Doctor Item
  itemContainer: {
    width: '100%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: 20,
  },
  viewImgDoctor: {
    width: '100%',
    height: '90%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imgItem: {
    width: 50,
    height: 50,
  },
  imgDoctor: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  viewInfoDoctor: {
    width: '100%',
    height: '40%',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtItemName: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
  },
  txtAcademic: {
    color: 'rgba(0, 0, 0, 0.59)',
    fontSize: 14,
    fontWeight: '500',
  },
  startRating: {
    marginTop: 10,
  },
  star: {
    flexDirection: 'row',
  },
  advertisement: {
    marginTop: 30,
    marginBottom: 20,
  },
  viewAdvertisementTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoAdvertisement: {
    width: 35,
    height: 35,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginRight: 10,
  },
  txtTitleAdvertisement: {
    color: '#2A333D',
    fontWeight: '700',
    fontSize: 16,
  },
  txtSubAdvertisement: {
    color: '#B9B6BA',
  },
  imgAdvertisement: {
    width: '100%',
  },

  //Menu Footer
  menuFooter: {
    paddingBottom: 12,
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 7,
      height: 10,
    },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  itemMenuFooterChoose: {
    height: 40,
    width: 60,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(7, 140, 128, 0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtMenuChoose: {
    color: 'rgba(7, 140, 128, 0.9)',
    fontWeight: '700',
    marginLeft: 3,
  },
  itemMenuFooter: {
    height: 40,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgMenuFooter: {
    height: 20,
    width: 20,
  },
  imgMenuFooter2: {
    height: 20,
  },
});
