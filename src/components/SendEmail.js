import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const EmailForm = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      const response = await emailjs.send('service_v9gxlxd', 'template_os3htfq', {
        to,
        subject,
        message,
      }, '_1Pi1XEw7MSM4PvJG');

      console.log('Email sent successfully:', response);
      setStatusMessage('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      setStatusMessage('Error sending email. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow" style={{ maxWidth: '600px', margin: 'auto' }}>
        <form onSubmit={sendEmail}>
          <div className="mb-3 row">
            <label htmlFor="to" className="col-sm-3 col-form-label">
              To:
            </label>
            <div className="col-sm-9">
              <input type="email" className="form-control" placeholder='Email' id="to" value={to} onChange={(e) => setTo(e.target.value)} required />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="subject" className="col-sm-3 col-form-label">
              Subject:
            </label>
            <div className="col-sm-9">
              <input type="text" className="form-control" placeholder='Subject' id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="message" className="col-sm-3 col-form-label">
              Body:
            </label>
            <div className="col-sm-9">
              <textarea className="form-control" placeholder='Message' id="message" rows="4" value={message} onChange={(e) => setMessage(e.target.value)} required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Send Email
          </button>
        </form>
        {statusMessage && <p className="mt-3">{statusMessage}</p>}
      </div>
    </div>
  );
};

export default EmailForm;
