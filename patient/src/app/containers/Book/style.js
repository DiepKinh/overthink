import {DynamicStyleSheet} from 'react-native-dark-mode';
import {ResponsiveUtils, ThemeUtils} from '@common';
import {pxToPercentage} from '@common/Size.ts';
import {Platform} from 'react-native';

export const styles = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainerHeader: {
    paddingTop: Platform.OS === 'ios' ? 30 : 10,
    width: '100%',
    justifyContent: 'center',
    borderBottomColor: '#E4E4E4',
    borderBottomWidth: 1,
  },
  headerContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    marginLeft: 10,
  },
  headerContainerLeft: {
    marginTop: 10,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  txtWelcom: {
    color: '#000000',
    fontSize: 22,
    fontWeight: '600',
  },

  imgItem: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  viewNameChat: {
    marginLeft: 10,
  },
  imgActive: {
    height: 12,
  },
  imgCall: {
    height: 20,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  imgVideo: {
    height: 17,
    marginLeft: 10,
  },
  mainContainer: {
    width: '100%',
    marginTop: 10,
  },
  messageSend: {
    // width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 45,
  },
  messageSendDetail: {
    backgroundColor: '#D0ECE8',
    padding: 10,

    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginRight: 10,
  },
  txtMessageSend: {
    color: '#007665',
    fontSize: 16,
  },
  messageRecieved: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 45,
  },
  messageRecievedDetail: {
    backgroundColor: '#E4E4E4',
    padding: 10,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginLeft: 10,
  },
  txtMessageRecieved: {
    color: '#383737',
    fontSize: 16,
  },
  //Menu Footer
  menuFooter: {
    paddingBottom: 15,
    height: 60,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  viewSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    borderRadius: pxToPercentage(30),
    paddingLeft: '3%',
    paddingRight: '3%',
    height: pxToPercentage(42),
    color: 'black',
    backgroundColor: '#F6F6F6',
    justifyContent: 'space-around',
  },
  txtInputSearch: {
    width: '85%',
    color: '#000',
    borderRadius: pxToPercentage(25),
    fontSize: 16,
    marginLeft: 10,
  },
});
