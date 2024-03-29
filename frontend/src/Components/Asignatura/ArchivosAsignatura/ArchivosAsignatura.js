import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "react-bootstrap/Pagination";
import "./ArchivosAsignatura.css";
import ToggleButton from "react-bootstrap/ToggleButton";
import asignaturaService from "../../../services/asignatura.service";
import moment from "moment";
import Archivo from "./Archivo";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { AiOutlineUpload } from "react-icons/ai";
import SubirArchivo from "./subirArchivo"

const PaginatedArchivos = ({ itemsPerPage, idAsignatura, idUsuario, votados }) => {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [items, setItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [checkArchivo, setCheckArchivo] = useState(false);
  const [modal, setModal] = useState(false)
  useEffect(() => {
    // Fetch items from another resources.
    asignaturaService.getArchivos(idAsignatura).then((response) => {
      response.sort(
        (a, b) =>
          moment(a.fecha, "YYYY-MM-DD").unix() -
          moment(b.fecha, "YYYY-MM-DD").unix()
      );
      response.reverse();
      setItems(response);
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(response.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(response.length / itemsPerPage));
    });
  }, [itemOffset, itemsPerPage, idAsignatura]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const changeCheckArchivo = (tipo) => {
    if (tipo === "like") {
      setCheckArchivo(true);
      currentItems.sort((a, b) => a.mg - b.mg);
      currentItems.reverse();
    } else {
      setCheckArchivo(false);
      currentItems.sort(
        (a, b) =>
          moment(a.fecha, "YYYY-MM-DD").unix() -
          moment(b.fecha, "YYYY-MM-DD").unix()
      );
      currentItems.reverse();
    }
  };

  return items ? (
    <>
      <SubirArchivo
        show={modal}
        onHide={() => setModal(false)}
        idusuario={idUsuario}
        idasignatura={idAsignatura}
      />
      <div style={{display: 'flex', margin: '2rem',justifyContent: 'center' }}>
        <Button variant="warning" onClick={() => setModal(true)}>
          Subir archivo <AiOutlineUpload />
        </Button>
      </div>
      <p
        style={{
          textAlign: "center",
          fontWeight: "100",
          fontSize: "22px",
        }}
      >
        Ordenar
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ToggleButton
          style={{ marginRight: "1rem" }}
          className="mb-2"
          id="toggle-checkArchivo"
          type="checkbox"
          variant="outline-primary"
          checked={checkArchivo}
          value="1"
          onChange={() => changeCheckArchivo("like")}
        >
          Más likes
        </ToggleButton>
        <p>_</p>
        <ToggleButton
          style={{ marginLeft: "1rem" }}
          className="mb-2"
          id="toggle-check2Archivo"
          type="checkbox"
          variant="outline-primary"
          checked={!checkArchivo}
          value="1"
          onChange={() => changeCheckArchivo("reciente")}
        >
          Recientes
        </ToggleButton>
      </div>
      <Archivo currentItems={currentItems} votados={votados} idUsuario={idUsuario} />
      <div style={{ display: "flex", justifyContent: "center" }}>
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
    </>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "2rem",
      }}
    >
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default PaginatedArchivos;
