import { Button,Image } from "react-bootstrap";
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constant";
export default class Success extends Component {
    componentDidMount(){
        axios.get(API_URL+`keranjangs`)
        .then(res => {
           const carts = res.data;
            carts.map(function(item){
                return axios.delete(API_URL+`keranjangs/${item.id}`)
                        .then((res)=>console.log(res))
                        .catch(error=>{
                            console.log("Response Error: ",error)
                          })
            })
        })
        .catch(error=>{
          console.log("Response Error: ",error)
        })
    }
    render() {
        return (
            <div className="mt-4 text-center">
                <Image src="assets/images/success.png" width="500"/>
                <h2>Sukses Pesan</h2>
                <Button variant="light" className="btn-blues" as={Link} to="/">
                    Kembali
                </Button>
            </div>
        )
    }
}
