import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/context/ThemeContext';
import { QueryProvider } from './src/providers/QueryProvider';
import { RootNavigator } from './src/navigation/RootNavigator';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <QueryProvider>
        <ThemeProvider>
          <RootNavigator />
        </ThemeProvider>
      </QueryProvider>
    </SafeAreaProvider>
  );
}

export default App;

