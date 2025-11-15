import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './Layout.css';
import { Navigation } from './Navigation';

export function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="layout">
      <Navigation />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
