import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import {fetchAll,getCategoriesAPI} from './Api/Api'
import {BrowserRouter,Route} from 'react-router-dom'
import Pdp from "./components/Pdp";
import Plp from "./components/Plp";
class App extends React.Component{

  constructor(props){
    super(props)
    this.state = {selectedProducts:[],checker:'',productsArray:[],currentCurrency:'USD',selectedAttr:[],ctgArray:[]}
  }

  selectCurrency = (label)=>{
    this.setState({currentCurrency:label})
  }

  componentDidMount(){
    let getData = async ()=>{

      let productData = await fetchAll()

      let newArray = productData.data.data.category.products.map(m=>{
        return {...m,coun:0}
      })

      let allCategories = await getCategoriesAPI()
      let ctg = allCategories.data.data.categories

      this.setState({productsArray:newArray})
      this.setState({ctgArray:ctg})

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

        <Header ctgArray={this.state.ctgArray} selectAttr={this.selectAttr} currentCurrency={this.state.currentCurrency} selectedCurrency={this.selectCurrency} onSubstruct={this.onSubstruct} sumUp={this.sumUp}  addedProductsArray={this.state.selectedProducts} attrList = {this.state.selectedAttr}/>

        {this.state.ctgArray.map(m=>{
          return(
            <Route key={m.name} exact path={m.name === 'all' ? '/' : `/${m.name}`}>
                
                <Home selectAttr={this.selectAttr} attrList = {this.state.selectedAttr} ctgName={m.name} currentCurrency={this.state.currentCurrency} productsArray={
                  m.name === 'all' ? this.state.productsArray : this.state.productsArray.filter(f=>(f.category === m.name))}
                   addCart={this.checkoutBag} />
            </Route>
          )
        })}

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
