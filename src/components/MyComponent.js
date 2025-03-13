import React from 'react';
import UserInfor from './UserInfor';
import DisplayInfor from './DisplayInfor';

class MyComponent extends React.Component {

    

    // JSX
    render() {
        const myName = 'Khai';
        const myAge = 20;
        const myHobbies = ['Reading', 'Coding', 'Traveling'];
        const myAddress = {
            city: 'Ha Noi',
            country: 'Vietnam'
        };
        return (
            <div>
                <h1>My first component</h1>
                <UserInfor />
                <br />
                <DisplayInfor name={myName} age={myAge} hobbies={myHobbies} address={myAddress} />
            </div>
        );
    }
}

export default MyComponent;