import {StyleSheet} from 'react-native';
import {strSecondColor, strPrimaryColor} from '../../styles/responsive';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: strSecondColor,
    padding: 16,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: strPrimaryColor,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  phoneText: {
    color: '#fff',
    flex: 1,
    fontSize: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#caa472',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
});
