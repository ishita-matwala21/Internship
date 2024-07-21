import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";

const Dashboard = () => {
    const navigate = useNavigate();
    const [appliedOpportunities, setAppliedOpportunities] = useState([]);
    const [personalDetails, setPersonalDetails] = useState({
        name: '',
        age: '',
        dob: '',
        image: ''
    });
    const [isEditing, setIsEditing] = useState(true);

    useEffect(() => {
        // Load personal details from localStorage if available
        const savedDetails = JSON.parse(localStorage.getItem('personalDetails'));
        if (savedDetails) {
            setPersonalDetails(savedDetails);
            setIsEditing(false); // Start in view mode if details are available
        }
        
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3000/auth/verify')
            .then(res => {
                if (!res.data.status) {
                    navigate("/login");
                } else {
                    fetchAppliedOpportunities();
                }
            })
            .catch(error => {
                console.error('Error verifying user:', error);
                navigate("/login");
            });
    }, [navigate]);

    const fetchAppliedOpportunities = async () => {
        try {
            const response = await axios.get('http://localhost:3000/auth/applied-opportunities');
            setAppliedOpportunities(response.data);
        } catch (error) {
            console.error('Error fetching applied opportunities:', error);
        }
    };

    const handleLogout = () => {
        axios.get("http://localhost:3000/auth/logout")
            .then((res) => {
                if (res.data.status) {
                    localStorage.clear();
                    navigate("/login");
                }
            }).catch(err => {
                console.log(err)
            })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPersonalDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPersonalDetails(prevDetails => ({
                    ...prevDetails,
                    image: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsEditing(false);
        // Save personal details to localStorage
        localStorage.setItem('personalDetails', JSON.stringify(personalDetails));
    }

    const handleEdit = () => {
        setIsEditing(true);
    }

    return (
        <div >
            <h1>Dashboard</h1>
            <button style={{position:"absolute", top:"10px", right:"10px"}} onClick={handleLogout}>Logout</button>
            <div className="dashboard-container">
                <div className="personal-details-card">
                    {isEditing ? (
                        <form onSubmit={handleFormSubmit} className="personal-details-form">
                            <label>
                                Name:
                                <input type="text" name="name" value={personalDetails.name} onChange={handleInputChange} required />
                            </label>
                            <label>
                                Age:
                                <input type="number" name="age" value={personalDetails.age} onChange={handleInputChange} required />
                            </label>
                            <label>
                                Date of Birth:
                                <input type="date" name="dob" value={personalDetails.dob} onChange={handleInputChange} required />
                            </label>
                            <label>
                                Image:
                                <input type="file" name="image" accept="image/*" onChange={handleImageChange} required />
                            </label>
                            <button type="submit">Save</button>
                        </form>
                    ) : (
                        <div className="personal-details-view">
                            {personalDetails.image && <img src={personalDetails.image} alt="Profile" className="profile-image" />}
                            <h2>{personalDetails.name}</h2>
                            <p><strong>Age:</strong> {personalDetails.age}</p>
                            <p><strong>Date of Birth:</strong> {personalDetails.dob}</p>
                            <button onClick={handleEdit}>Edit</button>
                        </div>
                    )}
                </div>
                <div className="opportunities-list">
                    {appliedOpportunities.map((opportunity, index) => (
                        <div key={index} className="opportunity-card">
                            <h2>{opportunity.profile_name}</h2>
                            <p><strong>Company:</strong> {opportunity.company_name}</p>
                            <p><strong>Duration:</strong> {opportunity.duration}</p>
                            <p><strong>Stipend:</strong> {opportunity.stipend}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
