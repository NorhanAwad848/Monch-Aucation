import { useState, useEffect } from 'react';
import '../styles/AuctionCard.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getAuthToken } from '../../../core/services/auth';

export default function AuctionCard(data) {
    const [auction, setAuction] = useState({loading: true, data: data, product: null, seller: null, bidder: null})
    const {token, user} = getAuthToken();

    useEffect( () => {
        Promise.all([
            axios.get(`http://localhost:4000/api/Auth/users/${data.info.sellerID}`, {headers: {"Authorization": `Bearer ${token}`}}),
            axios.get('http://localhost:4000/api/Auth/user', {headers: {"Authorization": `Bearer ${token}`}}),
            axios.get(`http://localhost:4000/api/Product/${data.info.productID}`)
        ]).then( (resp) => {
            const seller = resp[0].data;
            const bidder = resp[1].data.find( (user) => user.id === data.info.bidderID);
            const product = resp[2].data.product;
            console.log(product);

            setAuction({...auction, loading: false, product: product, seller: seller, bidder: bidder});
        })
    }, []);

    const loadingSpinner = () => ( //<div className="center-loader"><div className="loader"></div></div> )
                <div className="auction-card-loading">
                    <div className='center-loader'>
                        <div className='loader'></div>
                    </div>
                    <div className="auction-card-content">
                        <h4>Loading...</h4>
                        <p>Getting the current bid...</p>
                        {/* <p>{sold ? 'sold.' : 'Not sold yet!'}</p> */}
                        <div></div>
                        <p>A very nice product</p>
                        <p>Current bidder: Joe Rogan</p>
                        {/* <p>From {startDate.toLocaleString()}</p>
                        <p>Until {endDate.toLocaleString()}</p> */}
                    </div>
                </div>
                );
            
    return (
        <>
            { auction.loading ? loadingSpinner() : 
            <Link to={`/admin-home/auction/${auction.data.info.id}`}>
                <div className="auction-card">
                    <img  src={auction.product.productImage} />
                    <div className="auction-card-content">
                        <h4>{auction.product.productName}</h4>
                        <p>{auction.data.info.price ? 'Current bid: ' + auction.data.info.price + ' LE': 'No bids placed.'}</p>
                        <p>Current bidder: {auction.bidder ? auction.bidder.name : 'No bidders.'}</p>
                        <p className='auction-card-status'>{auction.product.state ? 'Sold' : 'Available'}</p>
                        <div></div>
                        <p className='auction-card-desc'>{auction.product.desc}</p>
                        {/* <p>From {startDate.toLocaleString()}</p>
                        <p>Until {endDate.toLocaleString()}</p> */}
                    </div>
                </div>
            </Link>
            }
        </>
    );
}