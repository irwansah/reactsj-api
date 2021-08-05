import React, { Component } from 'react'
import { Badge, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { numberFormat } from '../utils/utils'
import Amount from './Amount'
import ModalComponent from './ModalComponent';
import axios from 'axios';
import { API_URL } from '../utils/constant';
import swal from 'sweetalert';
export default class Result extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            detailCarts: false,
            count: 0,
            desc: '',
            total:0
        }
    }

    handleShow = (list_cart) => {
        this.setState({
            showModal: true,
            detailCarts: list_cart,
            count:list_cart.jumlah,
            keterangan:list_cart.keterangan,
            total:list_cart.total_harga
        })
    }
    handleClose = () => {
        this.setState({
            showModal: false
        })
    }
    handlePlus=()=>{
       this.setState({
            count:this.state.count+1,
            total:this.state.detailCarts.product.harga*(this.state.count+1)
        })
    }
    handleMinus=()=>{
        
        if(this.state.count!==1){
            this.setState({
                count:this.state.count-1,
                total:this.state.detailCarts.product.harga*(this.state.count-1)
            })
        }
    }
    changeHandler=(event)=>{
        this.setState({
            desc:event.target.value
        })
    }

    handleSubmit=(event)=>{
        this.handleClose()
        event.preventDefault();
            const data={
            jumlah:this.state.count,
            total_harga:this.state.total,
            product:this.state.detailCarts.product,
            desc:this.state.desc
          }
          axios.put(API_URL+`keranjangs/${this.state.detailCarts.id}`,data)
          .then(res => {
            this.props.getListCart();
            swal({
              title: "Ubah pesanan",
              text: `pesanan "${data.product.nama}" diubah`,
              icon: "success",
              button: false,
              timer:1500
            });
        })
        .catch(error=>{
          console.log("Response Error: ",error)
        });

    }

    handleDelete=(id)=>{
        this.handleClose()

          axios.delete(API_URL+`keranjangs/${id}`)
          .then(res => {
            this.props.getListCart();
            swal({
              title: "Hapus pesanan",
              text: `pesanan "${this.state.detailCarts.product.nama}" dihapus`,
              icon: "success",
              button: false,
              timer:1500
            });
        })
        .catch(error=>{
          console.log("Response Error: ",error)
        });

    }

    render() {
        const { carts } = this.props;
        if(carts.length>0){
            return (
                <Col xs="12" sm="12" md="3" lg="3">
                    <h4><strong>Keranjang</strong></h4>
                    <hr />
                    {carts.length !== 0 &&
                        <Card className="overflow-auto result">
                            <ListGroup variant="flush">
                            {carts.map((list_cart) => (
                                <ListGroup.Item key={list_cart.id} style={{cursor:"pointer"}} onClick={() => this.handleShow(list_cart)}>
                                    <Row>
                                        <Col xs="2">
                                            <h4>
                                                <Badge pill className="blues">
                                                    {list_cart.jumlah}
                                                </Badge>
                                            </h4>
                                        </Col>
                                        <Col> <h5>{list_cart.product.nama} </h5>
                                            <p>Rp. {numberFormat(list_cart.product.harga)}</p>
                                        </Col>
                                        <Col xs="5">
                                            <strong className="float-end">Rp. {numberFormat(list_cart.total_harga)}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                            
                            <ModalComponent {...this.state} handleClose={this.handleClose}  handlePlus={this.handlePlus} handleMinus={this.handleMinus} changeHandler={this.changeHandler} handleSubmit={this.handleSubmit} handleDelete={this.handleDelete}/>
    
                        </ListGroup>
                        </Card>
                    }
                    <Amount carts={carts} {...this.props}/>
    
                    
    
                </Col>
    
    
            )
        }else{
            return (
                <Col md="2" lg="3">
                <h4><strong>Keranjang</strong></h4>
                <hr />
                    <p>Belum ada pesanan</p>
                </Col>
            )
            
        }
    }
}
