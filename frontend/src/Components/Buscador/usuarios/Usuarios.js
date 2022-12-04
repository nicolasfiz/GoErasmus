import { useState, useEffect } from "react"
import buscadorService from "../../../services/buscador.service"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { AiOutlineUser } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { FaCity, FaUniversity } from "react-icons/fa";
import { GiBookmarklet } from "react-icons/gi";
import { BiFilterAlt } from "react-icons/bi";
import "./Usuario.css"
import Button from 'react-bootstrap/Button';
import ListadoUsuarios from "./ListadoUsuarios";
import ReactPaginate from "react-paginate";
import "react-bootstrap/Pagination";

const itemsPerPage = 6

const Usuarios = () => {
    const [buscado, setBuscado] = useState(false)
    const [filtro, setFiltro] = useState({
        nombreUsuario: '',
        email: '',
        pais: '',
        ciudad: '',
        universidad: '',
        facultad: ''
    })
    const [loading, setLoading] = useState(true)
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState(null);
    const [items, setItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    useEffect(() => {
        const formData = new FormData()
        formData.append("nombreUsuario", filtro.nombreUsuario)
        formData.append("email", filtro.email)
        formData.append("facultad", filtro.facultad)
        formData.append("universidad", filtro.universidad)
        formData.append("ciudad", filtro.ciudad)
        formData.append("pais", filtro.pais)
        buscadorService
            .usuarios(formData)
            .then(response => {
                console.log(response)
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

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    const limpiar = () => {
        setFiltro({
            nombreUsuario: '',
            email: '',
            pais: '',
            ciudad: '',
            universidad: '',
            facultad: ''
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
                    <InputGroup.Text id="basic-addon1"><AiOutlineUser /></InputGroup.Text>
                    <Form.Control
                        placeholder="Nombre de Usuario"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="nombreUsuario"
                        value={filtro.nombreUsuario}
                        onChange={handleChanges}
                    />
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                    <Form.Control
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="basic-addon1"
                        name="email"
                        value={filtro.email}
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
                <ListadoUsuarios resultado={currentItems} loading={loading} />
                <div style={{ display: "flex", justifyContent: "center", marginTop: '1rem' }}>
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
            </form>

        </div>
    )
}

export default Usuarios