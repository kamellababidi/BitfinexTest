import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/store';
import { OrderBookScreen } from './src/screens/order-book/order-book.screen';

function App(): React.JSX.Element {

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <OrderBookScreen/>
      </Provider>
    </SafeAreaProvider>
  );
  // ------------------------------------------------------------------------------------------
}

export default App;
