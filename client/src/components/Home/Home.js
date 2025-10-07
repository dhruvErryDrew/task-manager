import { Link } from "react-router-dom";
import { useAtomValue } from 'jotai';
import { statsAtom } from '../../Atoms';
import { useEffect } from 'react';
import './Home.css';

function Home() {
    const stats = useAtomValue(statsAtom);
    
    return (
        <div className="home-container">
            <div className="home-content">
                <div className="title suse-mono" style={{ marginBottom: '2rem' }}>
                    <span style={{ color: '#009900' }}>TASK</span>
                    <span> </span>
                    <span style={{ color: '#D00000' }}>MANAGER</span>
                </div>
                
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-number">{stats.total}</div>
                        <div className="stat-label">Total Tasks</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">{stats.completed}</div>
                        <div className="stat-label">Completed</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">{stats.pending}</div>
                        <div className="stat-label">Pending</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">{stats.overdue}</div>
                        <div className="stat-label">Overdue</div>
                    </div>
                </div>
                
                <Link to="/tasks" className="start-button">
                    Manage Tasks
                </Link>
            </div>
        </div>
    );
}

export default Home;
