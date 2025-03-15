import ModalCreateUser from './ModalCreateUser';

const ManageUser = (props) => {
    return (
        <div className="manager-user-container">
            <div className="manager-user-header">
                <h1>Manager User</h1>
            </div>
            <div className="manager-user-main">
                <div>
                    <button>Add new user</button>
                </div>
                <div>
                    table user
                    <ModalCreateUser />
                </div>
            </div>
        </div>
    );
};

export default ManageUser;