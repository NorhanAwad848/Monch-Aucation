import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from './Users';
import Auctions from './Auctions';
import Profile from './Profile';
import AuctionPage from './AuctionPage';
import UsersTable from './PendingUsers.js';
import AdminDashboard from './AdminDashboard';
import DashboardMenu from './DashboardMenu';

export default function AdminRouter() {
    return (
        <>
            {/* <AdminDashboard> */}
                {/* <BrowserRouter> */}
                    <Routes>
                        <Route path="/" element={ <AdminDashboard/> } >
                            <Route index element={ <DashboardMenu /> } />
                            <Route path="sellers" element={ <Users /> } />
                            <Route path="auctions" element={ <Auctions/> } />
                            <Route path="seller/:userID" element={ <Profile /> } />
                            <Route path="auction/:auctionID" element={ <AuctionPage/> } />
                            <Route path="pending" element={ <UsersTable /> } />
                        </Route>
                    </Routes>
                {/* </BrowserRouter> */}
            {/* </AdminDashboard> */}
        </>
        );
}