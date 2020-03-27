import React from 'react';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import store from './redux/store';
import Index from './pages';

const App: React.FC = () => (
  <Provider store={store}>
    <CssBaseline />
    <Index />
  </Provider>
);

export default App;
