import './ProductHistoryCard.css';
//import image from "../../../assests/images/ProductHistory.jpg";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getAuthToken } from '../../../core/services/auth';

export const ProductHistoryCard = ()=>{
   // const { id } = useParams(); // bidder id
  const {token,user} = getAuthToken();

  const [auctions, setauctions] = useState({
    loading: true,
    result: [],
    err: null,
    update: false,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/Aucation/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      
      .then((resposne) => {
        setauctions({ ...auctions, result: resposne.data, loading: false, err: null });
        console.log(resposne.data);
      })
      .catch((errors) => {
        setauctions({ ...auctions, loading: false, err: [{ msg: errors.response.data.message }] });
      });
  }, []);

  const loadingSpinner = () => {
    return (
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  };

  const error = () => {
    return (
      <div className="container">
        <div className="row">
          {auctions.err.map((err, index) => {
            return (
              <div key={index} className="col-sm-12 alert alert-danger" role="alert">
                {err.msg}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
    return (
      <>
      <div className="Header">
      <h3 className="Heading">Purchase history</h3>
      <br/><br/><br/>
      </div>
      {auctions.err !== null && error()}
      {auctions.loading === true ? (
        loadingSpinner()
      ) : (
        <div className="Cart-Container">
          {auctions.result.map((auction) => {
             
         return (
          
          <>
          <div  className="Cart-Items">
            <div className="image-box">
              <img className='image-box2' src={auction.product.productImage} style={{height: '150px'}} alt ="HistoryProductPhoto" />
            </div>
            <div className="about">
              
              {/* <h3 className="subtitle">Description: {auction.product.desc}</h3> */}
            </div>
            <div className="prices">
            <div className="Intial"> Product_Name :{auction.product.productName}</div>
              <div className="Intial">Intial bid: {auction.product.min_bid}$</div>
              <div className="Bid">Bid price: {auction.price}$</div>
            </div>            
          </div>
          <hr/>
          </>
          );
         })}
          </div>
          )}
          </>
      );
}