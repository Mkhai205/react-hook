import videoHomePage from '../../assets/videos/video-homepage.mp4';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    console.log("🚀 ~ HomePage.js:8 ~ HomePage ~ isAuthenticated:", isAuthenticated);

    const navigate = useNavigate();

    return (
        <div className="homepage-container">
            <video autoPlay loop muted className="homepage-video">
                <source
                    src={videoHomePage}
                    type='video/mp4'
                />
            </video>
            <div className="homepage-content">
                <div className='title'>There's a better way to ask</div>
                <div className='quotes'>You don't want to make a boring form.
                    And your audience won't answer one.
                    Create a type form instead - and make everyone happy.
                </div>
                {isAuthenticated === false ?
                    <div className='btn-start' onClick={() => navigate('/login')}>
                        Get's started. It's free
                    </div>
                    :
                    <div className='btn-start' onClick={() => navigate('/users')}>
                        Doing quiz now
                    </div>
                }
            </div>
        </div>
    )
};

export default HomePage;