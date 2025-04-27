const TableQuiz = (props) => {
    const { listQuiz, handleClickBtnUpdate, handleClickBtnDelete } = props;

    return (
        <>
            <table className="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.map((quiz, index) => (
                        <tr key={`table-quiz-${quiz.id}`}>
                            <th>{quiz.id}</th>
                            <td>{quiz.name}</td>
                            <td>{quiz.description}</td>
                            <td>{quiz.difficulty}</td>
                            <td className='text-center'>
                                <button
                                    className='btn btn-warning mx-3'
                                    onClick={() => handleClickBtnUpdate(quiz)}
                                >Update</button>
                                <button
                                    className='btn btn-danger'
                                    onClick={() => handleClickBtnDelete(quiz)}
                                >Delete</button>
                            </td>
                        </tr>
                    ))}
                    {listQuiz && listQuiz.length === 0 && (
                        <tr>
                            <td colSpan='4' className='text-center'>No data</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}

export default TableQuiz;