import React from 'react';
import {Products} from '../Util/Products';
import PriceSorterContainer from '../../container/PriceSorterContainer';
import FilterContainer from '../../container/FilterContainer';
import SearchBarContainer from '../../container/SearchBarContainer';
import './ProductList.css';

export class ProductList extends React.Component {

  render(){

  return(

    <div className="products">

      <div className="productsheader">
        <SearchBarContainer className="searchBar"/>
        <PriceSorterContainer className="priceSorter"/>
        <h5>Products</h5>
      </div>

      <div className="filter">
        <FilterContainer className="filter"/>
      </div>

      <div className="productsboxed">
        <Products products={this.props.products} addCartAction={this.props.addCartAction}
          removeCartAction={this.props.removeCartAction} />
      </div>

    </div>);}
}
