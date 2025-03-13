import React from 'react';
import AddUserInfor from './AddUserInfor';
import DisplayInfor from './DisplayInfor';

class MyComponent extends React.Component {

    state = {
        listUsers: [
            { id: 1, name: 'Manh Khai', age: 20, gender: 'male' },
            { id: 2, name: 'Huong Giang', age: 21, gender: 'female' },
            { id: 3, name: 'Huong Tra', age: 22, gender: 'female' },
        ],
        currId: 4,
    }

    handleAddNewUser = (newUser) => {
        console.log('>> New user: ', newUser);
        this.setState({
            listUsers: [{ id: this.state.currId, ...newUser }, ...this.state.listUsers],
            currId: this.state.currId + 1,
        });
    }

    // JSX
    render() {
        // DRY: Don't Repeat Yourself
        return (
            <div className='my-component-container'>
                <h1>My first component</h1>
                <AddUserInfor handleAddNewUser={this.handleAddNewUser}
                />
                <hr />
                <DisplayInfor listUser={this.state.listUsers} />
            </div>
        );
    }
}

export default MyComponent;