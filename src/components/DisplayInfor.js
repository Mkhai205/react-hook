import React from 'react';
import './DisplayInfor.scss';
import logo from '../logo.svg';

class DisplayInfor extends React.Component {
    // babel compiler
    constructor(props) {
        super(props);
        this.state = {
            isShowListUser: true,
        }
    }

    handleShowHide() {
        this.setState({
            isShowListUser: !this.state.isShowListUser
        });
    }

    render() {
        // props => properties
        // props => read-only
        // console.log(this.props);

        // destructuring array/object
        const { listUser } = this.props;
        // console.log(listUser);
        // console.table(listUser);

        return (
            // template + logic (JSX + JS
            <div className='display-infor-container'>
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Display Information</h2>
                <div>
                    <button onClick={() => { this.handleShowHide() }}>
                        {this.state.isShowListUser ? 'Click to hide' : 'Click to show'}
                    </button>
                </div>
                {this.state.isShowListUser &&
                    // React.Fragment
                    // <React.Fragment></React.Fragment> or <></>
                    <>
                        {listUser.map((user, index) => {
                            // console.log(index);
                            return (
                                <div key={user.id} className={user.gender === 'male' ? 'blue' : 'pink'}>
                                    <div>
                                        <div>Name: {user.name}</div>
                                        <div>Age: {user.age}</div>
                                        <div>Gender: {user.gender}</div>
                                    </div>
                                    <div>
                                        <button onClick={() => this.props.handleDeleteUser(user.id)}>
                                            Delete
                                        </button>
                                    </div>
                                    <hr />
                                </div>
                            )
                        })}
                    </>
                }
            </div>
        )
    }
}

export default DisplayInfor;