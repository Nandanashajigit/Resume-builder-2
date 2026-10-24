import React from 'react'
import { IoDocumentTextSharp } from "react-icons/io5";
import { FaFileDownload } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Resumesteps() {
    return (
        <>
            <div style={{ minHeight: '90vh' }} className="mt-5">

                <h1 className="text-center">
                    Create an ATS Friendly Resume in Minutes with AI
                </h1>

                <div className="container mt-5">
                    <div className="row">

                        <div className="col-md-1"></div>

                        <div className="col-md-4 rounded p-5 shadow text-center">

                            <IoDocumentTextSharp
                                className="fs-1 text-primary mb-3"
                            />

                            <h4 className="mt-3">
                                Add your Details
                            </h4>

                            <p>
                                Our AI will generate skills and summary
                            </p>

                            <h5>Step 1</h5>

                        </div>

                        <div className="col-md-2"></div>

                        <div className="col-md-4 rounded p-5 shadow text-center">

                            <FaFileDownload
                                className="fs-1 text-danger mb-3"
                            />

                            <h3 className="mt-3">
                                Download Your Resume
                            </h3>

                            <p>
                                Download CV as PDF and start applying
                            </p>

                            <h5>Step 2</h5>

                        </div>

                        <div className="col-md-1"></div>

                    </div>
                </div>

                <div className="mt-5 text-center">

                    <Link
                        to="/form"
                        style={{ backgroundColor: '#714a2f' }}
                        className="btn text-light"
                    >
                        Let's Start
                    </Link>

                </div>

            </div>
        </>
    )
}

export default Resumesteps