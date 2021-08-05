import React from 'react'
import { Col,Card } from 'react-bootstrap'
import {numberFormat} from '../utils/utils';
const menus = ({ menu,insertCart }) => {
    return (
        <Col lg="4" md="6" sm="6" xs="6" className="mb-3 ">
            <Card className="shadow-sm" style={{cursor:"pointer"}} onClick={()=>insertCart(menu)}>
                <Card.Img variant="top" src={`assets/images/${menu.category.nama.toLowerCase()}/${menu.gambar}`} />
                <Card.Body>
                    <Card.Title>{menu.nama}</Card.Title>
                    <Card.Text>
                    Rp. {numberFormat(menu.harga)}
                    </Card.Text>

                </Card.Body>
            </Card>
        </Col>

    )
}

export default menus
