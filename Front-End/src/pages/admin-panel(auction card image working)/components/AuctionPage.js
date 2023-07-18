import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../styles/AuctionPage.css";
import { Link } from 'react-router-dom';
import { getAuthToken } from '../../../core/services/auth';

const AuctionPage = () => {
    const [auction, setAuction] = useState({loading: true, err: null});
    const {token, user} = getAuthToken();
    const params = useParams();

    useEffect( () => {
        const auctionsElements = [];

        Promise.all([
            axios.get('http://localhost:4000/api/Aucation'), 
            axios.get('http://localhost:4000/api/Auth/user', {headers: {"Authorization": `Bearer ${token}`}}),
            axios.get('http://localhost:4000/api/Product')])
            .then( (resp) => {
                const auctionData = resp[0].data.aucation.find( (auc) => auc.id == params.auctionID );
                const usersData = resp[1].data;
                const productsData = resp[2].data.products;
                const categoryData = resp[2].data.category;
                const sellerID = productsData.find( (prod) => prod.id == auctionData.productID ).sellerID;

                setAuction({
                    ...auction,
                    loading: false,
                    err: null,
                    price: auctionData.price,
                    id: params.auctionID,
                    product: productsData.find( (prod) => prod.id == auctionData.productID),
                    bidder: usersData.find( (user) => user.id == auctionData.bidderID ),
                    seller: usersData.find( (user) => user.id == sellerID ),
                    category: categoryData.find( (cat) => cat.id == productsData.find( (prod) => prod.id === auctionData.productID).CategoryID ),
                });
        })
        .catch( (err) => setAuction({...auction, loading: false, err: [{msg: `something went wrong ${err}`}]}))
    }, [])

    const loadingSpinner = () => ( <div className="center-loader"><div className="loader"></div></div> )

    return (
        <div className='auction-view-container'>
            <Link to="/admin-home/auctions" className='auction-page-back'>◀ All auctions</Link>
                { auction.loading ? loadingSpinner() : 
                (
                <>
                    <div className='auction-view-title'>
                        <p>Auction </p><h1>{auction.product.productName}</h1>
                    </div>
                    <div className='auction-view-grid'>
                        <div className='auction-view-box'>
                            <h2>Product Info</h2>
                            <h4>Title: {auction.product.productName}</h4>
                            <h4>Description: {auction.product.desc}</h4>
                            <h4>Category: {auction.category.name}</h4>
                            <h4>Image</h4>
                            <img src={ auction.product.productImage }/>
                        </div>
                        <div className='auction-view-box'>
                            <h2>Bidding Info</h2>
                            <h4>Status: { auction.product.state == 1 ? 'Sold' : 'Open for bidding' }</h4>
                            <h4>Minimum bid amount: { auction.product.min_bid } LE</h4>
                            <h4>Curret bidder: { auction.bidder.name }</h4>
                            <h4>Curret bid amount: { auction.price } LE</h4>
                            <h4>Start date: {auction.product.start}</h4>
                            <h4>End date: {auction.product.end}</h4>
                            
                        </div>
                        <div className='auction-view-box'>
                            <h2>Seller Info</h2>
                            <h4>Seller : <Link to={ `/admin-home/seller/${auction.seller.id}`}>{ auction.seller.name }</Link></h4>
                            
                            <h4>Email: { auction.seller.email }</h4>
                           
                        </div>
                    </div>
                </>
                )}
        </div>
    );
};

export default AuctionPage;