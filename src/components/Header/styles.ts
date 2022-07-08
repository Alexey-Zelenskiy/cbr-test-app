import { Platform, StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  main: {
    paddingBottom: 15,
    paddingTop: Platform.OS === 'android' ? 17 : 0,
    backgroundColor: 'black',
    paddingHorizontal: 20
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    flex: 1
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  circle: {
    width: 25,
    borderRadius: 20,
    height: 25,
    backgroundColor: 'red'
  }
});
