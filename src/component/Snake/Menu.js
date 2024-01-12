import React from "react"; 
import "../../css/Snake.css"; 
  
const Menu = ({ onRouteChange }) => { 
    return ( 
        <div className="snake-component"> 
            <div> 
                <input 
                    onClick={onRouteChange} 
                    className="start"
                    type="button"
                    value="start game"
                /> 
            </div> 
        </div> 
    ); 
}; 
  
export default Menu; 