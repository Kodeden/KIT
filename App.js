import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import StackNavigator from './navigation/StackNavigator';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store';

export default function App() {
  return (
    <Provider store={store} style={styles.container} >
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


//function wishlist
//1. Sort by contacted date with oldest at top
//2. color 6 months or older in red?
//3. Notifications for 6 months or older?
