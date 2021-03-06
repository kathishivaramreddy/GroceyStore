import {FETCH_PRODUCTS,FETCH_PRODUCTS_FAILURE} from './types'
import store from '../store';
import {sorting,sortByPrice} from '../Components/PriceSorter/PriceUtil';
import {searchProduct} from '../Components/Search/SearchUtil';
import {filterByPrice,filterByCategory} from '../Components/Filter/FilterUtil';
import isEmpty from 'lodash/isEmpty';

export const fetchProducts = (sort,search,filterPrice,filterCategory,url) => dispatch => {


    return fetch(url)
    .then(res => res.json())
    .then(data => {

      let {products} = data

      if(sort.length>0){
        products= sortByPrice(sort,products)
      }

      if(search.length>0){
        products=searchProduct(search,products)
      }

      if(!isEmpty(filterPrice)){
        products=filterByPrice(filterPrice,products)
      }

      if(!isEmpty(filterCategory)){
        products=filterByCategory(filterCategory,products)
      }
      return dispatch (
        {
        type:FETCH_PRODUCTS,
        payload:products
        }
      )

      }
    )
    // .catch(err => dispatch(fetchProductsFailure(err)))
}

// function fetchProductsFailure(err) {
//   return {
//     type: FETCH_PRODUCTS_FAILURE,
//     err
//   }
// }
