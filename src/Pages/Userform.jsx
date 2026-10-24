import React, { useState } from 'react'
import Userinputs from '../Components/Userinputs'
import Preview from '../Components/Preview'

function Userform() {

    const [resumeData, setResumeData] = useState({
        fullName: "",
        location: "",
        job: "",
        email: "",
        phone: "",
        linkedin: "",
        github: "",
        degree: "",
        college: "",
        year: "",
        skills: [],
        summary: ""
    })

    return (
        <div className='container my-5'>
            <div className="row">
                <div className="col-lg-6">
                    <Userinputs
                        resumeData={resumeData}
                        setResumeData={setResumeData}
                    />
                </div>

                <div className="col-lg-6">
                    { resumeData.fullName&&<Preview resumeData={resumeData} />}
                </div>
            </div>
        </div>
    )
}

export default Userform