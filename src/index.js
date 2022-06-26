import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.scss';
import App from './App';
// import ModalSaveProject from './components/modalSaveProject';
// import Print from './routes/print';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          {/* <Route path="print" element={<Print />} /> */}
        </Routes>
      </BrowserRouter>
      {/* <ModalSaveProject isOpen={true} setIsOpen={console.log} /> */}
    </Provider>
  </React.StrictMode>
);
