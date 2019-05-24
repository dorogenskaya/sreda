import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './Main.css';
import Home from '../Home/Home';
import Theme from '../Theme/Theme';
import Program from '../Program/Program';
import CreateAnswerDrawer from '../Theme/createAnswerDrawer';
import NotFound from '../NotFound/NotFound';
import Register from "../Forms/register";
import Login from "../Forms/login";
import Admin from "../Admin/Admin";
import AddNewProgramForm from "../Forms/AddNewProgramForm";
import EditProgramNameForm from "../Forms/EditProgramNameForm";
import EditProgramContentForm from "../Forms/EditProgramContentForm";
import AddNewSubjectForm from '../Forms/AddNewSubjectForm';
import AddNewThemeForm from '../Forms/AddNewThemeForm';
import EditThemeForm from '../Forms/EditThemeForm';

class Main extends Component {
    render() {
        return (
            <main className="main">
                <Switch>
                    <Route path="/themes/:id" component={Theme}/>
                    <Route path='/theme' component={Theme}/>
                    <Route path='/program' component={Program}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path="/not-found" component={NotFound}/>
                    <Route path='/admin' exact component={Admin}/>
                    <Route path='/' exact component={Home}/>
                    <Route path="/admin/program/add" component={AddNewProgramForm}/>
                    <Route path="/admin/program/edit/name" component={EditProgramNameForm}/>
                    <Route path="/admin/program/edit" component={EditProgramContentForm}/>
                    <Route path="/admin/subject/add" component={AddNewSubjectForm}/>
                    <Route path="/admin/theme/add" component={AddNewThemeForm}/>
                    <Route path="/admin/theme/edit" component={EditThemeForm}/>
                    <Redirect to="/not-found"/>
                </Switch>
                <Route path="/themes/:id/create-answer"
                       render={(props) => (
                           <CreateAnswerDrawer {...props} themeId={'-LfViy9MwyKAAk1QCyJO'}/>
                       )}
                />
            </main>
        )
    }
}
export default Main;