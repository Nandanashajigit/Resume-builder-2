import React from 'react';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

function Preview({ resumeData }) {
  // Safe fallback so the component never crashes while data is loading
  const data = resumeData || {};
  const skills = Array.isArray(data.skills) ? data.skills : [];

  return (
    <div>
      <div className="w-100">
        <h2>{data.fullName}</h2>
        <p className="fs-6 lh-1">Phone: {data.phone}</p>
        <p className="fs-6 lh-1">Email: {data.email}</p>
        <p className="fs-6 lh-1">Linkedin: {data.linkedin}</p>
        <p className="fs-6 lh-1">Github: {data.github}</p>
        <p className="fs-6 lh-1">Location: {data.location}</p>

        <Divider className="bg-dark my-3" />
        <h4>Professional Summary</h4>
        <p>{data.summary}</p>

        <Divider className="bg-dark my-3" />
        <h4>Technical Skills</h4>
        <div>
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <span key={index} className="me-2 mb-2 d-inline-block">
                <Button variant="text" className="text-dark">
                  {skill}
                </Button>
              </span>
            ))
          ) : (
            <p className="text-muted">No skills added yet.</p>
          )}
        </div>

        <Divider className="bg-dark my-3" />
        <h4>Education</h4>
        <p className="fs-6 lh-1">Bachelor's Degree in {data.degree}</p>
        <p className="fs-6 lh-1">University/College Name: {data.college}</p>
        <p className="fs-6 lh-1">Year of Graduation: {data.year}</p>
      </div>
    </div>
  );
}

export default Preview;