import axios from "axios";

export function fetchAll(){

  return axios.post('http://localhost:4000/',{
    headers:{'Content-Type':'application/json'},
    query:`query{
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