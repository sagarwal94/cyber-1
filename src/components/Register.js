import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    department: '',
    semester: '',
    phone: '',
    termsAccepted: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const departments = [
    'Computer Science',
    'Information Technology',
    'Cybersecurity',
    'Artificial Intelligence',
    'Data Science',
    'Software Engineering'
  ];

  const semesters = [
    'Fall 2024',
    'Spring 2025',
    'Summer 2025'
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear errors when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validate the form
  const validateForm = () => {
    let tempErrors = {};
    let formIsValid = true;

    // First Name validation
    if (!formData.firstName.trim()) {
      tempErrors.firstName = 'First name is required';
      formIsValid = false;
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      tempErrors.lastName = 'Last name is required';
      formIsValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
      formIsValid = false;
    }

    // Student ID validation
    if (!formData.studentId.trim()) {
      tempErrors.studentId = 'Student ID is required';
      formIsValid = false;
    } else if (!/^\d{7,8}$/.test(formData.studentId)) {
      tempErrors.studentId = 'Student ID must be 7-8 digits';
      formIsValid = false;
    }

    // Password validation
    if (!formData.password) {
      tempErrors.password = 'Password is required';
      formIsValid = false;
    } else if (formData.password.length < 8) {
      tempErrors.password = 'Password must be at least 8 characters';
      formIsValid = false;
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      tempErrors.confirmPassword = 'Please confirm your password';
      formIsValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match';
      formIsValid = false;
    }

    // Department validation
    if (!formData.department) {
      tempErrors.department = 'Please select a department';
      formIsValid = false;
    }

    // Semester validation
    if (!formData.semester) {
      tempErrors.semester = 'Please select a semester';
      formIsValid = false;
    }

    // Phone validation
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      tempErrors.phone = 'Phone number must be 10 digits';
      formIsValid = false;
    }

    // Terms acceptance validation
    if (!formData.termsAccepted) {
      tempErrors.termsAccepted = 'You must accept the terms and conditions';
      formIsValid = false;
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // In a real application, you would make an API request here
        // For now, we'll simulate a successful registration
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Store user data in localStorage/sessionStorage for demo purposes
        // In a real app, this would be handled by your backend
        const userData = {
          name: `${formData.firstName} ${formData.lastName}`,
          id: formData.studentId,
          email: formData.email,
          department: formData.department,
          semester: formData.semester,
          type: 'student'
        };
        
        sessionStorage.setItem('registeredUser', JSON.stringify(userData));
        
        // Show success message
        setRegistrationSuccess(true);
        
        // Redirect to login after a delay
        setTimeout(() => {
          navigate('/');
        }, 2000);
        
      } catch (error) {
        console.error('Registration error:', error);
        setErrors({ form: 'Registration failed. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <img src="/images/bau-logo.jpg" alt="BAU Logo" className="register-logo" />
        <h2>Student Registration</h2>
        
        {registrationSuccess ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Registration Successful!</h3>
            <p>Redirecting to login page...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="register-form">
            {errors.form && <div className="error-message form-error">{errors.form}</div>}
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name*</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? "input-error" : ""}
                />
                {errors.firstName && <div className="error-message">{errors.firstName}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Last Name*</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? "input-error" : ""}
                />
                {errors.lastName && <div className="error-message">{errors.lastName}</div>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "input-error" : ""}
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="studentId">Student ID*</label>
                <input
                  type="text"
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  className={errors.studentId ? "input-error" : ""}
                />
                {errors.studentId && <div className="error-message">{errors.studentId}</div>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password*</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "input-error" : ""}
                />
                {errors.password && <div className="error-message">{errors.password}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password*</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? "input-error" : ""}
                />
                {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="department">Department*</label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={errors.department ? "input-error" : ""}
                >
                  <option value="">Select Department</option>
                  {departments.map((dept, index) => (
                    <option key={index} value={dept}>{dept}</option>
                  ))}
                </select>
                {errors.department && <div className="error-message">{errors.department}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="semester">Semester*</label>
                <select
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className={errors.semester ? "input-error" : ""}
                >
                  <option value="">Select Semester</option>
                  {semesters.map((sem, index) => (
                    <option key={index} value={sem}>{sem}</option>
                  ))}
                </select>
                {errors.semester && <div className="error-message">{errors.semester}</div>}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone Number (Optional)</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? "input-error" : ""}
              />
              {errors.phone && <div className="error-message">{errors.phone}</div>}
            </div>
            
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="termsAccepted"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />
              <label htmlFor="termsAccepted">
                I accept the <a href="#" className="terms-link">Terms and Conditions</a>
              </label>
              {errors.termsAccepted && <div className="error-message">{errors.termsAccepted}</div>}
            </div>
            
            <button 
              type="submit" 
              className="register-button" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
            
            <div className="login-link">
              Already have an account? <Link to="/">Login here</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;