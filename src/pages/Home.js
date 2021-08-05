import React, { Component } from 'react'
import { Col, Container, Row } from "react-bootstrap";
import {Result,ListCategories,Menus} from "../components";
import {API_URL}  from '../utils/constant';
import axios from "axios";
import swal from 'sweetalert';

export default class Home extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       menus:[],
       categorySelect:'Makanan',
       carts:[],
    }
  }
  
  componentDidMount(){
    axios.get(API_URL+`products?category.nama=${this.state.categorySelect}`)
    .then(res => {
      // console.log("Response : ",res)
       const menus = res.data;
      this.setState({ menus });
    })
    .catch(error=>{
      console.log("Response Error: ",error)
    })

    this.getListCart()
  }

  getListCart=()=>{
   
      axios.get(API_URL+`keranjangs`)
      .then(res => {
         const carts = res.data;
        this.setState({ carts });
        console.log('data diambil')
      })
      .catch(error=>{
        console.log("Response Error: ",error)
      })
    
  }
  changeCategory=(value)=>{
    this.setState({
      categorySelect:value,
      menu:[],
    })
    axios.get(API_URL+`products?category.nama=${value}`)
    .then(res => {
      // console.log("Response : ",res)
       const menus = res.data;
      this.setState({ menus });
    })
    .catch(error=>{
      console.log("Response Error: ",error)
    })
  }
  insertCart=(value)=>{
    axios.get(API_URL+`keranjangs?product.id=${value.id}`)
    .then(res => {
      if(res.data.length===0){
        const item_cart={
          jumlah:1,
          total_harga:value.harga,
          product:value
        }
        axios.post(API_URL+`keranjangs`,item_cart)
        .then(res => {
          this.getListCart();

          swal({
            title: "Sukses",
            text: `"${item_cart.product.nama}" dimasukan ke keranjang`,
            icon: "success",
            button: false,
            timer:1500
          });
    
        })
        .catch(error=>{
          console.log("Response Error: ",error)
        })
      }else{
        const item_cart={
          jumlah:res.data[0].jumlah+1,
          total_harga:res.data[0].total_harga+value.harga,
          product:value
        }

        axios.put(API_URL+`keranjangs/${res.data[0].id}`,item_cart)
        .then(res => {
          this.getListCart()

          swal({
            title: "Sukses",
            text: `"${item_cart.product.nama}" dimasukan ke keranjang`,
            icon: "success",
            button: false,
            timer:1500
          });
    
        })
        .catch(error=>{
          console.log("Response Error: ",error)
        })


      }
    })
    .catch(error=>{
      console.log("Response Error: ",error)
    })

    
   
  }
  render() {
    const {menus, categorySelect, carts}=this.state
    return (
      <Container fluid className="mt-3">
        <Row>
          <ListCategories changeCategory={this.changeCategory} categorySelect={categorySelect}/>
          <Col xs="12" sm="12" md="6" lg="7">
          <h4><strong>Daftar Produk</strong></h4>
          <hr/>
          <Row className="menu overflow-auto mb-3">
            {menus && menus.map((menu)=>(
              <Menus
              key={menu.id}
              menu={menu}
              insertCart={this.insertCart}
              />
            ))}
          </Row>
          </Col>
          <Result carts={carts} {...this.props} getListCart={this.getListCart}/>
        </Row>
      </Container>
    )
  }
}


