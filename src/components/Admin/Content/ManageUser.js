import ModalCreateUser from './ModalCreateUser';
import './ManageUser.scss';
import { FcPlus } from 'react-icons/fc';
const { useState } = require("react");

const ManageUser = (props) => {

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);

    return (
        <div className="manager-user-container">
            <div className="manager-user-header">
                <h1 className='title'>Manager User</h1>
            </div>
            <div className="manager-user-main">
                <div className='btn-create-user'>
                    <button className='btn btn-primary' onClick={() => setShowModalCreateUser(!showModalCreateUser)}><FcPlus /> Add new user</button>
                </div>
                <div className='table-users-container'>
                    table user
                </div>
                <ModalCreateUser 
                show={showModalCreateUser} 
                setShow={setShowModalCreateUser}
                />
            </div>
        </div>
    );
};

export default ManageUser;