import React, { useEffect, useRef,useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../css/style.css'
import '../css/style2.scss'
import '../css/responsive.css'
// import '../css/navbar.css'
import $ from "jquery";
import logo from '../images/logo.png';
import burger from '../images/burger.png';
import connect from '../images/connect.png';
import gcircle from '../images/gcircle.png';
import crosss from '../images/crosss.png';

const Header = ()=>{
  const navigate = useNavigate();

  useEffect(()=>{
    changePickupStoreMenu();

function changePickupStoreMenu(){
 
    var body = $('body'),
        mask = $('<div class="mask"></div>'),
        toggleSlideRight = document.querySelector( ".toggle-slide-right" ),
        slideMenuRight = document.querySelector( ".slide-menu-right" ),
        activeNav = '';
    ;
    $('body').append(mask);
 
    /* slide menu right */
    toggleSlideRight.addEventListener( "click", function(){
        $('body').addClass("smr-open");
        $('.mask').fadeIn();
        activeNav = "smr-open";
    } );
 
    /* hide active menu if close menu button is clicked */
    $(document).on('click', ".close-menu", function(el,i){
        $('body').removeClass(activeNav);
        activeNav = "";
        $('.mask').fadeOut();
    });
 
}
})

const auth = localStorage.getItem('users');
const UserType = JSON.parse(localStorage.getItem('users')).UserType;

const logOut = ()=>{
  localStorage.clear();
  navigate('/login')
}

  return(
    <div>
         <div className="header-bg">
        <div className="container">
           <div className="wrp-header">
               <div className="header-child1">
                   <div className="logo-box">
                        <a href="#"> Game logo</a>
                        
                   </div>
               </div>
               {/* <div className="header-child2">
                
               </div> */}
               <div className="header-child4">
                <ul className="deskmenu-list">
                  
                  {
                      UserType == 3? <li><a href="/dashboard">Dashboard</a></li>: ""
                    }
                    
                    {
                      UserType == 3? <><li><a href="/game/start">Play Game</a></li> <li><a href="/patient/profile">Profile</a></li></>: ""
                    }
                     {
                       UserType == 2? <><li><a href="/game/provider">Dashboard</a></li> <li><a href="/doctor/profile">Profile</a></li></> : ""
                     }
                  </ul>
                   <div className="connect-wallet">
                     {
                       auth? <Link to="/" onClick={logOut} className="connect-wa-btn mrl-btn">Logout</Link> : <div><Link to="/register" className="connect-wa-btn mrl-btn">Register</Link>
                       <Link to="/" className="connect-wa-btn mrl-btn">Login</Link></div>
                     } 
                    
                   </div>
               </div>
           </div>
        </div>
    </div>
    
  <div className="border-b">
    <div className="container-fluid">
      <div className="header-box">
      <div className="header-c1">
          <div className="logo-box2">
            <a href="/">
              {/* <img src={logo} /> */}
              Game logo
            </a>
          </div>
        </div>

        <div className="header-c2">
          
        <div className="burger-area">
           <a href="#" className="burgers toggle-slide-right"> <img src={burger} /></a>
          </div>
        </div>

      </div>
          
          <div className="menu slide-menu-right menu-list-wrp">
              <button class="close-menu"><img src={crosss} className="img-close" /></button>
            <ul className="menu-list2">
                <li><a href="#" className="connect-wa-btn close-menu">Register</a></li>
                <li><a href="#" className="connect-wa-btn close-menu">Login</a></li>
            </ul>
          </div>
      
    </div>
  </div>
  </div>
);
}

export default Header;