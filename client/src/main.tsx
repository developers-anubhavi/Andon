import './MK1/index.css';

import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import BS_App from './BS/App.tsx';
import BS_LOGIN from './BS/Login.tsx';
import ET_App from './ET/App.tsx';
import HS_App from './HS/App.tsx';
import HS_LOGIN from './HS/Login.tsx';
import MK1_App from './MK1/App.tsx';
import Login from './MK1/Login.tsx';
import MK2_App from './MK2/App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <BrowserRouter>
      <Routes>

        {/* DEFAULT-MK1 ROUTE */}
        <Route path="/" element={<MK1_App />} />
        <Route path="/login" element={<Login />} />

         {/* MK2 ROUTE */}
        <Route path="/mk2_app" element={<MK2_App />} />

         {/* MK2 ROUTE */}
        <Route path="/et_app" element={<ET_App />} />

        {/* BS ROUTE */}
        <Route path="/bs_app" element={<BS_App />} />
        <Route path="/bs_login" element={<BS_LOGIN />} />

         {/* HS ROUTE */}
        <Route path="/hs_app" element={<HS_App />} />
        <Route path="/hs_login" element={<HS_LOGIN />} />
        

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
