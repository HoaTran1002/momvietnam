import { Navigate, Outlet} from 'react-router-dom';
const PrivateRoute = () => {
    const token = localStorage.getItem('jwt');
    return token ? <Outlet /> : <Navigate to="/" />;
// return <Outlet/>
}
export default PrivateRoute