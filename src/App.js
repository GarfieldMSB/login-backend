import { createTheme, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux'
import { AppRouter } from "./router/AppRouter";
import { store } from './store/store';

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        light: '#41188f',
        main: '#211159',
        dark: '#060516',
      },
    }
  })
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </Provider>
  );
}

export default App;