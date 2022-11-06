import {DynamicStyleSheet} from 'react-native-dark-mode';
import {ResponsiveUtils, ThemeUtils} from '@common';
import {pxToPercentage} from '@common/Size.ts';
import {Platform} from 'react-native';

export const styles = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
  },
  mainContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    width: '90%',
  },
  iconBack: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8FB',
    borderRadius: 10,
    marginBottom: 10,
  },
  txtTitleList: {
    fontSize: 22,
    fontWeight: '700',
    color: 'black',
  },
  // CalendarItem
  itemContainer: {
    backgroundColor: '#F5F5F5',
    marginBottom: 20,
    height: 180,
    width: '100%',
    borderRadius: 10,
    borderColor: 'rgba(7, 140, 128, 0.9)',
    borderWidth: 2,
    padding: 10,
  },
  txtName: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
  },
  txtAddress: {
    fontSize: 12,
    color: '#7F7F7F',
  },
  viewDay: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  txtDay: {
    fontSize: 16,
    color: '#7F7F7F',
    fontWeight: '500',
  },
  viewTime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtTime: {
    fontSize: 18,
    color: '#333333',
    fontWeight: '700',
  },
  viewStatus: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtStatus: {
    fontSize: 16,
    color: '#7F7F7F',
    fontWeight: '500',
  },
  viewPrice: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
    alignSelf: 'flex-end',
  },
  btnHuy: {
    height: 30,
    width: 75,
    backgroundColor: 'red',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtHuy: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '700',
  },
  txtPrice: {
    marginTop: 5,
    fontSize: 16,
    color: '#6760D4',
    fontWeight: '700',
  },
  //Menu Footer
  menuFooter: {
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
    width: 100,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(7, 140, 128, 0.9)',
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
    width: 100,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(168, 167, 167, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgMenuFooter: {
    height: 30,
    width: 30,
  },

  centeredViewHuy: {
    height: 210,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  viewContainerModal: {
    width: '90%',
    alignItems: 'center',
  },
  txtTitle: {
    color: '#07A798',
    fontWeight: '700',
    fontSize: 26,
  },
  viewButtonModal: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    backgroundColor: '#07A798',
    height: 40,
    width: 120,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtButton: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  txtInput: {
    height: 50,
    width: '100%',
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    borderColor: '#7F7F7F',
    borderWidth: 0.5,
    color: '#07A798',
  },
  viewInput: {
    width: '100%',
    marginTop: 10,
  },
});
