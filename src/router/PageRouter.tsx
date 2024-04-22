import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { useContext, useEffect } from 'react';
import Context from '../context/Context';
import { AccountsPage } from '../pages/AccountsPage';

export const PageRouter = () => {
  const { accessToken } = useContext(Context);

  return (
    <BrowserRouter>
      <Routes>
        {accessToken && accessToken !== '' ? (
          <>
            <Route path="*" element={<Navigate to="/home" />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/*" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<Navigate to="/home" />} />
            <Route path="/accounts" element={<AccountsPage />} />
          </>
        ) : (
          <>
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/*" element={<Navigate to="/login" />} />
            <Route path="/home" element={<Navigate to="/login" />} />
            <Route path="/accounts" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};
