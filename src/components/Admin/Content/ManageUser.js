import ModalCreateUser from './ModalCreateUser';
import './ManageUser.scss';
import { FcPlus } from 'react-icons/fc';
import TableUser from './TableUser';
import { useState, useEffect } from 'react';
import { getAllUsers } from '../../../services/apiService';
import ModalUpdateUser from './ModalUpdateUser';
import ModalShowUser from './ModalShowUser';

const ManageUser = (props) => {

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalShowUser, setShowModalShowUser] = useState(false);
    const [listUser, setListUser] = useState([]);
    const [dataSelectedUser, setDataSelectedUser] = useState({});

    // componentDidMount
    useEffect(() => {
        fetchListUsers();
    }, []);

    const fetchListUsers = async () => {
        const data = await getAllUsers();
        if (data && data.EC === 0) {
            setListUser(data.DT);
        }
    }

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(!showModalUpdateUser);
        setDataSelectedUser(user);
    }

    const handleClickBtnShow = (user) => {
        setShowModalShowUser(!showModalShowUser);
        setDataSelectedUser(user);
    }

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
                    <TableUser
                        listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnShow={handleClickBtnShow}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUsers={fetchListUsers}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    fetchListUsers={fetchListUsers}
                    dataUpdate={dataSelectedUser}
                    setDataUpdate={setDataSelectedUser}
                />
                <ModalShowUser
                    show={showModalShowUser}
                    setShow={setShowModalShowUser}
                    dataShow={dataSelectedUser}
                    setDataShowUser={setDataSelectedUser}
                />
            </div>
        </div>
    );
};

export default ManageUser;