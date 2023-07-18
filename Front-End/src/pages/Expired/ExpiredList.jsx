import { useNavigate } from "react-router-dom";
import { Expired } from "./Expired";
import { useParams } from "react-router-dom";
import React from "react";
import { getAuthToken } from "../../core/services/auth";
import { useEffect, useRef, useState } from "react";
import axios from "axios";



export const ExpiredList =()=>{
    const navigate = useNavigate();
    const currentdate=new Date();
    const currenthours=((currentdate.getHours()))+1;
    const {token,user} = getAuthToken();
    let { id } = useParams();
    const submit = (id) => {
        // Navigate to about page programmatically (localhost:3000/about/{id})
    navigate("/Specificitem/" + id);
    };
     // const { token, user } = getAuthToken();
    const [product, setProduct] = useState({
        loading: true,
        result: {},
        err: null,
      });

    useEffect(() => {
        setProduct({ ...product, loading: true });
        axios
        .get("http://localhost:4000/api/Product", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((data) => {
            
            setProduct({ ...product, result: data.data, loading: false, err: null });
            console.log(data.data)
          })
          .catch((err) => {
            setProduct({ ...product, loading: false, err: [{ msg: `something went wrong ${err}` }] });
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
              {product.err.map((err, index) => {
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
        return(
        <React.Fragment>
             {product.err !== null && error()}
             
            {product.loading === true ? (
                loadingSpinner()
            ) : (
        <section className="Expired  background">
        <div className="background2 ">
           <h1> Expired Items</h1>
       
                {
                    product.result.products.map((product) => {
                      if( product.state ==-1&&product.sellerID==user.id )
                        return (
                           
                        <Expired 
                        
                        key={product.id}
                        id={product.id}
                        title={product.productName}
                        mim_bid={product.min_bid}
                        start_Date={product.start}
                        end_Date={product.end}
                        image={product.productImage}
                        func={submit}
                        
                        />
                            
                        );
                    })
                }
                </div>
         </section>
         )}
        </React.Fragment>
        );
      };