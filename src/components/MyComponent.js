import React from 'react';
import UserInfor from './UserInfor';

class MyComponent extends React.Component {

    

    // JSX
    render() {
        return (
            <div>
                <h1>My first component</h1>
                <UserInfor />
            </div>
        );
    }
}

export default MyComponent;