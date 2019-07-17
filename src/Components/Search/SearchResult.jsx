import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class SearchResult extends Component {
    render() {
        const {result} = this.props;
            let resultContent;
        let data = result && result.length ?  result.map((item) => {
            let itemName = <Link className="theme-link" to={`/themes/${item.themeID}`} title={item.themeName}>{item.themeName}</Link>,
                itemDescription = itemDescription ? <div className="theme-description">{item.themeDescription}</div> : '';
            return  <div key={item.themeID} className="search-item">{itemName}{itemDescription}</div>
        }) : `По запросу "${this.props.query}" ничего не найдено`;
        resultContent = data ? <div className="search-result">{data}</div>: '';
        return <div className="result-wrapper">{resultContent}</div>;
    }

}

export default SearchResult;
