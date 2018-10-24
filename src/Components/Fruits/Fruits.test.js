import React from 'react';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
import {shallow} from 'enzyme';
import {Fruits} from './Fruits';


describe('product list test', () => {
  let wrapper;
  const addelement = jest.fn();
  const removeelement = jest.fn();
  const event = {target : {value :'low'}}
  const priceCheck = {target :{name:'price1', checked:true}}
  const priceCheck2= {target :{name:'price2', checked:true}}
  const categoryCheck = {target :{name:'tea', checked:true}}
  const categoryCheck1 = {target :{name:'fruits', checked:true}}

  beforeEach(() =>{
    wrapper = shallow(<Fruits onAdd={addelement} onRemove={removeelement} onSearch={''} />);
  });

  it('should call a function on button click', () => {
    wrapper.find('button').at(0).simulate('click');
    wrapper.find('button').at(0).simulate('click');
    expect(addelement).toHaveBeenCalledTimes(2);
    wrapper.find('button').at(1).simulate('click');
    expect(removeelement).toHaveBeenCalled();
  });

  it('should have image element with source attribute', () => {
    expect(wrapper.find('img').at(0).props().src).toEqual('apple.jpg');
  });

  it('should render PriceSorter',() => {

    expect(wrapper.exists('PriceSorter')).toEqual(true);
  })

  it('should render Filter Box',() => {

    expect(wrapper.exists('Filter')).toEqual(true);

  })
  it('should return searched product if found',() => {
    const wrapper1 = shallow(<Fruits onAdd={addelement} onRemove={removeelement} onSearch={'apple'} />);
    expect(wrapper1.find('img').at(0).props().src).toEqual('apple.jpg')
  })

  it('should sort based on price value selected',()=> {

    const fn = wrapper.find('PriceSorter').props().sorter
    fn(event);
    expect(wrapper.find('img').at(0).props().src).toEqual('pear.jpg');

  })

  it('should filter based on price seleted',() => {
      const pricehandler = wrapper.find('Filter').props().onPriceFilter
      pricehandler(priceCheck);
      pricehandler(priceCheck2);
      expect(wrapper.find('img').at(0).props().src).toEqual('grapes.jpg');
  })
  it('should filter based on category seleted',() => {
      const categoryhandler = wrapper.find('Filter').props().onCategoryFilter
      categoryhandler(categoryCheck);
      expect(wrapper.find('img').length).toEqual(0);
  })
  it('should filter based on category and price seleted',() => {
      const categoryhandler = wrapper.find('Filter').props().onCategoryFilter
      const pricehandler = wrapper.find('Filter').props().onPriceFilter
      categoryhandler(categoryCheck1);
      pricehandler(priceCheck)
      expect(wrapper.find('img').length).toEqual(2);
  })

});