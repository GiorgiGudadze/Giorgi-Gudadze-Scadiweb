import React from "react";
import ProductsBag from "./ProductsBag";
import fetchData from "../Api/Api";
import {NavLink,Link} from 'react-router-dom'
class Header extends React.Component{
    constructor(props){
        super(props)
        this.state = {showBag:false,showCurrency:false,currencyArray:[],selectedAttr:[],totalPrice:0}
        this.checkAttribute = ''
        this.myRef = React.createRef();
    }

    componentDidUpdate(prevProps){

        if(this.props.addedProductsArray.length > 0){
            if(prevProps.addedProductsArray.length === 0 ){
                this.setState({showBag:false})
            }
        }

        let onOutsideCurrenyClick=(e)=>{
            if (this.myRef.current && !this.myRef.current.contains(e.target) && !e.target.closest('.checkoutNav__currencyCnt')) {
                this.setState({showCurrency:false})
              }
        }
        document.addEventListener('click', onOutsideCurrenyClick, true);
        return () => {
          document.removeEventListener('click', onOutsideCurrenyClick, true);
        };

    }
    equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    componentDidMount(){

      let getCurrency = async ()=>{
        let query = `query{
            currencies{
              label
              symbol
            }
            }`
      let currencyData = await fetchData(query)

      let currencyArray = currencyData.data.data.currencies

      this.setState({currencyArray})

    }
    getCurrency()

    }
    countTotal=()=>{
        let total = 0
        let uniqueArray = new Set(this.props.addedProductsArray)
        let myProductsArray = Array.from(uniqueArray)

        myProductsArray.map(m=>{
            m.prices.map(e=>{

            if(e.currency.label === this.props.currentCurrency){
                total+=e.amount * m.coun

            }

            })

        })
        
        return (Math.round(total * 100) / 100).toFixed(2)
        
    }

    componentDidUpdate(nextProps) {
        if (nextProps.currentCurrency !== this.props.currentCurrency) {
          this.countTotal()
        }
        
      }

    miniCheckout(){


        

        return(
            <ProductsBag total={this.countTotal()} attrList={this.props.attrList} selectAttr={this.props.selectAttr} currentCurrency={this.props.currentCurrency} onSubstruct={this.props.onSubstruct} sumUp={this.props.sumUp} selectedProducts={this.props.addedProductsArray} />
        )
    }

    coverBackground(){
        return(
            <div className="backgroundCover" onClick={(e)=>{
                if(e.target.className === 'backgroundCover'){
                    this.setState({showBag:false})
                }
            }
            }>

            </div>
        )
    }

    displayCurrency(m){
        return(
            <div ref={this.myRef} className="currencyCnt">
                <ul className="currencyCnt__ul">
                    {this.state.currencyArray.map(m=>(
                        
                    <li key={m.label} onClick={()=>{
                        this.props.selectedCurrency(m.label)
                        this.setState({showCurrency:false})
                    }} className={`currencyCnt__ul__li ${this.props.currentCurrency === m.label ? 'active' :''}`} key={m.label}>{m.label} {m.symbol}</li>
                    ))}

                </ul>
            </div>
        ) 
    }

    currencySymbol(){
        return this.state.currencyArray.map(m=>(
            this.props.currentCurrency === m.label ? <div key={m.symbol} className="currencySymbol">{m.symbol}</div> : ''
        ))

    }



    
    render(){
        let uniqueArray = new Set(this.props.addedProductsArray)

         
        return(
            <>
            <div className="headerCnt">
            <header>
                <div className="category">
                    <ul className="category__ul">
                        <li><NavLink exact activeClassName="active" to='/'>All Products</NavLink><div className="category__line"></div></li>
                        <li><NavLink activeClassName="active" to='/tech'>Tech</NavLink><div className="category__line"></div></li>
                        <li><NavLink activeClassName="active" to='/clothes'>Clothes</NavLink><div className="category__line"></div></li>
                    </ul>
                </div>
                <div className="pdpLogo">
                    <div className="divPdp"><div className="pdpLogo__img"></div></div>
                </div>
                <div className="checkoutNav">
                    <div className="checkoutNav__flex">
                        <div className="checkoutNav__currencyCnt" onClick={()=>{this.setState({showCurrency:!this.state.showCurrency})}}>

                            {this.currencySymbol()}
                            <img className={`${this.state.showCurrency ? 'turnArrow' : ''} `} src="/downArrow.png" alt="arrow" />
                        </div>
                        {this.state.showCurrency === true ? this.displayCurrency() : ''}
                        <div className="checkoutNav__flex_cartCnt">
                            {uniqueArray.size > 0 ? <div onClick={()=>{this.setState({showBag:!this.state.showBag}) }}>{uniqueArray.size}</div> : ''}
                            <img src="/cartIcon.png" alt="cart" style={{cursor:'pointer',display:'block'}} onClick={()=>{this.setState({showBag:!this.state.showBag}) }} />
                        </div>
                    </div>

                    
                    {this.state.showBag === true && this.props.addedProductsArray.length > 0 ? this.miniCheckout() : ''}

                </div>
            </header>
            </div>
            {this.state.showBag === true && this.props.addedProductsArray.length>0 ?  this.coverBackground(): ''}
            </>
        )
    }
}

export default Header;