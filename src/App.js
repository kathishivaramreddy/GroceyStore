import React from 'react';
import {Route,Link} from 'react-router-dom';
import {ProductList} from './ProductList';
import {Fruits} from './Fruits';
import {Cart} from './Cart';
import {Vegetables} from './Vegetables';
import {Milk} from './Milk';
import {Meat} from './Meat';
import {Tea} from './Tea';
import {Coffee} from './Coffee';
import {Checkout} from './Checkout';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { cart : [{name:'',currency:'',price:null,quantity:null}] }
    this.handleAddToCart=this.handleAddToCart.bind(this);
    this.handleRemoveFromCart=this.handleRemoveFromCart.bind(this);

      }

  handleAddToCart(name,currency,price){
    //compare name and price if same update quantity otherwise add the product to the cart.
    var count;
    var setState=true;
    for( count =0 ; count<this.state.cart.length ;count++){

      if(name === this.state.cart[count].name){
        var newCart = [...this.state.cart]
        newCart[count].quantity= newCart[count].quantity+1
        this.setState({ cart: newCart})
        setState=false;
        }

    }

    if(setState){
      console.log('inside second if')
      this.setState({ cart: this.state.cart.concat([{name: name,currency:currency,price:price,quantity:1}]) })
      console.log('new object inserted into state')
        }
        console.log('in app',this.state.cart)
    }

     handleRemoveFromCart(name){

   this.setState({cart : this.state.cart.filter( data =>  data.name !== name)})
    }


  render() {

  return (
      <div>
        <div className="App">

          <header className="App-header">
            <h1 className="App-title" >Welcome to Grocery Store</h1>
          </header>


          <div>
            <hr/>
            <div className="dropdown">
              <button className="dropbtn">Home</button>
              <div className="dropdown-content">
                <Link to='/'>All Products</Link>
              </div>
            </div>

            <div className="dropdown">
              <button className="dropbtn">Vegetables</button>
              <div className="dropdown-content">
                <Link to='/fruits'>Fruits</Link>
                <Link to='organic'>Organic Vegetables</Link>
              </div>
            </div>

            <div className="dropdown">
              <button className="dropbtn">Dairy</button>
              <div className="dropdown-content">
                <Link to='/milk'>Milk</Link>
                <Link to='meat'>Meat</Link>

              </div>
            </div>

            <div className="dropdown">
              <button className="dropbtn">Beverages</button>
              <div className="dropdown-content">
                <Link to='tea'>Tea</Link>
                <Link to='coffee'>Coffee</Link>
              </div>
            </div>
            <div>

              <Route path='/fruits' component={() => <Fruits onClick={this.handleAddToCart.bind(this)} onRemove={this.handleRemoveFromCart.bind(this)}  />}/>
              <Route path='/organic' component={() => <Vegetables onClick={this.handleAddToCart.bind(this)} onRemove={this.handleRemoveFromCart.bind(this)}  />}/>
              <Route path='/milk' component={() => <Milk onClick={this.handleAddToCart.bind(this)}  onRemove={this.handleRemoveFromCart.bind(this)} />}/>
              <Route path='/meat' component={() => <Meat onClick={this.handleAddToCart.bind(this)}  onRemove={this.handleRemoveFromCart.bind(this)} />}/>
              <Route path='/tea' component={() => <Tea onClick={this.handleAddToCart.bind(this)}  onRemove={this.handleRemoveFromCart.bind(this)} />}/>
              <Route path='/coffee' component={() => <Coffee onClick={this.handleAddToCart.bind(this) }   onRemove={this.handleRemoveFromCart.bind(this)} />}/>
              <Route exact path='/checkout' component={Checkout}/>
              <Route exact path='/' component={() => <ProductList onClick={this.handleAddToCart.bind(this)} onRemove={this.handleRemoveFromCart.bind(this)}  />}/>
              </div>
            </div>


            <hr/>
          </div>

        <div className="cartboxed">
          <Cart data={this.state.cart}/>
        </div>
      </div>
    );
  }
}

export default App;
