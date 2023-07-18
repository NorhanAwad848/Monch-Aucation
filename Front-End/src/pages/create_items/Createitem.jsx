import React from "react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../../core/services/auth";
import jwt from "jwt-decode";

import "./Createitem.css";
export const Createitem=()=>{
    const navigate = useNavigate();
// const token=3;
const {token,user}=getAuthToken();

    const currentdate=new Date();
    const currenthours=((currentdate.getHours())%12||12)+1;

    const [New, setNew] = useState({
      loading: false,
      err: null,
      filename: "Choose file",
    });
    const [product, setProduct] = useState({
        loading: true,
        result: {},
        err: null,
        filename: "Choose file",
      });
      
      const form = useRef({
        productName:"",
        Category:"",
        desc:"",
        min_bid:0,
        duration:5,
        start:currenthours,
        productImage:null,
        state:0,
        sellerID:user.id,
        CategoryID:0,
      });
      const end3=((form.current.start+form.current.duration));
      const form1=useRef({
         end:end3,
      });

      const submit = (e) => {
        e.preventDefault();
        setProduct({ ...product, loading: true });
        const formData = new FormData();
        formData.append("productName",form.current.productName.value);
        formData.append("desc",form.current.desc.value);
        formData.append("duration",form.current.duration);
        formData.append("min_bid",form.current.min_bid.value);
        formData.append("productImage",form.current.productImage.value);
        formData.append("start",form.current.start.value);
        formData.append("end",form1.current.end.value);
        formData.append("CategoryID",form.current.CategoryID.value);
        formData.append("sellerID",user.id);
        formData.append("state",form.current.state);
        if (form.current.productImage.files && form.current.productImage.files[0]) {
          formData.append("productImage", form.current.productImage.files[0]);
        }
        console.log(formData);
        axios.post("http://localhost:4000/api/Product",formData,{
          headers:{
              Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
          }
          })
          .then(() => {
            setNew({ ...New, loading: false ,err:null});
            navigate("/Item");
          })
          .catch((errors) => {
            if(typeof errors.response.data.message==="string"){
              setNew({ ...New, loading: false,err:[{msg:errors.response.data.message}]});
            }
            else{
              setNew({ ...New, loading: false,err:errors.response.data.message});
            }
            
          });
          console.log(form.current.productName.value,form.current.CategoryID.value,form.current.desc.value,form.current.min_bid.value,form.current.productImage.value,form.current.start.value,form1.current.end.value);
      };
      
      useEffect(() => {
        setProduct({ ...product, loading: true });
        axios
          .get("http://localhost:4000/api/Product")
          .then((data) => {
            setProduct({ ...product, result: data.data, loading: false, err: null });
          })
          .catch((err) => {
            setProduct({ ...product, loading: false, err: [{ msg: `something went wrong ${err}` }] });
          });
      }, []);

      const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setProduct({ ...product, filename: file.name });
        } else {
          setProduct({ ...product, filename: "Choose file" });
        }
      };

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
            <section className="create">
            <div className="box">
                <span className="borderline"></span>
                <form onSubmit={(e) => submit(e)}>
                    <h2> Create Items</h2>
                    <div className="inputBox">
                        <input type="text" id="name" required ref={(val) => {
                          form.current.productName = val;
                        }}/>
                        <span>Product_Name</span>
                        <i></i>
                    </div>
                    <div className="inputBox">
                        <select type="text"  id="type" required ref={(val) => {
                          form.current.CategoryID = val;
                        }} >
                             <option className="font" value="-1">Select a Type</option>
                          {product.result.category.map((Category) => {
                            return (
                              <option className="font" key={Category.id} value={Category.id}>
                                {Category.name}
                              </option>
                            );
                          })}
                        </select>
                        <span>Product_Category</span>
                        <i></i>
                    </div>
                    <div className="inputBox">
                        <input type="text" id ="describtion" required ref={(val) => {
                            form.current.desc = val;
                          }}/>
                        <span>Product_Description</span>
                        <i></i>
                    </div>
                    <div className="inputBox">
                        <input type="number" id="bid" required ref={(val) => {
                            form.current.min_bid = val;
                          }}/>
                        <span>Minimum_Bid</span>
                        <i></i>
                    </div>
                    
                    <div className="inputBox">
                        <input type="number" defaultValue={[form.current.start]} id="start"required ref={(val) => {
                            form.current.start = val;
                          }}/>
                        <span>Start_Date</span>
                        <i></i>
                    </div>
                    <div className="inputBox">
                        <input type="number" id="end"  defaultValue={[form1.current.end]} required ref={(val) => {
                            form1.current.end = val;
                          }}/>
                        <span>End_Date</span>
                        <i></i>
                    </div>
                    <div className="inputBox">
                        <input type="file" id="image" required ref={(val) => {
                            form.current.productImage = val;
                          }} onChange={handleFileChange}/>
                        <span>Product_Image</span>
                        <i></i>
                    </div>
                    <input className="btn-create" type="submit" value="Create"/>
                </form>
            </div>


            </section>
            )}
        </React.Fragment>

    );
};