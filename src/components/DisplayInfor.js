import React, { useEffect, useState } from 'react';
import './DisplayInfor.scss';
import logo from '../logo.svg';

// stateless vs stateful component
// class DisplayInfor extends React.Component {

//     render() {
//         // console.log('>>> call me component render');
//         // props => properties
//         // props => read-only
//         // console.log(this.props);

//         // destructuring array/object
//         const { listUser } = this.props;
//         // console.log(listUser);
//         // console.table(listUser);

//         return (
//             // template + logic (JSX + JS
//             <div className='display-infor-container'>
//                 <img src={logo} className="App-logo" alt="logo" />
//                 <h2>Display Information</h2>
//                 {true &&
//                     // React.Fragment
//                     // <React.Fragment></React.Fragment> or <></>
//                     <>
//                         {listUser.map((user, index) => {
//                             // console.log(index);
//                             return (
//                                 <div key={user.id} className={user.gender === 'male' ? 'blue' : 'pink'}>
//                                     <div>
//                                         <div>Name: {user.name}</div>
//                                         <div>Age: {user.age}</div>
//                                         <div>Gender: {user.gender}</div>
//                                     </div>
//                                     <div>
//                                         <button onClick={() => this.props.handleDeleteUser(user.id)}>
//                                             Delete
//                                         </button>
//                                     </div>
//                                     <hr />
//                                 </div>
//                             )
//                         })}
//                     </>
//                 }
//             </div>
//         )
//     }
// }

const DisplayInfor = (props) => {
    const { listUser } = props;

    const [isShowHideListUser, setIsShowHideListUser] = useState(true);

    const handleShowHideListUser = () => {
        setIsShowHideListUser(!isShowHideListUser);
    };

    useEffect(() => {
        if(listUser.length === 0) {
            alert('No user infor');
        }
        console.log('>> call me useEffect');
    }, [listUser]);

    console.log('>> call me component render');
    

    return (
        <div className='display-infor-container'>
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Display Information</h2>
            <div>
                <button onClick={() => handleShowHideListUser()}>
                    {isShowHideListUser ? 'Click to hide list user' : 'Click to show list user'}
                </button>
            </div>
            {isShowHideListUser &&
                // React.Fragment
                // <React.Fragment></React.Fragment> or <></>
                <div className='list-user-container'>
                    {listUser.map((user, index) => {
                        // console.log(index);
                        return (
                            <div key={user.id} className={`${user.gender === 'male' ? 'blue' : 'pink'} user-container`}>
                                <div>
                                    <div>Name: {user.name}</div>
                                    <div>Age: {user.age}</div>
                                    <div>Gender: {user.gender}</div>
                                </div>
                                <div>
                                    <button onClick={() => props.handleDeleteUser(user.id)}> 
                                        Delete
                                    </button>
                                </div>
                                <hr />
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default DisplayInfor;