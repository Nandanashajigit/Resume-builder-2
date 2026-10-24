import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllDownloadResumesAPI } from '../services/allAPI'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

ChartJS.register(ArcElement, Tooltip, Legend);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



function Downloads() {
  const [allDownloadList, setAllDownloadList] = useState([])
const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const[label,setLabel]=useState([])
    const[value,setValue]=useState([])
const colorPallete=useState(['#044982','#b421b7','#cf3d15','#d4d713'])
const backgroundColor=label.map((value,index)=>colorPallete[index%colorPallete.length])
 const data = {
  labels:label,
  datasets: [
    {
      label: 'downloads',
      data: value,
      backgroundColor
    }
  ]
}

  useEffect(() => {
    getAllDownloads()
  }, [])

  const getAllDownloads = async () => {
    try {
      const result = await getAllDownloadResumesAPI()
      if (result.status === 200) {
        setAllDownloadList(result.data)
        const output={}
        result.data.forEach(item=>{
          const currentJob=item.job
          if(currentJob in output){
            output[currentJob]+-1

          }else{
            output[currentJob]=1
          }
        })
        setLabel(Object.keys(output))
        setValue(Object.values(output))
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
    <div className='container my-5'>
      <div className='d-flex justify-content-between align-items-center'>
        <h2>All Downloaded Resume Details</h2>
     
      </div>

      <p className='my-3 fw-bolder'>
        Total Downloaded resumes from our site is{' '}
        <span className='text-danger fs-4'>{allDownloadList.length}</span>
      </p>

      <div className='row my-5'>
        {allDownloadList.length > 0 ? (
          allDownloadList.map((item) => (
            <div key={item.id} className='col-lg-4 mb-3'>
              <div style={{ minHeight: '400px' }} className='shadow p-3 rounded'>
                <h6>Downloaded at {item.timeStamp || 'N/A'}</h6>
                <h5 className='mt-2'>{item.fullName || item.jobRole || 'Unnamed resume'}</h5>
                {item.fullName && <p className='text-muted mb-2'>{item.jobRole}</p>}

                <div className='mt-3 text-center'>
                  <Link to={`/view/${item.resumeID}`}>
                    {item.resumeIMG ? (
                      <img
                        className='w-100'
                        style={{ height: '250px', objectFit: 'contain' }}
                        src={item.resumeIMG}
                        alt='downloaded resume'
                      />
                    ) : (
                      <div
                        className='d-flex align-items-center justify-content-center border rounded text-muted'
                        style={{ height: '250px' }}
                      >
                        No preview saved
                      </div>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Nothing to display</p>
        )}
      </div>
    </div>
    <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      CV Download Count by Job Role
    </Typography>
    <Box id="modal-modal-description" sx={{ mt: 2 }}>
      <div className='d-flex justify-content-center align-items-center m-5'>
        <Pie data={data} />
      </div>
      <p style={{ textAlign: 'justify' }}>
        This chart provides an overview of the number of CV downloads associated with 
        different job roles on the website. It helps visualize the demand and engagement 
        for CVs across various career categories, making it easier to identify which 
        job roles attract the highest number of downloads. By comparing download counts 
        across roles, the chart can provide useful insights into user preferences and 
        the popularity of different career opportunities on the platform.
      </p>
    </Box>
  </Box>
</Modal>
    </>
  )
}

export default Downloads