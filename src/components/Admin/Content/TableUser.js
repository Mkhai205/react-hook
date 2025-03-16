

const TableUser = (props) => {
    const { listUser } = props;

    return (
        <>
            <table className="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.map((user, index) => (
                        <tr key={`table-users-${user.id}`}>
                            <th scope="row">{user.id}</th>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td className='text-center'>
                                <button 
                                className='btn btn-info'
                                onClick={() => props.handleClickBtnShow(user)}
                                >View</button>
                                <button 
                                className='btn btn-warning mx-3'
                                onClick={() => props.handleClickBtnUpdate(user)}
                                >Update</button>
                                <button className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>
                    ))}
                    {listUser && listUser.length === 0 && (
                        <tr>
                            <td colSpan='4' className='text-center'>No data</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}

export default TableUser;