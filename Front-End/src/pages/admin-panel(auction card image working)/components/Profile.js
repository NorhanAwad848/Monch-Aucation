import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AuctionCard from './AuctionCard.js';
import { Link } from 'react-router-dom';
import '../styles/Profile.css';
import { getAuthToken } from '../../../core/services/auth.js';

export default function Profile() {
    const params = useParams();
    const [auctions, setAuctions] = useState([]);
    const [user, setUser] = useState({loading: true, details: {}, err: null});
    const {token, userFromToken} = getAuthToken();

    useEffect( () => {
        Promise.all([
            axios.get(`http://localhost:4000/api/Auth/users/${params.userID}`, {headers: {"Authorization": `Bearer ${token}`}}),
            axios.get(`http://localhost:4000/api/Aucation`),
            axios.get(`http://localhost:4000/api/Product`)
        ]).then( (resp) => {
            setUser({details: resp[0].data, loading: false, err: null});

            let auctionsInfo = resp[1].data.aucation.map( (auction) => {return {...auction, sellerID: null}}).filter( (auction) => {
                const product = resp[2].data.products.find( (product) => product.id == auction.productID );

                if (product.sellerID == params.userID) {
                    auction.sellerID = params.userID;
                    return auction;
                } 
            });
            setAuctions(auctionsInfo);

        }).catch( (err) => setUser({...user, loading: false, err: [{msg: err}]}) );
    }, [])

    const loadingSpinner = () => ( <div className="center-loader"><div className="loader"></div></div> )

    return (
        <div className='user-profile'>
            <Link to="/admin-home/sellers" className='auction-page-back'>◀ All sellers</Link>
            { user.loading ? loadingSpinner() : 
            <>
                <div className="user-header">
                    {/* <img src="" alt="user's profile picture"/> */}
                    <h1>{user.details.name}</h1>
                    <p>◀{user.details.email}</p>
                    <p>{user.details.phone}</p>
                    {/* <p>Total auctions: {user.details.auctions.length}</p> */}
                </div>
                <h2>{user.details.name}'s auctions</h2>
                <div className="user-auctions-list">
                    { auctions.length === 0 ? <h3>This user has no listed auctions.</h3> : auctions.map( (auction, i) => <AuctionCard info={auction} key={i}/>) }
                </div>
            </>
            }
        </div>
    );
}