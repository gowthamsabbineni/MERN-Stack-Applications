import React, { Component } from 'react';
import ProjectsSummary from './dashboardComponents/projectsSummary';
import EmployeeSummary from './dashboardComponents/employeeSummary';
import ActiveProjects from './dashboardComponents/activeProjects';
import InActiveEmployees from './dashboardComponents/inactiveEmployees';
class dashboard extends Component {
    render() {
        return (
            <div>
                <div className="dashboardrowdiv">
                    <div className="childdiv">
                        <ProjectsSummary/>
                    </div>
                    <div className="childdiv">
                        <ActiveProjects/>
                    </div>
                </div>
                <div className="dashboardrowdiv">
                    <div className="childdiv">
                    <InActiveEmployees/>
                    </div>
                    <div className="childdiv">
                        <EmployeeSummary/>
                    </div>
                </div>
            </div>
        )
    }
}

export default dashboard;