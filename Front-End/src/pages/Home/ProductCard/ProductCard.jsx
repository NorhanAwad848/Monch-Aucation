import "./ProductCard.css";
//import image from "../../../assests/images/AuctionProduct.png";
import { Header } from "../../../shared/Header/Header";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {BiSearchAlt} from "react-icons/bi";
import axios from "axios";
import { getAuthToken } from "../../../core/services/auth";

export const ProductCard = ()=>{

  // const { id } = useParams(); // bidder id 
  const {token,user} =   getAuthToken();
  
  const [productCards, setProductCards] = useState({
    loading: true,
    result: [],
    err: null,
    update: false,
  });

  const [specificAuction, setSpecificAuction] = useState({
    loading: true,
    result: {},
    err: null,
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/Product/product",{
        params: {
          search: search,
        },
      }
      )
      .then((resposne) => {
        setProductCards({ ...productCards, result: resposne.data, loading: false, err: null });
        console.log(resposne.data);
      })
      .catch((errors) => {
        setProductCards({ ...productCards, loading: false, err: [{ msg: errors.response.data.message }] });
      });
  }, [search, productCards.update]);

  

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
          {productCards.err.map((err, index) => {
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

  const form = useRef({
  price: "",
  });

  

    return(
      <>
       <div className="icon"> <BiSearchAlt  size={40}/></div>
       <div className="boxx">
              <form name="search">
                <input type="text" className="boxxinput" name="txt" placeholder="Search by name or category.." 
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                ></input>
              </form>
              </div>
      {productCards.err !== null && error()}
      {productCards.loading === true ? (
        loadingSpinner()
      ) : (

       
        <div className="sosoContainer">
        {productCards.result.products.map((productCard) => {
          console.log(productCard)
         return (
        <div key={productCard.id} className="flip-card">
  <div    className="flip-card-inner" >
    <div className="flip-card-front">
      <img src={productCard.productImage} alt="Avatar"/>
    </div>
    <div  className="flip-card-back popup" >
      <h1> {productCard.productName} </h1>
      <p><strong>Category : </strong>{productCard.Category.name}</p>
      <p><strong>Description : </strong>{productCard.desc} </p>
      <p><strong>Min bid: </strong>{productCard.min_bid}</p>
      <p><strong>Duration : </strong>{productCard.duration} Hours</p>
      <input type="text" name ="Bidding" 
             ref={(val) => {
              form.current.price = val;
            }}
       />
      <button className="popup" onClick={() => {
        setSpecificAuction({ ...specificAuction, loading: true, err: null });
        axios
          .put(`http://localhost:4000/api/Aucation/${productCard.id}`, {
            price: parseFloat(form.current.price.value),
            bidderID: user.id,
          
          }
          )
          .then((resposne) => {
            setSpecificAuction({ ...specificAuction, loading: false, err: null });
            console.log(resposne.data);
            
          })
          .catch((errors) => {
            setSpecificAuction({ ...specificAuction, loading: false, err: [{ msg: errors.response.data.message }] });
          });
      }}
       ><strong>Bid!</strong><span className="popuptext" id="myPopup">ok!</span></button>
    </div>
  </div>
</div>

);
})}
</div>



)}
</>
);
};