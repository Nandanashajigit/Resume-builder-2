import React, { useState } from 'react'
import { MdEditSquare } from "react-icons/md"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { FaXmark } from "react-icons/fa6"
import { toast } from 'react-toastify'
import {updateResumeAPI} from '../services/allAPI'
import jobRole from '../assets/jobRole.json'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxWidth: '95vw',
  maxHeight: '80vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

function Edit({ resumeData, setResumeData }) {
  const [open, setOpen] = useState(false)
  const [skillInput, setSkillInput] = useState('')

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // Returns a change handler for the given field name
  const updateField = (field) => (e) => {
    setResumeData({ ...resumeData, [field]: e.target.value })
  }

  const addSkill = () => {
    const value = skillInput.trim()
    if (!value) {
      toast.info('Please enter a valid skill!')
      return
    }

    const existing = resumeData.skills || []
    if (existing.some((s) => s.toLowerCase() === value.toLowerCase())) {
      toast.warn('Given skill already added')
      return
    }

    setResumeData({ ...resumeData, skills: [...existing, value] })
    setSkillInput('')
  }

  const removeSkill = (skill) => {
    setResumeData({
      ...resumeData,
      skills: (resumeData.skills || []).filter((s) => s !== skill),
    })
  }

  const handleUpdateResume=async()=>{
    const{fullName,location,job,email,phone,linkedin,github,degree,college,year,skills,
    summary}=resumeData
    if(fullName&&location&&job&&email&&phone&&linkedin&&github&&degree&&college&&year&&skills.
    length>0&&summary){
        const response= await updateResumeAPI(resumeData.id,resumeData)
        // console.log(response);

        if(response.status==200){
            toast.success("resume updated")
            handleClose()
        }
    }else{
        toast.info("please add valid details ")
    }

}

  return (
    <div>
      <button onClick={handleOpen} style={{ color: '#714a2f' }} className='btn'>
        <MdEditSquare className='fs-3' /> Edit CV
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Resume
          </Typography>

          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            {/* Personal Details */}
            <div>
              <h3>Personal Details</h3>
              <div className="p-3 d-flex flex-column gap-3">
                <TextField
                  id="standard-basic-name"
                  label="Full Name"
                  variant="standard"
                  fullWidth
                  value={resumeData.fullName || ''}
                  onChange={updateField('fullName')}
                />
                <TextField
                  id="standard-basic-loc"
                  label="Location"
                  variant="standard"
                  fullWidth
                  value={resumeData.location || ''}
                  onChange={updateField('location')}
                />
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="job-label">Choose Job Title</InputLabel>
                  <Select
                    labelId="job-label"
                    id="job-select"
                    value={resumeData.job || ''}
                    onChange={updateField('job')}
                    label="Choose Job Title"
                  >
                    {jobRole.jobRoles.map((job) => (
                      <MenuItem key={job} value={job}>
                        {job}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>

            {/* Contact Details */}
            <div>
              <h3>Contact Details</h3>
              <div className="p-3 d-flex flex-column gap-3">
                <TextField
                  id="standard-basic-email"
                  label="Email"
                  variant="standard"
                  fullWidth
                  value={resumeData.email || ''}
                  onChange={updateField('email')}
                />
                <TextField
                  id="standard-basic-num"
                  label="Contact Number"
                  variant="standard"
                  fullWidth
                  value={resumeData.phone || ''}
                  onChange={updateField('phone')}
                />
                <TextField
                  id="standard-basic-linkedin"
                  label="LinkedIn Link"
                  variant="standard"
                  fullWidth
                  value={resumeData.linkedin || ''}
                  onChange={updateField('linkedin')}
                />
                <TextField
                  id="standard-basic-github"
                  label="GitHub Link"
                  variant="standard"
                  fullWidth
                  value={resumeData.github || ''}
                  onChange={updateField('github')}
                />
              </div>
            </div>

            {/* Educational Details */}
            <div>
              <h3>Educational Details</h3>
              <div className="p-3 d-flex flex-column gap-3">
                <TextField
                  id="standard-basic-degree"
                  label="Bachelor's Degree"
                  variant="standard"
                  fullWidth
                  value={resumeData.degree || ''}
                  onChange={updateField('degree')}
                />
                <TextField
                  id="standard-basic-college"
                  label="College/University Name"
                  variant="standard"
                  fullWidth
                  value={resumeData.college || ''}
                  onChange={updateField('college')}
                />
                <TextField
                  id="standard-basic-year"
                  label="Year of Graduation"
                  variant="standard"
                  fullWidth
                  value={resumeData.year || ''}
                  onChange={updateField('year')}
                />
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3>Skills</h3>
              <div className="p-3 d-flex gap-2 align-items-center">
                <input
                  type="text"
                  placeholder="Add New Skill"
                  className="form-control"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addSkill()
                    }
                  }}
                />
                <Button onClick={addSkill} style={{ color: '#714a2f' }}>
                  Add
                </Button>
              </div>

              <h6>Added Skills :</h6>
              <div className="p-3 d-flex flex-wrap gap-2">
                {resumeData?.skills?.length > 0 ? (
                  resumeData.skills.map((skill) => (
                    <Button
                      key={skill}
                      variant="contained"
                      sx={{ backgroundColor: '#b19596' }}
                      className="my-1"
                      onClick={() => removeSkill(skill)}
                    >
                      {skill}
                      <FaXmark className="ms-2" />
                    </Button>
                  ))
                ) : (
                  <span className="text-muted">No skills added yet</span>
                )}
              </div>
            </div>

            {/* Summary */}
            <div>
              <h3>Summary</h3>
              <div className="p-3 d-flex flex-column gap-3">
                <TextField
                  id="standard-basic-summary"
                  label="Professional Summary"
                  multiline
                  variant="standard"
                  fullWidth
                  value={resumeData.summary || ''}
                  onChange={updateField('summary')}
                />
              </div>
            </div>

            <div>
              <Button
                className='btn btn-light'
                style={{ color: '#714a2f' }}
                onClick={handleUpdateResume}
              >
                Update
              </Button>
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default Edit