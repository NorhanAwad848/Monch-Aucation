import { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/Auctions.css";
import { Link } from 'react-router-dom';
import { getAuthToken } from '../../../core/services/auth';

const Auctions = () => {
    const [auctions, setAuctions] = useState({loading: true, elements: [], err: null});
    const {token, user} = getAuthToken();

    useEffect( () => {
        const auctionsElements = [];

        Promise.all([
            axios.get('http://localhost:4000/api/Aucation'),
            axios.get('http://localhost:4000/api/Auth/user', {headers: {"Authorization": `Bearer ${token}`}}),
            axios.get('http://localhost:4000/api/Product')])
            .then( (resp) => {
                const auctionsData = resp[0].data.aucation;
                const usersData = resp[1].data;
                const productsData = resp[2].data.products;
                const categoryData = resp[2].data.category;
                console.log(auctionsData);

                auctionsData.forEach( (val, i) => {
                
                    let allData = {
                        id: val.id,
                        productID: val.productID,
                        productName: productsData.find( (prod) => prod.id === val.productID).productName,
                        bidder: usersData.find( (user) => user.id === val.bidderID ).name,
                        price: val.price,
                        category: categoryData.find( (cat) => cat.id === productsData.find( (prod) => prod.id === val.productID).CategoryID ).name,
                    }

                    let auction = (
                        <tr className="auction-row" key={i}>
                            <td><Link to={`/admin-home/auction/${allData.id}`}><p className="auction-id">{allData.id}</p></Link></td>
                            <td><Link to={`/admin-home/auction/${allData.id}`}><p className="auction-productName">{allData.productName}</p></Link></td>
                            <td><Link to={`/admin-home/auction/${allData.id}`}><p className="auction-productID">{allData.productID}</p></Link></td>
                            <td><p className="auction-bidder">{allData.bidder}</p></td>
                            <td><Link to={`/admin-home/auction/${allData.id}`}><p className="auction-price">{allData.price}</p></Link></td>
                            <td><Link to={`/admin-home/auction/${allData.id}`}><p className="auction-category">{allData.category}</p></Link></td>
                        </tr>
                    )

                    auctionsElements.push(auction);
                })
                setAuctions({...auctions, loading: false, elements: auctionsElements});
        })
        .catch( (err) => setAuctions({...auctions, loading: false, err: [{msg: `something went wrong ${err}`}]}))
    }, [])

    const loadingSpinner = () => ( <div className="center-loader"><div className="loader"></div></div> )

    return (
        <div className='auctions-view-container'>
            <h1>Auctions</h1>
                { auctions.loading ? loadingSpinner() : 
                (
                <div className='auctions-table-container'>
                        <table className="auctions-table">
                            <thead>
                                <tr>
                                    <td>AUCTION ID</td>
                                    <td>PRODUCT</td>
                                    <td>PRODUCT ID</td>
                                    <td>BIDDER</td>
                                    <td>CURRENT BID</td>
                                    <td>CATEGORY</td>
                                </tr>
                            </thead>
                            <tbody>
                                { auctions.elements }
                            </tbody>
                        </table>
                </div>
                )}
        </div>
    );
};

export default Auctions;