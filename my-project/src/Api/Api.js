import axios from "axios";

export function getProductById(id){

  return axios.post('http://localhost:4000/',{
    headers:{'Content-Type':'application/json'},
    query:`query{
      product(id: "${id}"){
        id,
        name,
        inStock,
        gallery,
        description,
        category,
        attributes{
          id,
          name,
          type,
          items{
            displayValue,
            value,
            id
          }
        },
        prices{
          currency{
            label,
            symbol
          }
          amount
        }
      }
    }`
  })
}

export function getProductsByCategory(ctg){

  return axios.post('http://localhost:4000/',{
    headers:{'Content-Type':'application/json'},
    query:`query{
      category(input:{title:"${ctg}"}){
        name,
        products{
            id,
            name,
            inStock,
            gallery,
            description,
            category,
            attributes{
              id,
              name,
              type,
              items{
                displayValue,
                value,
                id
              }
            },
            prices{
              currency{
                label,
                symbol
              }
              amount
            }
        }
      }
    }`
  })
}

export function currencyGetter(){

  return axios.post('http://localhost:4000/',{
    headers:{'Content-Type':'application/json'},
    query:`query{
      currencies{
        label
        symbol
      }
      }`
  })

}

export function getCategoriesAPI(){

  return axios.post('http://localhost:4000/',{
    headers:{'Content-Type':'application/json'},
    query:`query{
      categories{
        name
      }
    }`
  })

}