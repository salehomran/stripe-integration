import { Outlet } from 'react-router';
import { Nav } from '../components/Nav';

export default function Layout() {
  return (
    <>
      <header>
       <Nav /> 
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
      </footer>

    </>
  );
} 