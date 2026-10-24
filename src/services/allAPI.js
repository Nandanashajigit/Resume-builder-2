import axiosService from "../api/axiosService";

export const saveResumeAPI=async(resumeDetails)=>{
    return await axiosService('POST','/resumes',resumeDetails)
}

export const viewResumeAPI=async(resumeId)=>{
    return await axiosService('GET',`/resumes/${resumeId}`,{})
}

export const getAllResumesAPI = async () => {
    return await axiosService('GET', `/resumes`, {})
}


export const deleteResumesAPI=async(resumeId)=>{
    return await axiosService('DELETE',`/resumes/${resumeId}`,{})
}


export const downloadResumesAPI=async(resumeDetails)=>{
    return await axiosService('POST',`/downloads`,resumeDetails)
}


export const getAllDownloadResumesAPI =async()=>{
    return await axiosService('GET',`/downloads`,{})
}
export const updateResumeAPI =async(resumeId,resumeDetails)=>{
    return await axiosService('PUT',`/resumes/${resumeId}`,resumeDetails)
}