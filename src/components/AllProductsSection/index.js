import Cookies from 'js-cookie'
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import ProductCard from '../ProductCard'

import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
    loading: true,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const apiUrl = 'https://apis.ccbp.in/products'
    const jwToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updateData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({productsList: updateData, loading: false})
    }
  }

  renderProductsList = () => {
    const {productsList} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {loading} = this.state
    return (
      <>
        {loading ? (
          <div className="loader-container">
            <Loader type="Oval" color="#4285f4" height={40} />
          </div>
        ) : (
          this.renderProductsList()
        )}
      </>
    )
  }
}

export default AllProductsSection
