import React, { useEffect, useState, useRef } from 'react'
import { FaFileDownload } from 'react-icons/fa'
import { AiFillBackward } from 'react-icons/ai'
import Preview from '../Components/Preview'
import Edit from '../Components/Edit'
import { Link, useParams } from 'react-router-dom'
import { viewResumeAPI, downloadResumesAPI } from '../services/allAPI'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

function View() {
  const { id } = useParams()
  const [resume, setResume] = useState({})
  const previewRef = useRef()

  const getResume = async () => {
    try {
      const response = await viewResumeAPI(id)
      if (response.status == 200) {
        setResume(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getResume()
  }, [id])

  // Upload the canvas image to Cloudinary and return its URL
  const uploadToCloudinary = (canvas) =>
    new Promise((resolve, reject) => {
      canvas.toBlob(async (blob) => {
        if (!blob) return reject(new Error('Could not create image'))
        try {
          const formData = new FormData()
          formData.append('file', blob)
          formData.append('upload_preset', 'resumes')
          const result = await fetch(
            'https://api.cloudinary.com/v1_1/h2up24c7/image/upload',
            { method: 'POST', body: formData }
          )
          const serverData = await result.json()
          resolve(serverData.secure_url)
        } catch (err) {
          reject(err)
        }
      }, 'image/png')
    })

  const generatePDF = async (imgData, canvas, imageURL) => {
    // 1. Build the PDF (keep aspect ratio, fit inside the page)
    const pdf = new jsPDF()
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    let imgWidth = pageWidth
    let imgHeight = (canvas.height * imgWidth) / canvas.width
    if (imgHeight > pageHeight) {
      imgHeight = pageHeight
      imgWidth = (canvas.width * imgHeight) / canvas.height
    }
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)

    // 2. Save download history
    const today = new Date()
    const timeStamp = `${today.toLocaleDateString()}, ${today.toLocaleTimeString()}`
    try {
      const result = await downloadResumesAPI({
        timeStamp,
        resumeIMG: imageURL,
        resumeID: id,
        jobRole: resume.job,
      })
      if (result.status != 201) {
        console.log('History not saved', result)
      }
    } catch (err) {
      console.log('History error', err)
    }

    // 3. Download the PDF
    pdf.save(`${resume.fullName}-CV.pdf`)
  }

  const downloadCv = async () => {
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
      })
      const imgData = canvas.toDataURL('image/png')
      const imageURL = await uploadToCloudinary(canvas)
      await generatePDF(imgData, canvas, imageURL)
    } catch (err) {
      console.log(err)
      alert('Download failed. Please try again.')
    }
  }

  return (
    <div>
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-8">
            {/* navigation icons */}
            <div className="d-flex justify-content-center align-items-center">
              {/* download */}
              <button onClick={downloadCv} style={{ color: '#714a2f' }} className="btn me-2">
                <FaFileDownload /> Download
              </button>
              {/* edit */}
              <Edit resumeData={resume} setResumeData={setResume} />
              {/* back */}
              <Link to={'/form'} style={{ color: '#714a2f' }} className="btn">
                <AiFillBackward />
              </Link>
            </div>
            {/* preview component */}
            <div className="p-5" ref={previewRef}>
              <Preview resumeData={resume} />
            </div>
          </div>
          <div className="col-lg-2"></div>
        </div>
      </div>
    </div>
  )
}

export default View