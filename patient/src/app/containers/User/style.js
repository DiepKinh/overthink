import {DynamicStyleSheet} from 'react-native-dark-mode';
import {ResponsiveUtils, ThemeUtils} from '@common';
import {pxToPercentage} from '@common/Size.ts';
import {Platform} from 'react-native';

export const styles = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: Platform.OS === 'ios' ? 180 : 150,
    paddingHorizontal: 10,
    position: 'relative',
    borderBottomStartRadius: 60,
    borderBottomEndRadius: 60,

    backgroundColor: 'white',
    shadowColor: 'rgba(7, 140, 128, 0.9)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.0,

    elevation: 30,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
  },
  headerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '96%',
  },
  iconBack: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8FB',
    borderRadius: 10,
  },
  content: {
    marginTop: 100,
  },
  avatar: {},
  headerAvatar: {
    height: 120,
  },
  imgAvatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderColor: 'rgba(7, 140, 128, 0.9)',
    borderWidth: 1,
  },
  img: {
    position: 'absolute',
    left: 120,
    top: 45,
    alignItems: 'center',
  },
  iconPen: {
    height: 35,
    width: 35,
    borderRadius: 50,
    borderColor: 'rgba(7, 140, 128, 0.9)',
    borderWidth: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    bottom: 25,
  },
  name: {
    color: 'rgba(7, 140, 128, 0.9)',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 5,
  },
  info: {
    paddingHorizontal: 20,
  },
  iconMap: {
    position: 'absolute',
    right: 15,
    top: 12,
  },
  button: {
    marginTop: 10,
  },
  textButton: {
    fontSize: 18,
    fontWeight: '600',
  },
  btnChange: {
    marginVertical: pxToPercentage(10),
    backgroundColor: 'rgba(7, 140, 128, 0.9)',
    alignItems: 'center',
    borderRadius: pxToPercentage(15),
    height: pxToPercentage(47),
    justifyContent: 'center',
    width: '100%',
  },
  lbChange: {
    color: 'white',
    fontSize: pxToPercentage(20),
    ...ThemeUtils.fontMaker({weight: '700'}),
    fontWeight: 'bold',
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
  txtInput: {
    borderWidth: 1,
    borderColor: 'rgba(7, 140, 128, 0.9)',
    backgroundColor: 'white',
  },
});
