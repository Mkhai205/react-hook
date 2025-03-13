import React from 'react';

class DisplayInfor extends React.Component {

    state = {
        isShowListUser: true,
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
            <div>
                <div>
                    <button onClick={() => { this.handleShowHide() }}>
                        {this.state.isShowListUser ? 'Click to hide' : 'Click to show'}
                    </button>
                </div>
                {this.state.isShowListUser &&
                    <div>
                        {listUser.map((user, index) => {
                            // console.log(index);
                            return (
                                <div key={user.id} className={user.gender === 'male' ? 'blue' : 'pink'}>
                                    <br />
                                    <div>Name: {user.name}</div>
                                    <div>Age: {user.age}</div>
                                    <div>Gender: {user.gender}</div>
                                    <br />
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        )
    }
}

export default DisplayInfor;