import "../styles/DashboardMenu.css";
import { Link } from 'react-router-dom';

const DashboardMenu = () => {
    return (
        <div className="dashboard-menu">
            <h1>Welcome to the Admin Dashboad. Where do you want to go?</h1>
            <Link to="/admin-home/sellers">Sellers</Link>
            <Link to="/admin-home/auctions">Auctions</Link>
            <Link to="/admin-home/pending">Pending user accounts</Link>
        </div>
    );
}


export default DashboardMenu;