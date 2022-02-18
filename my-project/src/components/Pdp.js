import React from "react";
import DOMPurify from 'dompurify'
class Pdp extends React.Component{

    constructor(props){
        super(props)
        this.data = this.props.data[0]
        this.state = {currentPicIndex:0,option:true}
    }

    onPictureChange(indx){
        this.setState({currentPicIndex:indx})
    }

    checkAttr=(id,label,val)=>{
        
        for(let list of this.props.attrList){
            if(list.id === id && list.attrLabel === label && list.attrVal === val){
                return 'active'
            }
        }
        
    }

    validate = ()=>{
        let current = this.props.attrList.filter(f=>f.id===this.data.id)
        if(this.data.inStock === true && current.length === this.data.attributes.length){
            this.props.addCart(this.data) 
            this.setState({option:true})
        }
        else{
            this.setState({option:false})
        }
    }

    render(){
        return(
            <div className="pdp">
                <div className="pdp__side">
                    {this.data.gallery.map((m,index)=>(<img onClick={()=>{this.onPictureChange(index)}} key={m} src={m} alt="side img" />))}
                </div>

                <div className="pdp__main">
                    <img src={this.data.gallery[this.state.currentPicIndex]} alt="main img" />
                </div>

                <div className="pdp__details">

                    <div className="pdp__details__title">{this.data.name}</div>
                    <div className="pdp__details__ctg">{this.data.category}</div>

                    <div className="pdp__details__attr">

                        {this.data.attributes.map((m,index)=>{
                            
                            if(m.type === 'text'){
                                return(
                                    <div key={m.name} style={{order:3,margin:'5px 0'}}>
                                    <p style={{fontWeight:'bold',fontSize:'18px',marginBottom:'8px',order:1}}>{m.name}</p>
                                        {m.items.map((e,index)=>(
                                        <div key={e.displayValue} onClick={()=>{this.props.selectAttr(e.value,this.data.id,m.name)}} className={`pdp__details__attr__text ${this.checkAttr(this.data.id,m.name,e.value)}`}>{e.value}</div>
                                        ))}
                                    </div>
                                )
                                
                            }
                            else{
                                return(
                                    <div key={m.name} style={{order:2}}>
                                    <p style={{fontWeight:'bold',fontSize:'18px',marginBottom:'8px',order:1}}>{m.name}</p>
                                        {m.items.map((e,index)=>(
                                        <div onClick={()=>{this.props.selectAttr(e.value,this.data.id,m.name)}} className={`miniCheckoutCnt__item_attr_color ${this.checkAttr(this.data.id,m.name,e.value)}`} key={e.displayValue} style={{backgroundColor:`${e.value}`}}></div>
                                        ))}
                                    </div>
                            )}
                        })}
                    </div>
                    
                    <div className="pdp__details__priceCnt">
                        <div style={{fontSize:'18px',fontWeight:'bold',marginTop:'40px'}}>PRICE:</div>
                        {this.data.prices.map(m=>{
                        if(m.currency.label === this.props.currentCurrency){
                            return(
                                <div key={m.currency.symbol} className="pdp__details__price">{m.currency.symbol}{m.amount}</div>
                            )
                          }

                        })}


                    </div>

                    <div className={`pdp__details__purchase ${this.data.inStock === false ? 'not' : '' }`} onClick={()=>{
                        this.validate()
                        }}>ADD TO CART</div>
                    <div>{this.state.option ? '' : <div style={{color:'red',marginTop:'5px',fontWeight:'bold'}}>Select all options</div>}</div>
                    <div className="pdp__details__desc" dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(this.data.description)}}></div>

                </div>
            </div>
        )
    }
}

export default Pdp;