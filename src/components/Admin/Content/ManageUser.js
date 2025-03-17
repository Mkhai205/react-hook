import ModalCreateUser from './ModalCreateUser';
import './ManageUser.scss';
import { FcPlus } from 'react-icons/fc';
// import TableUser from './TableUser';
import TableUserPaginate from './TableUserPaginate';
import { useState, useEffect } from 'react';
import { getAllUsers, getUserWithPaginate } from '../../../services/apiService';
import ModalUpdateUser from './ModalUpdateUser';
import ModalShowUser from './ModalShowUser';
import ModalDeleteUser from './ModalDeleteUser';

const ManageUser = (props) => {
    const LIMIT_USER = 8;
    const [pageCount, setPageCount] = useState(0);
    const [listUser, setListUser] = useState([]);
    const [dataSelectedUser, setDataSelectedUser] = useState({});
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalShowUser, setShowModalShowUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);

    // componentDidMount
    useEffect(() => {
        // fetchGetListUsers();
        fetchGetListUsersWithPaginate(1);
    }, []);

    const fetchGetListUsersWithPaginate = async (page) => {
        const data = await getUserWithPaginate(page, LIMIT_USER);
        if (data.EC === 0) {       
            setListUser(data.DT.users);
            setPageCount(data.DT.totalPages);
        }
    }

    const fetchGetListUsers = async () => {
        const data = await getAllUsers();
        if (data.EC === 0) {
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

    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(!showModalDeleteUser);
        setDataSelectedUser(user);
    }

    return (
        <div className="manager-user-container">
            <div className="manager-user-header">
                <h1 className='title'>Manager User</h1>
            </div>
            <div className="manager-user-main">
                <div className='btn-create-user'>
                    <button
                        className='btn btn-primary'
                        onClick={() => setShowModalCreateUser(!showModalCreateUser)}
                    ><FcPlus /> Add new user</button>
                </div>
                <div className='table-users-container'>
                    {/* <TableUser
                        listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnShow={handleClickBtnShow}
                        handleClickBtnDelete={handleClickBtnDelete}
                    /> */}
                    <TableUserPaginate
                        listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnShow={handleClickBtnShow}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchGetListUsersWithPaginate={fetchGetListUsersWithPaginate}
                        pageCount={pageCount}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUsers={fetchGetListUsers}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataSelectedUser}
                    setDataUpdateUser={setDataSelectedUser}
                    fetchListUsers={fetchGetListUsers}
                />
                <ModalShowUser
                    show={showModalShowUser}
                    setShow={setShowModalShowUser}
                    dataShow={dataSelectedUser}
                    setDataShowUser={setDataSelectedUser}
                />
                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataSelectedUser}
                    fetchListUsers={fetchGetListUsers}
                />
            </div>
        </div>
    );
};

export default ManageUser;