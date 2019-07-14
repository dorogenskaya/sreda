import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './Main.css';
import Home from '../Home/Home';
import Theme from '../Theme/Theme';
import Program from '../Program/Program';
import CreateAnswerDrawer from '../Forms/createAnswerDrawer';
import NotFound from '../ErrorPages/NotFound';
import PageForbidden from '../ErrorPages/pageForbidden';
import Login from "../Forms/login";
import Admin from "../Admin/Admin";
import AddNewProgramForm from "../Forms/AddNewProgramForm";
import EditProgramNameForm from "../Forms/EditProgramNameForm";
import EditProgramContentForm from "../Forms/EditProgramContentForm";
import AddNewSubjectForm from '../Forms/AddNewSubjectForm';
import AddNewThemeForm from '../Forms/AddNewThemeForm';
import EditThemeForm from '../Forms/EditThemeForm';
import Profile from "../Profile/profile";
import Logout from "../Forms/logout";
import {ProtectedAuthRoute, ProtectedRoleRoute }from "../common/protectedRoute";


class Main extends Component {

    render() {
        const {user}= this.props;
        return (
            <main className="main">
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path="/themes/:id/question:id"
                           render={(props) => (<Theme {...props} user={user}/>)}/>
                    <Route path="/themes/:id"
                           render={(props) => (<Theme {...props} user={user}/>)}/>

                    <Route path='/program' component={Program}/>
                    <Route
                        path='/login'
                        render={(props) => (<Login {...props}/>)} />

                    <Route path='/logout' component={Logout}/>
                    <Route path='/register' component={Login}/>
                    <Route path="/not-found" component={NotFound}/>

                    <ProtectedAuthRoute
                        path='/profile/myprofile'
                        component={Profile}
                        user={user}
                    />
                    <Route path="/profile/:id"
                           render={(props) => (<Profile {...props} user={user}/>)}/>

                    <ProtectedRoleRoute
                        exact path='/admin'
                        component={Admin}
                        user={user}
                    />
                    <Route path="/admin/program/add" component={AddNewProgramForm}/>
                    <Route path="/admin/program/edit/name" component={EditProgramNameForm}/>
                    <Route path="/admin/program/edit" component={EditProgramContentForm}/>
                    <Route path="/admin/subject/add" component={AddNewSubjectForm}/>
                    <Route path="/admin/theme/add" component={AddNewThemeForm}/>
                    <Route path="/admin/theme/edit" component={EditThemeForm}/>
                    <Route path="/forbidden" component={PageForbidden}/>
                    <Redirect to="/not-found"/>

                </Switch>
                <Route path="/themes/:id/create-answer"
                       render={(props) => (<CreateAnswerDrawer {...props} user={user}/>)}
                />
            </main>
        )
    }
}
export default Main;