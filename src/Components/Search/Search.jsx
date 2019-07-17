import React, {Component} from 'react';
import SearchResult from './SearchResult';
import {Input} from 'antd';
import './Search.css';
import {database} from '../../model/firebase';


class SearchComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            themesData: null,
            themesCollection: null,
            searchActiveClass: 'search-component_empty'
        }
    }

    componentDidMount () {
        database.ref('themes').once('value', (snapShot) => {
            this.setState({
                themesData: snapShot.val()
            })
        })
    }

    searchThemes = (value) => {
        let themesCollection = [];
        if (value) {
            for (let key in this.state.themesData) {
                if (this.isInName(this.state.themesData[key], value) || this.isInDescription(this.state.themesData[key], value)) {
                    themesCollection.push(Object.assign({}, this.state.themesData[key], {themeID: key}));
                }
            }
            this.setThemeCollections(themesCollection, value)
        } else {
            this.clearSearchResult()
        }


    }

    isInName (theme, query) {
        return theme.themeName.toLowerCase().includes(query.toLowerCase());
    }

    isInDescription (theme, query) {
        return theme.themeDescription ? theme.themeDescription.toLowerCase().includes(query.toLowerCase()) : false;
    }

    setThemeCollections (themesCollection, query) {
        this.setState({
            themesCollection: themesCollection,
            searchActiveClass: 'search-component_active',
            searchQuery: query
        })
    }

    clearSearchResult () {
        this.setState({
            themesCollection: [],
            searchActiveClass: 'search-component_empty'
        })
    }

    render() {
        const { Search } = Input;
        let className = `search-component ${this.state.searchActiveClass}`;
        return <div className={className}>
            <div className="search-overlay" onClick={() => {this.clearSearchResult()}}></div>
            <div className="search-body">
                <Search
                    placeholder="Поиск по темам"
                    onSearch = {this.searchThemes}
                />
                <SearchResult result={this.state.themesCollection} query={this.state.searchQuery}/>
            </div>
        </div>
    }

}

export default SearchComponent;
