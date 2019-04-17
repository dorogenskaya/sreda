import React, {Component} from 'react';
import AddNewProgramForm from '../Forms/AddNewProgramForm';
import AddNewSubjectForm from '../Forms/AddNewSubjectForm';
import AddNewThemeForm from '../Forms/AddNewThemeForm';

class Admin extends Component {
    render() {
        return (
            <div className="admin-section">
                <div className="admin-form">
                    <AddNewProgramForm/>
                </div>
                <div className="admin-form">
                    <AddNewSubjectForm/>
                </div>
                <div className="admin-form">
                    <AddNewThemeForm/>
                </div>
            </div>
        )
    }
}

export default Admin;