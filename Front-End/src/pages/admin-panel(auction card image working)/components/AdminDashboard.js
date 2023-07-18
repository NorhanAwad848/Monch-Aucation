import { Outlet, useNavigate } from 'react-router-dom';
import { removeAuthToken } from '../../../core/services/auth';
import '../styles/AdminDashboard.css';

const AdminDashboard = (/*{children}*/) => {
    const navigate = useNavigate();

    return (
        <div className='dashboard-app'>
            <header className="dashboard-header">
                <a href="/dashboard"><h1><span className="monsh">MONSH</span> Admin Dashboard</h1></a>
            </header>
            <aside className="dashboard-aside">
                <a href="/admin-home/sellers" className='dashboard-button'>Sellers</a>
                <a href="/admin-home/auctions" className='dashboard-button'>Auctions</a>
                <a href="/admin-home/pending" className='dashboard-button'>Pending Accounts</a>
                <button className='dashboard-logout' onClick={() => {
                    removeAuthToken();
                    navigate('/login');
                }}>Logout</button>
            </aside>
            <section className="dashboard-content">
                <Outlet />
                {/* {children} */}
            </section>
        </div>
    );
}

export default AdminDashboard;