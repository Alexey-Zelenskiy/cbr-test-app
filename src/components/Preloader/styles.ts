import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  preloader: {
    padding: 15,
    borderWidth: 1,
    shadowColor: 'black',
    shadowRadius: 0.05,
    shadowOffset: { width: 3, height: 1 },
    shadowOpacity: 0.1,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    marginTop: 10
  }
});
