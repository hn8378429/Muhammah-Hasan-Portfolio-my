'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('')

    try {
      // Temporary simulation - Replace with actual email service
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // For now, just show success message
      // Later you can integrate EmailJS, Formspree, etc.
      setSubmitStatus('success')
      
      // Form reset
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      setSubmitStatus('error')
      console.error('Form submission failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contact-form">
      <h3>Send Me a Message</h3>
      <p>Fill out the form below and I'll get back to you as soon as possible.</p>
      
      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.2)',
          color: '#10b981',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid rgba(16, 185, 129, 0.3)'
        }}>
          ✅ Message sent successfully! I'll get back to you soon.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.2)',
          color: '#ef4444',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid rgba(239, 68, 68, 0.3)'
        }}>
          ❌ Failed to send message. Please try again or contact me directly.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input 
            type="text" 
            id="name" 
            name="name"
            className="form-control" 
            placeholder="Your full name" 
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            className="form-control" 
            placeholder="your.email@example.com" 
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input 
            type="text" 
            id="subject" 
            name="subject"
            className="form-control" 
            placeholder="What's this about?" 
            value={formData.subject}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea 
            id="message" 
            name="message"
            className="form-control" 
            placeholder="Tell me about your project or idea..."
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}