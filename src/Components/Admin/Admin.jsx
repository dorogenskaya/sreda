import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

class Admin extends Component {
    render() {
        return (
            <main className={`admin-section`}>
                <nav className="AdminNavigation">
                    <h3>Добавление и редактирование программ</h3>
                    <ul className="NavList">
                        <li><Link className="nav-link" to="/admin/program/add">Добавление новой программы</Link></li>
                        <li><Link className="nav-link" to="/admin/program/edit/name">Редактирование названия программы</Link></li>
                        <li><Link className="nav-link" to="/admin/program/edit/theme">Редактирование содержимого программы</Link></li>
                    </ul>
                    <h3>Добавление и редактирование предметов</h3>
                    <ul className="NavList">
                        <li><Link className="nav-link" to="/admin/subject/add">Добавление нового предмета</Link></li>
                    </ul>
                    <h3>Добавление и редактирование тем</h3>
                    <ul className="NavList">
                        <li><Link className="nav-link" to="/admin/theme/add">Добавление новой темы</Link></li>
                    </ul>
                </nav>
            </main>
        )
    }
}

export default Admin;