import Character from './Character';


function Home() {
    const isLoggedIn = localStorage.getItem('accessToken')
    return(
        <div>
            {!isLoggedIn && 
            <div>
                <p>vous n'êtes pas authentifié</p>
            </div>
            }

            {isLoggedIn && <Character />}
        </div>
    );
}
export default Home;
