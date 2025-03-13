import React from 'react';

class DisplayInfor extends React.Component {
    render() {
        // props => properties
        // props => read-only
        // console.log(this.props);

        // destructuring array/object
        const { listUser } = this.props;
        // console.log(listUser);

        return (
            <div>
                {listUser.map((user, index) => {
                    console.log(index);
                    return (
                        <div key={user.id}>
                            <div>Name: {user.name}</div>
                            <div>Age: {user.age}</div>
                            <br />
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default DisplayInfor;