import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaBackward, FaForward, FaTrash } from 'react-icons/fa';
import { getAllResumesAPI, deleteResumesAPI } from '../services/allAPI';

function Allresumes() {
    const [allResumes, setAllResumes] = useState([])
    const [searchKey, setSearchKey] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const rowsPerPage = 4

    // 1. Filter based on search
    const filteredResumes = useMemo(() => {
        return allResumes.filter(item =>
            item.job?.toLowerCase().includes(searchKey.toLowerCase()) ||
            item.fullName?.toLowerCase().includes(searchKey.toLowerCase())
        )
    }, [allResumes, searchKey])

    // 2. Paginate the filtered list
    const totalPages = Math.max(1, Math.ceil(filteredResumes.length / rowsPerPage))
    const lastIndex = currentPage * rowsPerPage
    const firstIndex = lastIndex - rowsPerPage
    const currentResumes = filteredResumes.slice(firstIndex, lastIndex)

    // 3. Go back to page 1 whenever the search changes
    useEffect(() => {
        setCurrentPage(1)
    }, [searchKey])

    const getAllResumes = async () => {
        const result = await getAllResumesAPI()
        if (result.status == 200) {
            setAllResumes(result.data)
        }
    }

    const removeResume = async (id) => {
        // confirm BEFORE deleting
        if (confirm("Are you sure you want to delete resume")) {
            const response = await deleteResumesAPI(id)
            if (response.status == 200) {
                getAllResumes()
            }
        }
    }

    useEffect(() => {
        getAllResumes()
    }, [])

    // Keep page valid if the last item on a page is deleted
    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(totalPages)
    }, [totalPages, currentPage])

    return (
        <div className="my-5 container d-flex justify-content-center align-items-center flex-column">
            <h1>All Saved Resumes</h1>

            <p style={{ textAlign: 'justify' }} className="my-5">
                All resumes submitted to the platform in one place,
                allowing administrators or recruiters to efficiently
                view, search, filter, and manage candidate profiles.
                It provides a quick overview of available candidates
                and their key details, making the recruitment and
                candidate-selection process more organized and efficient.
            </p>

            <div className="d-flex justify-content-center align-items-center w-50">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name or job role..."
                    value={searchKey}
                    onChange={e =>{ setSearchKey(e.target.value);setCurrentPage(1)}}
                />
            </div>

            <div className="table-responsive w-100">
                <table className="my-5 table table-hover table-striped">
                    <thead>
                        <tr className="table-dark">
                            <th>#</th>
                            <th>Resume</th>
                            <th>Job Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentResumes.length > 0 ? (
                            currentResumes.map((resume, index) => (
                                <tr key={resume.id}>
                                    <td>{firstIndex + index + 1}</td>
                                    <td>
                                        <Link to={`/view/${resume.id}`}>{resume.fullName}</Link>
                                    </td>
                                    <td>{resume.job}</td>
                                    <td>
                                        <button onClick={() => removeResume(resume.id)} className="btn text-danger">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">Nothing to display</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="d-flex align-items-center justify-content-center">
                    <button
                        className="btn"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        <FaBackward />
                    </button>
                    {currentPage} of {totalPages}
                    <button
                        className="btn"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        <FaForward />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Allresumes;