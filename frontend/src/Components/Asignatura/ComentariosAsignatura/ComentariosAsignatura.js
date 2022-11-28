import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "react-bootstrap/Pagination";
import "./ComentariosAsignatura.css";
import ToggleButton from "react-bootstrap/ToggleButton";
import asignaturaService from "../../../services/asignatura.service";
import moment from "moment";
import Comentario from "./Comentario";
import Spinner from "react-bootstrap/Spinner";

const PaginatedItems = ({ itemsPerPage, idAsignatura, idUsuario, votados }) => {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [items, setItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [check, setCheck] = useState(false);
  useEffect(() => {
    // Fetch items from another resources.
    asignaturaService.getComentarios(idAsignatura).then((response) => {
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
    setItemOffset(newOffset);
  };

  const changeCheck = (tipo) => {
    if (tipo === "like") {
      setCheck(true);
      currentItems.sort((a, b) => a.mg - b.mg);
      currentItems.reverse();
    } else {
      setCheck(false);
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
          id="toggle-check"
          type="checkbox"
          variant="outline-primary"
          checked={check}
          value="1"
          onChange={() => changeCheck("like")}
        >
          Más likes
        </ToggleButton>
        <p>_</p>
        <ToggleButton
          style={{ marginLeft: "1rem" }}
          className="mb-2"
          id="toggle-check2"
          type="checkbox"
          variant="outline-primary"
          checked={!check}
          value="1"
          onChange={() => changeCheck("reciente")}
        >
          Recientes
        </ToggleButton>
      </div>
      <Comentario currentItems={currentItems} votados={votados} idUsuario={idUsuario}/>
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

export default PaginatedItems;
