import React, { Component } from 'react'
import { Col,ListGroup } from 'react-bootstrap'
import { API_URL } from '../utils/constant';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUtensils,faCoffee,faHamburger} from '@fortawesome/free-solid-svg-icons'

const Icon = ({nama})=>{
    if(nama==="Makanan") return <FontAwesomeIcon icon={faUtensils} className="mr-2"/>
    if(nama==="Minuman") return <FontAwesomeIcon icon={faCoffee} className="mr-2"/>
    if(nama==="Cemilan") return <FontAwesomeIcon icon={faHamburger} className="mr-2"/>
    return <FontAwesomeIcon icon={faUtensils} className="mr-2"/>
}


export default class ListCategories extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        axios.get(API_URL + 'categories')
            .then(res => {
                console.log("Response : ", res)
                const categories = res.data;
                this.setState({ categories });
            })
            .catch(error => {
                console.log("Response Error: ", error)
            })
    }

    render() {
        const {categories}=this.state
        const {changeCategory,categorySelect}=this.props
        return (

            <Col xs="12" sm="12" md="3" lg="2" className="mb-3 ">
                <h4><strong>Daftar Kategori</strong></h4>
                <hr />

                <ListGroup>

                {categories && categories.map((category)=>(
                    <ListGroup.Item key={category.id} onClick={()=>changeCategory(category.nama)} style={{cursor:"pointer"}} className={categorySelect===category.nama && "active-category"}>
                    <h5><Icon nama={category.nama}/> &nbsp; {category.nama}</h5>
                    </ListGroup.Item>
                ))}

                </ListGroup>

            </Col>
        )
    }
}
