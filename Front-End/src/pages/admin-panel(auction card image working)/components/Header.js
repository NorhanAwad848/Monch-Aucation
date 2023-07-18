import "../styles/Header.css";


const Header = () => {
  return (
    <>
    <header className = "main-header">

{/* <div className = "logo">
    <img src = {image} alt ="logo"/>

</div> */}

<nav>
    <ul>
        <li>Home</li>
        <li>History</li>
        <li>Logout</li>
      
    </ul>

</nav>
<div className="box">
          <form name="search">
            <input type="text" className="input" name="txt" placeholder="Search by category.." 
            onmouseout="this.value = ''; this.blur();" ></input>
          </form>
          </div>
          <div className="icon"> </div>

          </header> 
         
    </>
           

  );
}
export default Header;