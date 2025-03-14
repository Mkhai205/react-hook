import videoHomePage from '../../assets/videos/video-homepage.mp4';

const HomePage = () => {
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
                <div class='quotes'>You don't want to make a boring form.
                    And your audience won't answer one.
                    Create a type form instead - and make everyone happy.
                </div>
                <div className='btn-start'>
                    Get's started. It's free
                </div>
            </div>
        </div>
    )
};

export default HomePage;