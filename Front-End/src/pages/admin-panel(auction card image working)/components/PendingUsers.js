import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "../styles/PendingUsers.css";
import { getAuthToken } from '../../../core/services/auth';

const PendingUsers = () => {
    const [users, setUsers] = useState({loading: true, elements: [], err: null});
    const [msg, setMsg] = useState(null);
    const timeoutRef = useRef(null);
    const {token, user} = getAuthToken();

    const displayMessage = (msg) => {
        clearTimeout(timeoutRef.current );
        setMsg(msg);
        timeoutRef.current = setTimeout( () => setMsg(null), 3000);
    }

    const handleAccept = (e, id) => {
        console.log(users);
        axios.put(`http://localhost:4000/api/User/${id}`, {status: 1, headers: {"Authorization": `Bearer ${token}`}})
        .then( (resp) => displayMessage(`${resp.data.message}: accepted`))
        .catch( (err) => displayMessage(`${err}`));
    }

    const handleReject = (e, id) => {
        axios.put(`http://localhost:4000/api/User/${id}`, {status: -1, headers: {"Authorization": `Bearer ${token}`}})
        .then( (resp) => displayMessage(`${resp.data.message}: rejected`))
        .catch( (err) => displayMessage(`${err}`));
    }

    useEffect( () => {
        const usersElements = [];

        axios.get('http://localhost:4000/api/Auth/user', {headers: {"Authorization": `Bearer ${token}`}}).then( (resp) => {
            let i = 0;
            for (const entry of resp.data) {
                console.log(entry);
                if (entry.status == 0) {
                    let user = (
                        <tr className="user-card" key={i}>
                            <td><p>{entry.name}</p></td>
                            <td><p>{entry.email}</p></td>
                            <td>
                                <button onClick={(e) => handleAccept(e, entry.id)}>Accept</button>
                                <button onClick={(e) => handleReject(e, entry.id)}>Reject</button>
                            </td>
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
            { msg != null ? <div className='user-update-message'><p>{msg}</p></div> : null }
            <h1>Pending Accounts</h1>
                { users.loading ? loadingSpinner() : 
                (
            <div className='users-table-container'>
                    <table className="users-table">
                        <thead>
                            <tr>
                                <td>USERNAME</td>
                                <td>EMAIL</td>
                                <td>ACCEPT / REJECT</td>
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

export default PendingUsers;