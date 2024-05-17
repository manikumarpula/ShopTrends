import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    companyName: '',
    email: '',
    phone: '', 
    password: '',
    cpassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    // Validation for each field
    switch (name) {
      case 'companyName':
        if (!value.trim()) {
          setErrors({ ...errors, companyName: 'Company name is required' });
        } else {
          setErrors({ ...errors, companyName: '' });
        }
        break;
      case 'email':
        if (!value.trim() || !isValidEmail(value)) {
          setErrors({ ...errors, email: 'Valid email is required' });
        } else {
          setErrors({ ...errors, email: '' });
        }
        break;
      case 'phone':
        if (!value.trim() || !isValidPhone(value)) {
          setErrors({ ...errors, phone: 'Valid phone number is required' });
        } else {
          setErrors({ ...errors, phone: '' });
        }
        break;
      case 'password':
        if (!value.trim()) {
          setErrors({ ...errors, password: 'Password is required' });
        } else {
          setErrors({ ...errors, password: '' });
        }
        break;
      case 'cpassword':
        if (value !== user.password) {
          setErrors({ ...errors, cpassword: 'Passwords do not match' });
        } else {
          setErrors({ ...errors, cpassword: '' });
        }
        break;
      default:
        break;
    }
  };

  const register = async (e) => {
    e.preventDefault();

    const { companyName, email, phone, password, cpassword } = user;

    const res = await fetch('/adminRegister', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        companyName, email, phone, password, cpassword
      })
    });
    const data = await res.json()
    if (res.status === 201) {
      localStorage.setItem('token', data.token)
      window.alert("Registration Successful!!");
      navigate('/');
    }
    else {
      window.alert("Registration Failed!!");
    }
  };

  const isValidEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const isValidPhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <div className="welcome-message">
            <h1>Welcome to ShopTrends</h1>
            <p>Please register to create an account.</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="registration-form">
            <h2>Register</h2>
            <form onSubmit={register}>
              <div className="mb-3">
                <label htmlFor="companyname" className="form-label">Company Name</label>
                <input type="text" className={`form-control ${errors.companyName ? 'is-invalid' : ''}`} id="companyname" name="companyName" placeholder="Enter your Company Name" value={user.companyName} onChange={handleInputs} />
                {errors.companyName && <div className="invalid-feedback">{errors.companyName}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="email" name="email" placeholder="Enter Email" value={user.email} onChange={handleInputs} />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input type="text" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} id="phone" name="phone" placeholder="Enter Phone Number" value={user.phone} onChange={handleInputs} />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="password" name="password" placeholder="Enter Password" value={user.password} onChange={handleInputs} />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input type="password" className={`form-control ${errors.cpassword ? 'is-invalid' : ''}`} id="confirmPassword" name="cpassword" placeholder="Confirm Password" value={user.cpassword} onChange={handleInputs} />
                {errors.cpassword && <div className="invalid-feedback">{errors.cpassword}</div>}
              </div>
              <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <p className="mt-3">Already registered? <a href="/login">Click here</a> to login.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;


// Mickey@2504