import ModalCreateUser from './ModalCreateUser';
import './ManageUser.scss';
import { FcPlus } from 'react-icons/fc';
import TableUserPaginate from './TableUserPaginate';
import { useState, useEffect } from 'react';
import { getUserWithPaginate } from '../../../services/apiService';
import ModalUpdateUser from './ModalUpdateUser';
import ModalShowUser from './ModalShowUser';
import ModalDeleteUser from './ModalDeleteUser';

const ManageUser = (props) => {
    const LIMIT_USER = 8;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [listUser, setListUser] = useState([]);
    const [dataSelectedUser, setDataSelectedUser] = useState({});
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalShowUser, setShowModalShowUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);

    useEffect(() => {
        fetchGetListUsersWithPaginate(1);
    }, []);

    const fetchGetListUsersWithPaginate = async (page) => {
        try {
            const data = await getUserWithPaginate(page, LIMIT_USER);
            if (data.EC === 0) {
                setListUser(data.DT.users);
                setPageCount(data.DT.totalPages);
            } else {
                console.error('Error fetching users:', data.EM);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataSelectedUser(user);
    }

    const handleClickBtnShow = (user) => {
        setShowModalShowUser(true);
        setDataSelectedUser(user);
    }

    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true);
        setDataSelectedUser(user);
    }

    return (
        <div className="manager-user-container">
            <div className="manager-user-header">
                Manager User
            </div>

            <hr />

            <div className="manager-user-main">
                <div className='btn-create-user'>
                    <button
                        className='btn btn-primary'
                        onClick={() => setShowModalCreateUser(true)}
                    ><FcPlus /> Add new user</button>
                </div>
                <div className='table-users-container'>
                    <TableUserPaginate
                        listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnShow={handleClickBtnShow}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchGetListUsersWithPaginate={fetchGetListUsersWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    fetchListUsers={fetchGetListUsersWithPaginate}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataSelectedUser}
                    setDataUpdateUser={setDataSelectedUser}
                    currentPage={currentPage}
                    fetchListUsers={fetchGetListUsersWithPaginate}
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
                    setCurrentPage={setCurrentPage}
                    fetchListUsers={fetchGetListUsersWithPaginate}
                />
            </div>
        </div>
    );
};

export default ManageUser;