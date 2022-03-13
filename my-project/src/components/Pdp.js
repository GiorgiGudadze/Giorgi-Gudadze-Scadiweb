import React from "react";

class Pdp extends React.Component{

    constructor(props){
        super(props)
        this.myRef = React.createRef();
        this.data = this.props.data[0]
        this.state = {currentPicIndex:0,option:true,description:''}
        this.parser = new DOMParser();
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

    errorChecker = () =>{

        if(this.state.option && this.data.inStock === true){
            return ''
        }
        else if(this.data.inStock === false){
            return (<div className="pdp__details__error">Out of stock</div>)
        }
        else{
            return (<div className="pdp__details__error">Select all options</div>)
        }

    }

    htmlParser = (element) => {
        return element;
    }

    componentDidMount(){
        this.myRef.current.append(this.parser.parseFromString(this.data.description,"text/html").body)
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
                                    <div className="pdp__details__attr__cnt" key={m.name}>
                                    <p className="pdp__details__attr__cnt__p">{m.name}</p>
                                        {m.items.map((e,index)=>(
                                        <div key={e.displayValue} onClick={()=>{this.props.selectAttr(e.value,this.data.id,m.name)}} className={`pdp__details__attr__text ${this.checkAttr(this.data.id,m.name,e.value)}`}>{e.value}</div>
                                        ))}
                                    </div>
                                )
                                
                            }
                            else{
                                return(
                                    <div className="pdp__details__attr__swatch" key={m.name}>
                                    <p className="pdp__details__attr__swatch__p">{m.name}</p>
                                        {m.items.map((e,index)=>(
                                        <div onClick={()=>{this.props.selectAttr(e.value,this.data.id,m.name)}} className={`miniCheckoutCnt__item_attr_color ${this.checkAttr(this.data.id,m.name,e.value)} swatchPdp`} key={e.displayValue} style={{backgroundColor:`${e.value}`}}></div>
                                        ))}
                                    </div>
                            )}
                        })}
                    </div>
                    
                    <div className="pdp__details__priceCnt">
                        <div className="pdp__details__priceCnt__firstChild">PRICE:</div>
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
                    <div>{this.errorChecker()}</div>
                    <div className="pdp__details__desc" ref={this.myRef}></div>

                </div>
            </div>
        )
    }
}

export default Pdp;