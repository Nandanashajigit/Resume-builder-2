import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toast } from 'react-toastify';

import jobSkills from '../assets/jobSkills.json';
import summaries from '../assets/summaries.json';
import jobRole from '../assets/jobRole.json';
import { saveResumeAPI } from '../services/allAPI';

const steps = [
    'Basic Informations',
    'Contact Details',
    'Educational Details',
    'Review & Submit'
];

function Userinputs({ setResumeData, resumeData }) {

    const navigate = useNavigate();
    const [activeStep, setActiveStep] = React.useState(0);
    const [saving, setSaving] = React.useState(false);

    const handleNext = () => {
        setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    // Helper so every field uses the same update logic
    const updateField = (field) => (e) => {
        setResumeData({
            ...resumeData,
            [field]: e.target.value
        });
    };

    const renderStepContent = (stepCount) => {
        switch (stepCount) {
            // Step 1: Personal Details
            case 0:
                return (
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
                                <InputLabel id="job-label">
                                    Choose Job Title
                                </InputLabel>

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
                );

            // Step 2: Contact Details
            case 1:
                return (
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
                );

            // Step 3: Educational Details
            case 2:
                return (
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
                );

            // Step 4: Review and Submit
            case 3:
                return (
                    <div>
                        <h3>Review & Submit</h3>

                        <p>
                            Our AI will generate Skills & Summary according
                            to your job role. Once the form is submitted,
                            you won't be able to update the resume details.
                            If you want to proceed, please click the{' '}
                            <b>Generate AI Skills and Summary</b> button to
                            submit.
                        </p>

                        <Typography><b>Name:</b> {resumeData.fullName}</Typography>
                        <Typography><b>Job Role:</b> {resumeData.job}</Typography>
                        <Typography><b>Location:</b> {resumeData.location}</Typography>
                        <Typography><b>Email:</b> {resumeData.email}</Typography>
                        <Typography><b>Phone:</b> {resumeData.phone}</Typography>
                        <Typography><b>LinkedIn:</b> {resumeData.linkedin}</Typography>
                        <Typography><b>GitHub:</b> {resumeData.github}</Typography>
                        <Typography><b>Degree:</b> {resumeData.degree}</Typography>
                        <Typography><b>College:</b> {resumeData.college}</Typography>
                        <Typography><b>Graduation Year:</b> {resumeData.year}</Typography>
                    </div>
                );

            default:
                return null;
        }
    };

    const generateSkillsandSummary = () => {
        if (!resumeData.job) {
            toast.info('Please choose a job title first');
            setActiveStep(0);
            return;
        }

        setResumeData({
            ...resumeData,
            skills: jobSkills[resumeData.job] || [],
            summary: summaries[resumeData.job] || ''
        });
        handleNext();
    };

    const handleAddresume = async () => {
        const {
            fullName,
            location,
            job,
            email,
            phone,
            linkedin,
            github,
            degree,
            college,
            year,
            skills,
            summary
        } = resumeData;

        const allFilled =
            fullName && location && job && email && phone &&
            linkedin && github && degree && college && year &&
            skills && skills.length > 0 && summary;

        if (!allFilled) {
            toast.info('Please fill missing fields');
            return;
        }
try {
    setSaving(true);
    const response = await saveResumeAPI(resumeData);

    if (response.status === 201) {
        toast.success('Resume created');
        const resumeId = response.data.id;
        setTimeout(() => {
            navigate(`/view/${resumeId}`);
        }, 2000);
    } else {
        toast.error('Could not save the resume. Please try again.');
    }
} catch (err) {
    console.log(err);
    toast.error('Something went wrong. Please try again.');
} finally {
    setSaving(false);
}
        
    };

    return (
        <Box sx={{ width: '100%', p: 3 }}>
            {/* Stepper */}
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {/* All steps completed */}
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed successfully!
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />

                        <Button onClick={handleAddresume} disabled={saving}>
                            {saving ? 'Saving...' : 'Finish'}
                        </Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        Step {activeStep + 1} of {steps.length}
                    </Typography>

                    {/* Current step content */}
                    <Box sx={{ mt: 2 }}>
                        {renderStepContent(activeStep)}
                    </Box>

                    {/* Navigation buttons */}
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>

                        <Box sx={{ flex: '1 1 auto' }} />

                        {activeStep === steps.length - 1 ? (
                            <Button onClick={generateSkillsandSummary}>
                                Generate AI Skills and Summary
                            </Button>
                        ) : (
                            <Button onClick={handleNext}>
                                Next
                            </Button>
                        )}
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}

export default Userinputs;