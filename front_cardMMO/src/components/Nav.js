import {Link} from 'react-router-dom';

function Nav() {
    const isLoggedIn = localStorage.getItem('accessToken') 
    function openNav() {
        document.getElementById("menu").style.width = "66%";
        document.getElementById("burger").style.color = "white";
        document.getElementById("cross").style.display = "flex";

      }

      function closeNav() {
        document.getElementById("menu").style.width = "0";
        document.getElementById("burger").style.display = "flex";

      }
      function logout(){
          localStorage.clear();
          window.location.reload();
      }
    return(
        <div>
            <div id="burger">
                <span id="burger" class="iconify-burger" data-icon="radix-icons:hamburger-menu" data-inline="false"  onClick={openNav}></span>
            </div>
        <nav id="menu" class="menu">
                <div class="nav-item">
                    <ul class="menu__list r-list">
                        <div id="cross">
                            <span id="cross" class="iconify-cross" data-icon="akar-icons:cross" data-inline="false" onClick={closeNav}></span>
                        </div>
                            <Link to='/' class="menu__link r-link text-underlined"> ACCUEIL </Link>
                            <Link to='/profile' class="menu__link r-link text-underlined"> PROFIL </Link>
                            {isLoggedIn ? <button onClick = {logout}>LOGOUT</button>  :<Link to='/login' class="menu__link r-link text-underlined"> LOGIN </Link>}  
                        <div class="menu__link"> 
                        </div>
                    </ul>
                    
                </div>
        </nav>
        </div>
    );
}

export default Nav;