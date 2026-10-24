import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';

function Header() {

  const aboutMessage="An AI rBuilder suggest job-specific keywords, professional summaries, and skill recommendations to make the resume more effective and ATS (Applicant Tracking System) friendly. The main goal of the AI Powered Resume Builder is to simplify the resume creation process and help job seekers build professional, well-structured resumes in a few minutes. Users can select templates, edit content, preview their resume, and download it in formats such as PDF."

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" className='bg-dark'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img
              src="https://play-lh.googleusercontent.com/0SvTgxj_sr97U8JosxNonUECXnArdyTYwVC8mGvyWgQR06AaNwvuth-M6ZYayB4GHcenh7sp6Zqy1IpyBU5luQ"
              alt="AI Resume Builder logo"
              width="40"
              height="40"
            />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" className="text-light text-decoration-none fw-bolder">
              AI-Resume Builder
            </Link>
          </Typography>

          <Link to="/all-resumes" className="text-light text-decoration-none">
            ALL RESUMES
          </Link>

          <Link to="/download" className="text-light text-decoration-none mx-5">
            ALL DOWNLOADS
          </Link>

          <Tooltip title={aboutMessage}>
            <Button color="inherit" className="fs-6">ABOUT US</Button>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header