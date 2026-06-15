import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Please fill in all the fields.');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.error || 'Failed to submit contact message');
      }
    } catch (error) {
      console.error('Contact submission error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please check if backend is running.');
    }
  };

  const containerStyles = {
    maxWidth: '650px',
    margin: '0 auto',
    padding: 'clamp(20px, 5vw, 40px)',
  };

  const titleStyles = {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '8px',
    position: 'relative',
    display: 'inline-block'
  };

  return (
    <section id="contact" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={titleStyles}>
          &lt; <span className="gradient-text">Contact</span> /&gt;
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '10px' }}>
          Have an interesting project or a position? Drop me a line!
        </p>
      </div>

      <div className="glass-panel" style={{ ...containerStyles, width: '100%' }}>
        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircle size={50} style={{ color: 'var(--accent-primary)', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Message Received!</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Thank you for reaching out. I'll get back to you shortly.
            </p>
            <button className="btn btn-primary" onClick={() => setStatus('idle')}>
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {status === 'error' && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '8px',
                padding: '12px 16px',
                marginBottom: '24px',
                color: '#f87171',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.9rem'
              }}>
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="form-group">
              <input
                type="text"
                name="name"
                id="name"
                placeholder=" "
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                disabled={status === 'submitting'}
                required
              />
              <label htmlFor="name" className="form-label">Your Name</label>
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                id="email"
                placeholder=" "
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                disabled={status === 'submitting'}
                required
              />
              <label htmlFor="email" className="form-label">Email Address</label>
            </div>

            <div className="form-group">
              <textarea
                name="message"
                id="message"
                placeholder=" "
                className="form-input"
                style={{ minHeight: '150px', resize: 'vertical' }}
                value={formData.message}
                onChange={handleChange}
                disabled={status === 'submitting'}
                required
              />
              <label htmlFor="message" className="form-label">Your Message</label>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Sending Message...' : 'Send Message'}
              <Send size={16} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
