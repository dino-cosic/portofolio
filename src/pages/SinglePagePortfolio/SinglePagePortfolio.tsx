import { motion, useScroll } from 'framer-motion';
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import profileImage from '@/assets/413A8961.jpg';
import { EmailIcon, LinkedInIcon } from '@/components/ui';
import { experiences, education, certifications, projects, services } from './data';
import './SinglePagePortfolio.css';

/**
 * SinglePagePortfolio Component
 * 
 * Performance Optimizations Applied:
 * 
 * 1. React Optimizations:
 *    - useMemo for static arrays (sections, navItems) to prevent recreation
 *    - useCallback for event handlers to maintain referential equality
 *    - Extracted static data to separate file to reduce bundle size
 *    - Throttled scroll handler with requestAnimationFrame
 *    - Passive event listeners for scroll
 * 
 * 2. CSS Optimizations:
 *    - will-change properties on animated elements
 *    - contain property for layout isolation
 *    - transform: translateZ(0) for GPU acceleration
 *    - Optimized animations with transform and opacity only
 * 
 * 3. Image Optimizations:
 *    - loading="eager" for above-the-fold hero image
 *    - decoding="async" for non-blocking rendering
 * 
 * 4. Build Optimizations:
 *    - Vite config with chunk splitting
 *    - Terser minification enabled
 *    - Dependency pre-bundling
 *    - Tree-shaking for unused code
 */
export function SinglePagePortfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Memoize sections array to prevent recreating on every render
  const sections = useMemo(() => ['home', 'about', 'experience', 'education', 'projects', 'services', 'contact'], []);

  // Memoize navigation items
  const navItems = useMemo(() => ['Home', 'About', 'Experience', 'Education', 'Projects', 'Services', 'Contact'], []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      // Show back to top button after scrolling down 300px
      setShowBackToTop(window.scrollY > 300);

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Throttle scroll event for better performance - increased interval for mobile
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [sections]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Memoize scroll function to prevent recreation on every render
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed nav
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  // Memoize menu toggle handler
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const handleNavClick = useCallback((item: string) => {
    scrollToSection(item.toLowerCase());
    closeMobileMenu();
  }, [scrollToSection, closeMobileMenu]);

  return (
    <div className="single-page-portfolio" ref={containerRef}>
      {/* Floating Navigation */}
      <motion.nav
        className="floating-nav"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="nav-container">
          <div className="nav-logo">DC</div>
          
          {/* Desktop Navigation */}
          <div className="nav-links">
            {navItems.map((item) => (
              <button
                key={item}
                className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
                onClick={() => scrollToSection(item.toLowerCase())}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="mobile-menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
          />
          
          {/* Menu */}
          <motion.div
            className="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="mobile-menu-content">
              {navItems.map((item) => (
                <button
                  key={item}
                  className={`mobile-menu-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
                  onClick={() => handleNavClick(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}

      {/* Progress Bar */}
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />

      {/* Home Section */}
      <section id="home" className="section hero-section">
        <div className="hero-background">
          <div className="gradient-orb orb-1" />
          <div className="gradient-orb orb-2" />
          <div className="gradient-orb orb-3" />
          <div className="grid-overlay" />
        </div>

        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="hero-greeting">Hello, I'm</span>
            <h1 className="hero-title">
              <span className="gradient-text">Dino Cosic</span>
            </h1>
            <p className="hero-subtitle">
              Senior Software Engineer specializing in <mark>Legacy Modernization</mark> and{' '}
              <mark>Cloud-Native Architecture</mark>
            </p>
            <p className="hero-description">
              I help enterprises modernize their .NET systems, cutting maintenance costs by 25% and reducing bugs by 15%
            </p>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">6+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10+</span>
                <span className="stat-label">Projects Delivered</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100+</span>
                <span className="stat-label">Students Mentored</span>
              </div>
            </div>

            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => scrollToSection('contact')}>
                Get in Touch
              </button>
              <button className="btn btn-secondary" onClick={() => scrollToSection('projects')}>
                View Work
              </button>
            </div>
          </motion.div>

          <motion.div
            className="hero-image-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="image-glow" />
            <img 
              src={profileImage} 
              alt="Dino Cosic" 
              className="hero-image"
              loading="eager"
              decoding="async"
            />
          </motion.div>
        </div>

        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => scrollToSection('about')}
        >
          <span>Scroll to explore</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="section-header">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            About <span className="gradient-text">Me</span>
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Building exceptional digital experiences through clean architecture and modern engineering practices
          </motion.p>
        </div>

        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p>
              I am a Senior Software Engineer and Technical Lead specializing in designing, building, and modernizing
              enterprise-grade systems with .NET, Azure, and modern cloud-native architecture.
            </p>
            <p>
              I've engineered mission-critical backends for financial, mortgage, and insurance platforms, including
              high-traffic systems processing 20,000+ concurrent orders.
            </p>
            <p>
              My approach covers the entire software development lifecycle—architecture, hands-on engineering, CI/CD
              automation, cloud infrastructure, and long-term maintainability.
            </p>

            <div className="specialties">
              <h3>Specialties</h3>
              <div className="specialty-tags">
                {[
                  'System Design & Architecture',
                  'Backend Engineering (C#, .NET)',
                  'DevOps & CI/CD',
                  'Technical Leadership',
                  'Agile Methodologies',
                  'Cloud Architecture',
                ].map((specialty) => (
                  <span key={specialty} className="specialty-tag">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-skills"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="skill-category">
              <h4>Backend & Cloud</h4>
              <div className="skill-tags">
                {['C#', '.NET', '.NET Framework', 'Azure', 'Azure Functions', 'Service Bus', 'Azure Data Factory', 'Azure Storage', 'RESTful APIs', 'MSSQL', 'MongoDB', 'PostgreSQL', 'Entity Framework', 'Dapper', 'xUnit', 'Integration testing', 'Mocking'].map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="skill-category">
              <h4>Architecture & DevOps</h4>
              <div className="skill-tags">
                {['Microservices', 'Domain-Driven Design (DDD)', 'Clean Architecture', 'Event-Driven Architecture', 'Azure DevOps', 'CI/CD Pipelines', 'Docker', 'Infrastructure as Code', 'Deployment Automation'].map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="skill-category">
              <h4>Frontend</h4>
              <div className="skill-tags">
                {['Angular', 'TypeScript', 'Web Development'].map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="skill-category">
              <h4>Leadership</h4>
              <div className="skill-tags">
                {['Technical Leadership', 'Team Mentorship', 'Agile Methodologies', 'Code Review', 'Stakeholder Management'].map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section - Horizontal */}
      <section id="experience" className="section experience-section">
        <div className="section-header">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Professional <span className="gradient-text">Experience</span>
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Transforming complex systems into scalable, cloud-native solutions
          </motion.p>
        </div>

        <div className="horizontal-scroll-container">
          <motion.div
            className="experience-cards"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="experience-card"
              >
                <div className="card-number">{String(index + 1).padStart(2, '0')}</div>
                <div className="card-header">
                  <h3 className="card-role">{exp.role}</h3>
                  <div className="card-company">{exp.company}</div>
                  <div className="card-period">{exp.period}</div>
                </div>
                <p className="card-summary">{exp.summary}</p>
                <div className="card-achievements">
                  {exp.achievements.map((achievement, idx) => (
                    <div key={idx} className="achievement-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span dangerouslySetInnerHTML={{ __html: achievement }} />
                    </div>
                  ))}
                </div>
                <div className="card-technologies">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Education Section - Horizontal */}
      <section id="education" className="section education-section">
        <div className="section-header">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Education & <span className="gradient-text">Certifications</span>
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Academic foundation and continuous learning
          </motion.p>
        </div>

        <div className="horizontal-scroll-container">
          <motion.div
            className="education-cards"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {education.map((edu, index) => (
              <div
                key={index}
                className="education-card"
              >
                <div className="edu-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
                <h3 className="edu-degree">{edu.degree}</h3>
                <div className="edu-field">{edu.field}</div>
                <div className="edu-institution">{edu.institution}</div>
                <div className="edu-period">{edu.period}</div>
                <p className="edu-description">{edu.description}</p>
              </div>
            ))}

            {certifications.map((cert, index) => (
              <div
                key={index}
                className="certification-card"
              >
                <div className="cert-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3 className="cert-name">{cert.name}</h3>
                <div className="cert-issuer">{cert.issuer}</div>
                {cert.period && <div className="cert-period">{cert.period}</div>}
                {cert.description && <p className="cert-description">{cert.description}</p>}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section - Horizontal */}
      <section id="projects" className="section projects-section">
        <div className="section-header">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            From idea to scale — delivering solutions for startups, SaaS, and Fortune 500 companies
          </motion.p>
        </div>

        <div className="horizontal-scroll-container">
          <motion.div
            className="projects-cards"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className="project-card"
              >
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                </div>
                <div className="project-achievements">
                  {project.achievements.map((achievement, idx) => (
                    <div key={idx} className="achievement-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
                <div className="project-impact">
                  <strong>Impact:</strong> {project.impact}
                </div>
                <div className="project-technologies">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section services-section">
        <div className="section-header">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How I Can <span className="gradient-text">Help</span>
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Comprehensive solutions for modernizing and scaling your enterprise systems
          </motion.p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="section-header">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Let's <span className="gradient-text">Connect</span>
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Ready to discuss how we can work together? Get in touch
          </motion.p>
        </div>

        <div className="contact-content">
          <motion.div
            className="contact-cards"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <a
              href="mailto:dino.cosic95@gmail.com"
              className="contact-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <EmailIcon size={32} className="contact-icon" />
              <h3>Email</h3>
              <p>dino.cosic95@gmail.com</p>
            </a>

            <a
              href="https://www.linkedin.com/in/dino-cosic"
              className="contact-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon size={32} className="contact-icon" />
              <h3>LinkedIn</h3>
              <p>linkedin.com/in/dino-cosic</p>
            </a>

            <a
              href="https://medium.com/@dino.cosic"
              className="contact-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="contact-icon">
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
              </svg>
              <h3>Medium</h3>
              <p>medium.com/@dino.cosic</p>
            </a>

            <a
              href="https://x.com/Dino_Codes"
              className="contact-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="contact-icon">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <h3>X (Twitter)</h3>
              <p>x.com/Dino_Codes</p>
            </a>
          </motion.div>

          <motion.div
            className="contact-cta"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p>Available for consulting, technical leadership, and full-time opportunities</p>
            <button className="btn btn-primary" onClick={() => (window.location.href = 'mailto:dino.cosic95@gmail.com')}>
              Send a Message
            </button>
          </motion.div>
        </div>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          className="back-to-top"
          onClick={() => scrollToSection('home')}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </motion.button>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Dino Cosic. All rights reserved.</p>
      </footer>
    </div>
  );
}
