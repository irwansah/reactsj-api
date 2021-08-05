import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPlus,faMinus, faTrash } from '@fortawesome/free-solid-svg-icons'
import {numberFormat} from '../utils/utils'
const ModalComponent = ({ showModal, handleClose, detailCarts ,count,desc,handlePlus,handleMinus,changeHandler,handleSubmit,total,handleDelete}) => {
    if (detailCarts) {
        return (
            <Modal
                show={showModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{detailCarts.product.nama + " "} <strong>(Rp.{numberFormat(detailCarts.product.harga)})</strong> </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>

                        <Form.Group className="mb-3">
                            <Form.Label>Total Harga </Form.Label>
                            <p><strong>(Rp.{numberFormat(total)})</strong></p>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Jumlah</Form.Label><br/>
                            <Button variant="light" className="btn-blues me-2" size="sm" onClick={()=>handleMinus()}>
                            <FontAwesomeIcon icon={faMinus}/>
                            </Button>
                            <strong>{count}</strong>
                            <Button variant="light" className="btn-blues ms-2" size="sm" onClick={()=>handlePlus()}>
                                    <FontAwesomeIcon icon={faPlus}/>
                            </Button>
                                
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Keterangan</Form.Label>
                            <Form.Control as="textarea" rows={3} name="desc"  placeholder="Contoh : Pedas, Nasi Setengah" value={desc} onChange={(event)=>changeHandler(event)}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="light" type="submit" className="btn-blues">Ubah</Button>
                        <Button variant="danger" onClick={()=>handleDelete(detailCarts.id)}>
                            <FontAwesomeIcon icon={faTrash}/> Hapus Pesanan
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    } else {
        return (
            <Modal
                show={showModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Kosong</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Kosong
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Keluar
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ModalComponent
