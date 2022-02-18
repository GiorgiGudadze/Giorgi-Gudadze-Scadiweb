import React from "react";
import {Link} from 'react-router-dom'
class ProductsBag extends React.Component{

    constructor(props){
        super(props)
        this.state={myProductsArray:[]}

    }

    renderAttrubtes(attrubteArray,id){

        if(attrubteArray){
            
            return attrubteArray.map((m)=>{
                if(m.type === 'swatch'){
                    return(
                    <div key={m.name} style={{order:1}}>
                    {m.items.map((e)=>(
                        <div onClick={()=>{this.props.selectAttr(e.value,id,m.name)}} className={`miniCheckoutCnt__item_attr_color ${this.checkAttr(id,m.name,e.value)}`} key={e.value} style={{backgroundColor:`${e.value}`}}></div>))}
                    </div>
                    )
                    
                }
                // m.name e.val
                else{
                    return(
                    <div key={m.name} style={{order:2}}>
                        {m.items.map((e)=>(
                        <div className={`miniCheckoutCnt__item_attr_text ${this.checkAttr(id,m.name,e.value)}`} key={e.value} onClick={()=>{this.props.selectAttr(e.value,id,m.name)}}>{e.value}</div>))}
                    </div>
                    )
                }
            })
        }
        else{
            return ''
        }
    }

    checkAttr=(id,label,val)=>{
        
        for(let list of this.props.attrList){
            if(list.id === id && list.attrLabel === label && list.attrVal === val){
                return 'active'
            }
        }
        
    }

    productPrice(priceArray,mult){
        return priceArray.map(m=>{
          if(m.currency.label === this.props.currentCurrency){
            return(
                <div key={m.currency.label} className="miniCheckoutCnt__item_price">{m.currency.symbol}{(Math.round((m.amount * mult) * 100) / 100).toFixed(2)}</div>
            )
          }
        })
      }

      getSymbol(priceArray){
        return priceArray.map(m=>{
            if(m.currency.label === this.props.currentCurrency){
              return(
                m.currency.symbol
              )
            }
          })
      }

    displayMiniCart(){
        
        let uniqueArray = new Set(this.props.selectedProducts)
        let myProductsArray = Array.from(uniqueArray)

        return(
            <>
            {myProductsArray.map(m=>{
                return(
                <>
                <div className="miniCheckoutCnt__item" key={m.id}>

                    <div className="miniCheckoutCnt__item_flex1">
                        <div className="miniCheckoutCnt__item_name">{m.name}</div>
                        <div className="miniCheckoutCnt__item_price">{this.productPrice(m.prices,m.coun)}</div>
                        <div className="miniCheckoutCnt__item_attr">{this.renderAttrubtes(m.attributes,m.id)}</div>
                    </div>
                    <div className="miniCheckoutCnt__item_quantityCnt">
                        <div onClick={()=>{this.props.sumUp(m)}}><img style={{display:'block',cursor:'pointer'}} src="/plus.png" alt="plus" /></div>
                        <div className="miniCheckoutCnt__item_quantityCnt_count">{m.coun}</div>
                        <div onClick={()=>{this.props.onSubstruct(m)}}><img style={{display:'block',cursor:'pointer'}} src="/minus.png" alt="minus" /></div>
                    </div>

                    <div className="miniCheckoutCnt__item_gallery">
                        <div style={{backgroundImage: `url(${m.gallery[0]})`}}></div>
                    </div>
                
                </div>
                <div className="total__flex">
                    <div>Total:</div>
                    <div>{this.getSymbol(m.prices)}{this.props.total}</div>
                </div>
                </>
                )
            })}
            <div style={{display:'flex',justifyContent: 'space-between'}}>
                <Link style={{textDecoration:'none'}} to="/plp"><div className="miniBuyBtn2">VIEW BAG</div></Link>
                <div className="miniBuyBtn">CHECK OUT</div>
            </div>
            </>
        )
    }
    


    render(){
        let uniqueArray = new Set(this.props.selectedProducts)
        let myProductsArray = Array.from(uniqueArray)
        return(
            <div className="miniCheckoutCnt">
            <div style={{fontSize:'16px',marginBottom:'23px'}}><span style={{fontWeight:'bold'}}>My Bag, </span>{myProductsArray.length} items</div>
                {this.displayMiniCart()}
            </div>
        )
    }
}

export default ProductsBag