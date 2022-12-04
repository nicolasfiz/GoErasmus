import { useState, useEffect } from "react"
import buscadorService from "../../../services/buscador.service"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { AiOutlineBook } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { BsFillBarChartFill } from "react-icons/bs";
import { FaCity, FaUniversity } from "react-icons/fa";
import { GiBookmarklet } from "react-icons/gi";
import { BiFilterAlt } from "react-icons/bi";
import "../usuarios/Usuario.css"
import Button from 'react-bootstrap/Button';
import ListadoAsignaturas from "./ListadoAsignaturas";
import ReactPaginate from "react-paginate";
import "react-bootstrap/Pagination";

const itemsPerPage = 6


const Asignaturas = () => {
    const [buscado, setBuscado] = useState(false)
    const [filtro, setFiltro] = useState({
        nombre: '',
        puntuacion: '',
        facultad: '',
        universidad: '',
        ciudad: '',
        pais: ''
    })
    const [loading, setLoading] = useState(true)
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState(null);
    const [items, setItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    useEffect(() => {
        const formData = new FormData()
        formData.append("nombre", filtro.nombre)
        formData.append("puntuacion", filtro.puntuacion)
        formData.append("facultad", filtro.facultad)
        formData.append("universidad", filtro.universidad)
        formData.append("ciudad", filtro.ciudad)
        formData.append("pais", filtro.pais)
        buscadorService
            .asignaturas(formData)
            .then(response => {
                setItems(response)
                setLoading(false)
                const endOffset = itemOffset + itemsPerPage;
                setCurrentItems(response.slice(itemOffset, endOffset));
                setPageCount(Math.ceil(response.length / itemsPerPage));
            })
            .catch(error => {
                console.error(error)
            })


    }, [filtro, itemOffset])

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };
    
    const handleChanges = async ({ target }) => {
        setBuscado(true)
        setLoading(true)
        const { name, value } = target
        console.log(name, value)
        await setFiltro({
            ...filtro,
            [name]: value,
        })
        setLoading(false)
    }

    const limpiar = () => {
        setFiltro({
            nombre: '',
            puntuacion: '',
            facultad: '',
            universidad: '',
            ciudad: '',
            pais: ''
        })
        setBuscado(false)
    }
    return (
        <div className="buscador">
            <div style={{ marginBottom: '1rem' }}>
                {buscado ? (<Button variant="outline-primary" onClick={() => limpiar()}>Limpiar <BiFilterAlt /></Button>) : null}
            </div>
            <form>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1"><AiOutlineBook /></InputGroup.Text>
                    <Form.Control
                        placeholder="Nombre"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="nombre"
                        value={filtro.nombre}
                        onChange={handleChanges}
                    />
                    <InputGroup.Text id="basic-addon1"><BsFillBarChartFill /></InputGroup.Text>
                    <Form.Control
                        placeholder="Puntuacion"
                        aria-label="Email"
                        aria-describedby="basic-addon1"
                        name="puntuacion"
                        value={filtro.puntuacion}
                        onChange={handleChanges}
                    />
                    <InputGroup.Text id="basic-addon1"><BiWorld /></InputGroup.Text>
                    <Form.Control
                        placeholder="País"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="pais"
                        value={filtro.pais}
                        onChange={handleChanges}
                    />
                    <InputGroup.Text id="basic-addon1"><FaCity /></InputGroup.Text>
                    <Form.Control
                        placeholder="Ciudad"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="ciudad"
                        value={filtro.ciudad}
                        onChange={handleChanges}
                    />
                    <InputGroup.Text id="basic-addon1"><FaUniversity /></InputGroup.Text>
                    <Form.Control
                        placeholder="Universidad"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="universidad"
                        value={filtro.universidad}
                        onChange={handleChanges}
                    />
                    <InputGroup.Text id="basic-addon1"><GiBookmarklet /></InputGroup.Text>
                    <Form.Control
                        placeholder="Facultad"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="facultad"
                        value={filtro.facultad}
                        onChange={handleChanges}
                    />
                </InputGroup>
            </form>
            <ListadoAsignaturas resultado={currentItems} loading={loading} />
            <div style={{ display: "flex", justifyContent: "center", marginTop: '1rem'}}>
                <ReactPaginate
                    nextLabel="siguiente >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< anterior"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    )
}

export default Asignaturas