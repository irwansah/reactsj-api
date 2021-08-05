import React, { Component } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { numberFormat } from '../utils/utils';
import { API_URL } from '../utils/constant';
import axios from 'axios';

export default class Amount extends Component {
    submitAmount=(amount)=>{
        const orders={
            total_bayar:amount,
            menus:this.props.carts
        }
        axios.post(API_URL+`pesanans`,orders).then((res)=>{
                this.props.history.push('/sukses');
        })
    }
    render() {
        const {carts}=this.props;
        const results=carts.reduce((result,item)=>{
            return result + item.total_harga
        },0);
        return (
            <div className="fixed-bottom ">
               <Row>
                   
                   <Col md={{span:3,offset:9}} className="px-4 pt-3 bg-white">
                    <h5>Total Harga : <strong className="float-end mr-2">Rp. {numberFormat(results)}</strong></h5>
                    <Button variant="light" className="w-100 btn-blues mb-2 me-2" onClick={()=>this.submitAmount(results)} >
                      <FontAwesomeIcon icon={faShoppingCart}/>  <strong>Bayar</strong>
                    </Button>
                   </Col>
               </Row>
            </div>
        )
    }
}
