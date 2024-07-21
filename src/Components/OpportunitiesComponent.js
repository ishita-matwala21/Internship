import React, { useEffect, useState } from 'react';
import opportunitiesData from '../opportunities.json';
import axios from 'axios';

import "../App.css";
import { useNavigate } from 'react-router-dom';

const OpportunityCard = ({ opportunity,appliedOpportunities  }) => {
    console.log(appliedOpportunities)
    const navigate = useNavigate();
    const {
        id,
        profile_name,
        company_name,
        stipend,
        locations,
        duration,
        start_date,
    } = opportunity;
    
    const isApplied = Array.isArray(appliedOpportunities) && appliedOpportunities.some(appliedOpportunity => appliedOpportunity.id === id);
    console.log(isApplied)
    const applyForOpportunity = async (opportunity) => {
        try {
          await axios.post('http://localhost:3000/auth/apply', { opportunity })
          .then((res) => {
            console.log(res)
          })
          navigate("/dashboard");

        } catch (error) {
          console.error('Error applying for opportunity:', error);
        }
      };
    return (
        <div className="opportunity-card">
            <h2>{profile_name}</h2>
            <p><strong>Company:</strong> {company_name}</p>
            <p><strong>Stipend:</strong> {stipend.salary}</p>
            <p><strong>Location:</strong> {locations.map(location => location.string).join(', ')}</p>
            <p><strong>Duration:</strong> {duration}</p>
            <p><strong>Start Date:</strong> {start_date}</p>
            {isApplied ? (
                <button disabled>Applied</button>
            ) : (
                <button onClick={() => applyForOpportunity(opportunity)}>Apply Now</button>
            )}
        </div>
    );
};

const OpportunitiesComponent = () => {
    const [appliedOpportunities, setAppliedOpportunities] = useState([]);
    useEffect(() => {
        fetchAppliedOpportunities();
    }, []);

    const fetchAppliedOpportunities = async () => {
        try {
            const response = await axios.get('http://localhost:3000/auth/applied-opportunities');
            setAppliedOpportunities(response.data);
        } catch (error) {
            console.error('Error fetching applied opportunities:', error);
        }
    };
    return (
        <div className="opportunities-container">
            <h1>Internship Opportunities</h1>
            <div className="opportunities-list">
                {Object.values(opportunitiesData.internships_meta).map(opportunity => (
                    <OpportunityCard key={opportunity.id} opportunity={opportunity} appliedOpportunities={appliedOpportunities}/>
                ))}
            </div>
        </div>
    );
};

export default OpportunitiesComponent;
