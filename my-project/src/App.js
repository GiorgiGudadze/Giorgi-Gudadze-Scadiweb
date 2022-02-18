import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import fetchData from "./Api/Api";
import {BrowserRouter,Route,Link} from 'react-router-dom'
import Pdp from "./components/Pdp";
import Plp from "./components/Plp";
class App extends React.Component{

  constructor(props){
    super(props)
    this.state = {selectedProducts:[],checker:'',productsArray:[],currentCurrency:'USD',selectedAttr:[]}
  }

  selectCurrency = (label)=>{
    this.setState({currentCurrency:label})
  }

  componentDidMount(){
    
    let getData = async ()=>{
      let query = `query{
        category{
          products{
            id
            name
            category
            description
            gallery
            prices{
              currency{
                label
                symbol
              }
              amount
            }
            inStock
            attributes{
              name
              type
              items{
                displayValue
                value
              }
            }
          }
        }
      }`
      let productData = await fetchData(query)

      let newArray = productData.data.data.category.products.map(m=>{
        return {...m,coun:0}
      })
      this.setState({productsArray:newArray})

    }
    getData()

  }

  checkoutBag = (product,index)=>{

    product.coun += 1
    this.setState(prevState => ({
      selectedProducts: [...prevState.selectedProducts, product]
      
    }))

  }

  sumUp = (product) =>{
    product.coun += 1
    this.setState(prevState => ({
      selectedProducts: [...prevState.selectedProducts, product]
      
    }))
  }
  onSubstruct = (product) =>{


      if(product.coun === 1){
        product.coun = 0
        this.setState((prevState) => ({
          selectedProducts: prevState.selectedProducts.filter(f=> product.id !== f.id )

        }))

        if(this.state.selectedAttr.length>0){
          let newArray = this.state.selectedAttr.filter(m=>{
            return m.id !== product.id

          })
            this.setState({selectedAttr:newArray})
        }


      }
      else{
        product.coun -= 1
        this.setState(prevState => ({
          selectedProducts: [...prevState.selectedProducts]
          
        }))
      }


  }

  selectAttr= (attrVal,id,attrLabel)=>{
        
    if(this.state.selectedAttr.length >0){
        let k = 0;
        let newArray = this.state.selectedAttr.filter(m=>{
            if(m.attrLabel === attrLabel && m.id === id){
                k=1;
                m.attrLabel = attrLabel
                m.id = id
                m.attrVal = attrVal
                return {attrVal,attrLabel,id}
            }
            else{
                return m
            }
        })
        if(k===1){
            this.setState({selectedAttr:newArray})
        }
        else{
            this.setState(prevState => ({
            selectedAttr:[...prevState.selectedAttr,{attrVal,id,attrLabel}]
        }))

        }

    }
    else{
        this.setState({selectedAttr:[{attrVal,id,attrLabel}]})
    }

}

  render(){
    return(
        <>
        <BrowserRouter>

        <Header selectAttr={this.selectAttr} currentCurrency={this.state.currentCurrency} selectedCurrency={this.selectCurrency} onSubstruct={this.onSubstruct} sumUp={this.sumUp}  addedProductsArray={this.state.selectedProducts} attrList = {this.state.selectedAttr}/>

        <Route exact path="/" >
        <Home selectAttr={this.selectAttr} attrList = {this.state.selectedAttr} ctgName={'All Products'} currentCurrency={this.state.currentCurrency} productsArray={this.state.productsArray} addCart={this.checkoutBag} />
        </Route>

        <Route path="/tech" >
        <Home selectAttr={this.selectAttr} attrList = {this.state.selectedAttr} ctgName={'Tech'} currentCurrency={this.state.currentCurrency} productsArray={this.state.productsArray.filter(f=>(f.category === 'tech'))} addCart={this.checkoutBag} />
        </Route>

        <Route path="/clothes" >
        <Home selectAttr={this.selectAttr} attrList = {this.state.selectedAttr} ctgName={'Clothes'} currentCurrency={this.state.currentCurrency} productsArray={this.state.productsArray.filter(f=>(f.category === 'clothes'))} addCart={this.checkoutBag} />
        </Route>

        <Route exact path="/pdp/:id" render={({ match }) => (
          <Pdp selectAttr={this.selectAttr} attrList = {this.state.selectedAttr} addCart={this.checkoutBag} currentCurrency={this.state.currentCurrency} data={this.state.productsArray.filter(f=>(f.id === match.params.id))} />
          )} />
        
        <Route path="/plp" >
          <Plp onSubstruct={this.onSubstruct} sumUp={this.sumUp} selectAttr={this.selectAttr} attrList = {this.state.selectedAttr} selectedProducts={this.state.selectedProducts} currentCurrency={this.state.currentCurrency} />
        </Route>

        </BrowserRouter>
        </>

    )
  }

}

export default App;
