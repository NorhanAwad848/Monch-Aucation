import { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/Users.css";
import { Link } from 'react-router-dom';
import { getAuthToken } from '../../../core/services/auth';

const Users = () => {
    const [users, setUsers] = useState({loading: true, elements: [], err: null});

    useEffect( () => {
        const usersElements = [];
        const {token, user} = getAuthToken();

        Promise.all([
            axios.get('http://localhost:4000/api/Auth/user', {headers: {"Authorization": `Bearer ${token}`}}),
            axios.get('http://localhost:4000/api/Aucation')
        ]).then( (resp) => {
            let i = 0;
            for (const entry of resp[0].data) {
                console.log(entry);
                if (entry.role.name == "Seller") {
                    let user = (
                        <tr className="user-card" key={i}>
                            <td><Link to={`/admin-home/seller/${entry.id}`}><p className="user-name">{entry.name}</p></Link></td>
                            {/* <td><Link to={`/admin-home/seller/${entry.id}`}><p className="user-auctions">{ resp[1].data.aucation.filter( (auction) => auction.sellerID === entry.id ).length }</p></Link></td> */}
                            <td><Link to={`/admin-home/seller/${entry.id}`}><p className="user-email">{entry.email}</p></Link></td>
                            {/* <td><Link to={`/admin-home/seller/${entry.name}`}><p className="user-phone">{entry.phone}</p></Link></td> */}
                        </tr>
                    )
                usersElements.push(user);
                }

                i++;
            }
            setUsers({...users, loading: false, elements: usersElements});
        })
        .catch( (err) => setUsers({...users, loading: false, err: [{msg: `something went wrong ${err}`}]}))
    }, [])

    const loadingSpinner = () => ( <div className="center-loader"><div className="loader"></div></div> )

    return (
        <div className='users-view-container'>
            <h1>Sellers</h1>
                { users.loading ? loadingSpinner() : 
                (
            <div className='users-table-container'>
                    <table className="users-table">
                        <thead>
                            <tr>
                                <td>USERNAME</td>
                                {/* <td>AUCTIONS</td> */}
                                <td>EMAIL</td>
                                {/* <td>PHONE</td> */}
                            </tr>
                        </thead>
                        <tbody>
                            { users.elements }
                        </tbody>
                    </table>
            </div>
                )}
        </div>
    );
};

export default Users;