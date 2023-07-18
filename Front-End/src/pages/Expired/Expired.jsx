import React from "react";
import { useNavigate } from "react-router-dom";
import './Expired.css';
import { useParams } from "react-router-dom";

export const Expired=(props)=>{
  const navigate = useNavigate();
  let { id } = useParams();
    return(
    <React.Fragment>
        
    <div className="flipp-card-container " >
  <div className="flipp-card">

    <div className="card-frontt">
      <figure>
        <div className="img-bg"></div>
        <img src={props.image} alt="Brohm Lake"/>
        <figcaption>{props.title}</figcaption>
      </figure>

      <ul>
        <li>Last Minimum_Bid:{props.mim_bid}</li>
        <li>last Start_Date:{props.start_Date}</li>
        <li>Last End_Date:{props.end_Date}</li>
      </ul>
    </div>

    <div className="card-backk">
      <figure>
        <div className="img-bg"></div>
        <img src={props.image}  alt="Brohm Lake"/>
      </figure>

      <button onClick={()=>{ 
        props.func(props.id)
      }}>Show</button>

      <div className="design-container">
        <span className="design design--1"></span>
        <span className="design design--2"></span>
        <span className="design design--3"></span>
        <span className="design design--4"></span>
        <span className="design design--5"></span>
        <span className="design design--6"></span>
        <span className="design design--7"></span>
        <span className="design design--8"></span>
      </div>
    </div>

  </div>
</div>

{/* 
<a href="https://abubakersaeed.netlify.app/designs/d4-flip-card" className="abs-site-link" rel="nofollow noreferrer" target="_blank">abs/designs/d4-flip-card</a> */}
    </React.Fragment>
    );

};