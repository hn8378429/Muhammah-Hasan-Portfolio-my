'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import emailjs from 'emailjs-com'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [particles, setParticles] = useState<Array<{left: string, delay: string, duration: string}>>([])
  const heroRef = useRef(null)
  const skillsRef = useRef(null)
  const nameRef = useRef(null)

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  // Particles ko client-side par hi generate karo
  useEffect(() => {
    setParticles(
      [...Array(50)].map(() => ({
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 20}s`,
        duration: `${15 + Math.random() * 10}s`
      }))
    )
  }, [])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Header scroll effect
    const handleScroll = () => {
      const header = document.getElementById('header')
      if (header && window.scrollY > 50) {
        header.classList.add('scrolled')
      } else if (header) {
        header.classList.remove('scrolled')
      }
    }

    window.addEventListener('scroll', handleScroll)

    // 3D Name Animation
    if (nameRef.current) {
      const nameElement = nameRef.current as HTMLElement;
      
      // Mouse move effect for 3D
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth) * 50 - 25;
        const y = (e.clientY / window.innerHeight) * 50 - 25;
        
        gsap.to(nameElement, {
          duration: 0.5,
          rotationY: x * 0.5,
          rotationX: -y * 0.5,
          transformPerspective: 1000,
          ease: "power2.out"
        });
      };

      // Mouse leave to reset
      const handleMouseLeave = () => {
        gsap.to(nameElement, {
          duration: 1,
          rotationX: 0,
          rotationY: 0,
          ease: "elastic.out(1, 0.5)"
        });
      };

      nameElement.addEventListener('mousemove', handleMouseMove);
      nameElement.addEventListener('mouseleave', handleMouseLeave);

      // Floating animation
      gsap.to(nameElement, {
        duration: 3,
        y: -10,
        rotationY: 5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true
      });
    }

    // Hero animations
    const tl = gsap.timeline();

    tl.fromTo('.hero-name-3d', 
      {
        y: 100,
        opacity: 0,
        rotationY: 90
      },
      {
        duration: 1.5,
        y: 0,
        opacity: 1,
        rotationY: 0,
        ease: 'power3.out'
      }
    )
    .fromTo('.hero h1 span', 
      {
        y: 50,
        opacity: 0
      },
      {
        duration: 1,
        y: 0,
        opacity: 1,
        ease: 'power3.out'
      }, '-=0.8')
    .fromTo('.hero p', 
      {
        y: 30,
        opacity: 0
      },
      {
        duration: 1,
        y: 0,
        opacity: 1,
        stagger: 0.2,
        ease: 'power3.out'
      }, '-=0.5')
    .fromTo('.btn-group', 
      {
        y: 30,
        opacity: 0
      },
      {
        duration: 1,
        y: 0,
        opacity: 1,
        ease: 'power3.out'
      }, '-=0.5');

    // Floating elements animation
    gsap.from('.floating-element', {
      duration: 2,
      scale: 0,
      opacity: 0,
      stagger: 0.2,
      ease: 'back.out(1.7)'
    })

    // Skills progress bars animation
    const skillBars = document.querySelectorAll('.skill-progress')
    skillBars.forEach(bar => {
      const width = bar.getAttribute('data-width')
      if (width) {
        gsap.to(bar, {
          scrollTrigger: {
            trigger: bar,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          },
          width: `${width}%`,
          duration: 2,
          ease: 'power2.out'
        })
      }
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Form handle functions
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
      // YAHAN APNI EMAILJS VALUES DALENGE
      const result = await emailjs.send(
        'YOUR_SERVICE_ID',      // EmailJS Service ID - YEH CHANGE KARNA HAI
        'YOUR_TEMPLATE_ID',     // EmailJS Template ID - YEH CHANGE KARNA HAI  
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'hn8378429@gmail.com' // Aapka email
        },
        'YOUR_PUBLIC_KEY'       // EmailJS Public Key - YEH CHANGE KARNA HAI
      )

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
      console.error('Email sending failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactItems = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      content: 'hn8378429@gmail.com',
      link: 'mailto:hn8378429@gmail.com'
    },
    {
      icon: 'fab fa-github',
      title: 'GitHub',
      content: 'github.com/hn8378429',
      link: 'https://github.com/hn8378429'
    },
    {
      icon: 'fab fa-linkedin',
      title: 'LinkedIn',
      content: 'Muhammad Hasan',
      link: 'https://linkedin.com/in/muhammad-hasan'
    },
    {
      icon: 'fas fa-globe',
      title: 'Portfolio',
      content: 'hassan-portfolio-final.vercel.app',
      link: 'https://hassan-portfolio-final.vercel.app'
    }
  ]

  const projects = [
    {
      title: "Personal Portfolio Website",
      description: "A fully responsive portfolio website showcasing my work and skills, built with modern web technologies.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS"],
      icon: "fas fa-laptop-code"
    },
    {
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with user authentication and modern responsive design.",
      tech: ["Next.js", "Python", "Tailwind CSS"],
      icon: "fas fa-shopping-cart"
    },
    {
      title: "AI-Powered Chat Application",
      description: "Intelligent chat application leveraging agentic AI for enhanced user interactions and automated responses.",
      tech: ["Python", "Agentic AI", "JavaScript"],
      icon: "fas fa-robot"
    },
    {
      title: "Task Management System",
      description: "Collaborative task management platform with real-time updates and modern user interface.",
      tech: ["TypeScript", "Tailwind CSS", "Next.js"],
      icon: "fas fa-tasks"
    }
  ]

  const skills = [
    {
      category: "Frontend Development",
      description: "Creating responsive and interactive user interfaces",
      items: [
        { name: "HTML/CSS", percentage: 95 },
        { name: "JavaScript", percentage: 90 },
        { name: "TypeScript", percentage: 85 },
              { name: "Tailwind CSS", percentage: 93 },
        { name: "Next.js", percentage: 88 }
      ]
    },
    {
      category: "Backend Development",
      description: "Building robust server-side applications",
      items: [
        { name: "Python", percentage: 85 }
      ]
    },
    {
      category: "AI & Machine Learning",
      description: "Exploring the future of intelligent applications",
      items: [
        { name: "Agentic AI", percentage: 75 },
        { name: "Machine Learning", percentage: 70 },
        { name: "AI Integration", percentage: 80 },
        { name: "Data Analysis", percentage: 72 }
      ]
    }
  ]

  return (
    <main>
      {/* Header */}
      <header id="header">
        <div className="container">
          <nav className="navbar">
            <a href="#" className="logo">Muhammad Hasan<span>.</span></a>
            <div 
              className="menu-toggle" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i className="fas fa-bars"></i>
            </div>
            <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
              <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
              <li><a href="#about" onClick={() => setIsMenuOpen(false)}>About</a></li>
              <li><a href="#skills" onClick={() => setIsMenuOpen(false)}>Skills</a></li>
              <li><a href="#projects" onClick={() => setIsMenuOpen(false)}>Projects</a></li>
              <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section with 3D Name */}
      <section className="hero" id="home" ref={heroRef}>
        <div className="container">
          <div className="hero-content">
            <h1>
              <span 
                ref={nameRef} 
                className="hero-name-3d"
                style={{
                  display: 'inline-block',
                  transformStyle: 'preserve-3d',
                  cursor: 'pointer'
                }}
              >
                Muhammad Hasan
              </span>
              <span>Full Stack Developer & AI Enthusiast</span>
            </h1>
            <p>Hi, I’m Muhammad Hasan — a creative Full Stack Developer and AI enthusiast passionate about crafting fast, modern, and intelligent web experiences.</p>
            <p>I love turning ideas into interactive, responsive, and visually captivating digital products using HTML, CSS, JavaScript, TypeScript, Next.js, and Tailwind CSS. Trained under the Governor IT Initiative at Governor House, Sindh, I’m also exploring Agentic AI to bridge the gap between web development and artificial intelligence.</p>
            <div className="btn-group">
              <a href="#projects" className="btn btn-primary">View My Work</a>
              <a href="#contact" className="btn btn-secondary">Get In Touch</a>
            </div>
          </div>
        </div>
        <div className="floating-elements">
          <div className="floating-element element-1"></div>
          <div className="floating-element element-2"></div>
          <div className="floating-element element-3"></div>
        </div>
        
        {/* Animated Background Particles */}
        <div className="particles-container">
          {particles.map((particle, i) => (
            <div 
              key={i} 
              className="particle" 
              style={{
                left: particle.left,
                animationDelay: particle.delay,
                animationDuration: particle.duration
              }}
            ></div>
          ))}
        </div>
      </section>

      {/* About Section with Image */}
      <section id="about">
        <div className="container">
          <div className="section-title">
            <h2>About Me</h2>
            <p>Get to know more about my journey and passion</p>
          </div>
          <div className="about-content">
            <div className="about-text">
              <h3>I’m Muhammad Hasan, a passionate Front-End Developer trained under the Governor IT Initiative at Governor House, Sindh.</h3>
              <p>I specialize in HTML, CSS, JavaScript, TypeScript, and Next.js, which I use to build fast, responsive, and visually appealing web applications.</p>
              <p>Currently, I’m also exploring Agentic AI at Governor House, learning how artificial intelligence can shape the future of modern web development.</p>
              <p>I’m deeply committed to continuous learning and love transforming creative ideas into meaningful digital solutions. When I’m not coding, I enjoy exploring new technologies, improving my skills, and collaborating with other developers to create innovative and impactful projects.</p>
            </div>
            <div className="about-image">
              <div className="profile-image">
                <img 
                  src="\download (2).jpg" 
                  alt="Muhammad Hasan"
                  className="profile-photo"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" ref={skillsRef}>
        <div className="container">
          <div className="section-title">
            <h2>Skills & Expertise</h2>
            <p>My current skill levels and areas of continuous learning</p>
          </div>
          <div className="skills-container">
            {skills.map((skillCategory, index) => (
              <div key={index} className="skill-category">
                <h3>{skillCategory.category}</h3>
                <p>{skillCategory.description}</p>
                {skillCategory.items.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.percentage}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress" 
                        data-width={skill.percentage}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="container">
          <div className="section-title">
            <h2>Featured Projects</h2>
            <p>A showcase of my recent work and contributions to various projects</p>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-image">
                  <i className={`${project.icon} fa-3x`}></i>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href="#" className="project-link">
                      <i className="fas fa-external-link-alt"></i> Live Demo
                    </a>
                    <a href="#" className="project-link">
                      <i className="fab fa-github"></i> Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="container">
          <div className="section-title">
            <h2>Let's Work Together</h2>
            <p>Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.</p>
          </div>
          <div className="contact-container">
            <div className="contact-info">
              {contactItems.map((item, index) => (
                <div key={index} className="contact-item">
                  <div className="contact-icon">
                    <i className={item.icon}></i>
                  </div>
                  <div className="contact-details">
                    <h4>{item.title}</h4>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      {item.content}
                    </a>
                  </div>
                </div>
              ))}
            </div>
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
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-about">
              <h3>Muhammad Hasan</h3>
              <p>Full Stack Developer passionate about creating innovative solutions with modern technologies and AI integration.</p>
              <div className="btn-group" style={{ marginTop: '20px' }}>
                <a href="#contact" className="btn btn-primary" style={{ padding: '10px 20px' }}>
                  Hire Me
                </a>
                <a href="#projects" className="btn btn-secondary" style={{ padding: '10px 20px' }}>
                  View Work
                </a>
              </div>
            </div>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-tech">
              <h4>Connect</h4>
              <ul>
                <li><a href="https://github.com/hn8378429" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://linkedin.com/in/muhammad-hasan" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="mailto:hn8378429@gmail.com">Email</a></li>
                <li><a href="#contact">Resume</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Muhammad Hasan. All rights reserved. | Built with ❤️ using Next.js & GSAP</p>
            <a href="https://github.com/hn8378429" target="_blank" rel="noopener noreferrer">
              Follow me on GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
