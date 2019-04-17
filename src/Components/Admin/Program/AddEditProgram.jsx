import React, {Component} from 'react';
import AddNewProgramForm from '../../Forms/AddNewProgramForm';
import EditProgramForm from '../../Forms/EditProgramForm';

class AddEditProgram extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAddNewProgram: false,
            isEditProgram: false
        }
    }

    handleClick(flag) {
        this.setState({
            isAddNewProgram: flag,
            isEditProgram: !flag
        })
    }

    render() {
        const isAddButtonDisabled = this.state.isAddNewProgram ? 'disabled' : '',
              isEditButtonDisabled = this.state.isEditProgram ? 'disabled' : '';
        return (
            <div className="form-group">
                {this.state.isAddNewProgram ?
                    <div className="form-element">
                        <AddNewProgramForm/>
                    </div>
                 : null}
                {this.state.isEditProgram ?
                    <div className="form-element">
                        <EditProgramForm/>
                    </div>: null}
                <div className="actions">
                    <button type="submit" disabled={this.state.isAddNewProgram} className="ant-btn ant-btn-primary" onClick={()=> this.handleClick(true)}>
                        Добавить новую программу
                    </button>
                    <button type="submit" disabled={this.state.isEditProgram} className="ant-btn ant-btn-primary" onClick={()=> this.handleClick(false)}>
                        Редактировать программу
                    </button>
                </div>
            </div>
        )
    }

}

export default  AddEditProgram;