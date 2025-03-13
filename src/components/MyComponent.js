import React from 'react';
import UserInfor from './UserInfor';
import DisplayInfor from './DisplayInfor';

class MyComponent extends React.Component {

    state = {
        listUser: [
            {id: 1, name: 'Manh Khai', age: 20},
            {id: 2, name: 'Huong Giang', age: 21},
            {id: 3, name: 'Huong Tra', age: 22},
        ]
    }

    // JSX
    render() {
        // DRY: Don't Repeat Yourself
        return (
            <div>
                <h1>My first component</h1>
                <UserInfor />
                <hr />
                <DisplayInfor listUser={this.state.listUser} />
            </div>
        );
    }
}

export default MyComponent;