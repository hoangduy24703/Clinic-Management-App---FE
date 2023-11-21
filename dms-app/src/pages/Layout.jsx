import { Outlet, Link } from 'react-router-dom';


const Layout = () => {
  return (
    <>
    <nav>
      <ul>
        <li>
          <Link to='/'>Thông tin cá nhân</Link>
        </li>
        <li>
          <Link to='/'>THEM 1</Link>
        </li>
        <li>
          <Link to='/'>THEM 2</Link>
        </li>
      </ul>
    </nav>
    <Outlet />
    </>
  )
}

export default Layout;