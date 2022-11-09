import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "react-bootstrap/Pagination";
<<<<<<< HEAD
import Card from "react-bootstrap/Card";
import "./ComentariosAsignatura.css";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";

const items = [
  "hola buenas tardes",
  "que paso amigo",
  "adsaf",
  "sdlf",
  "faldksas",
  "hola buenas tardes",
  "que paso amigo",
  "adsaf",
  "sdlf",
  "faldksas",
  "hola buenas tardes",
  "que paso amigo",
  "adsaf",
  "sdlf",
  "faldksas",
];

function Items({ currentItems }) {
  return (
    <div style={{ margin: "1rem", marginLeft: '4rem', marginRight: '4rem' }}>
      {currentItems &&
        currentItems.map((item) => (
          <div key={item} style={{ marginBottom: "1rem" }}>
            <Card style={{ background: "#fafafa" }}>
              <Card.Body>
                <Card.Title style={{ display: "flex" }}>
                  <b className="notaComentario">9</b>{" "}
                  <p style={{ marginLeft: "1rem", marginTop: "0.5rem" }}>
                    Titulo
                  </p>
                </Card.Title>
                <Card.Text>Me ha gustado mucho ahha{item}</Card.Text>
              </Card.Body>
              <div className="fecha">
                12/10/199
              </div>
              <Card.Footer style={{ display: "flex" }}>
                <div style={{ marginRight: "1rem" }}>
                  <Button variant="outline-success" size="sm">
                    <AiFillLike /> 1
                  </Button>
                </div>
                <div>
                  <Button variant="outline-danger" size="sm">
                    <AiFillDislike /> 2
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          </div>
        ))}
    </div>
  );
}

function PaginatedItems({ itemsPerPage }) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
=======
import "./ComentariosAsignatura.css";
import ToggleButton from "react-bootstrap/ToggleButton";
import asignaturaService from "../../../services/asignatura.service";
import moment from "moment";
import Comentario from "./Comentario";
import Spinner from "react-bootstrap/Spinner";

const PaginatedItems = ({ itemsPerPage, idAsignatura }) => {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [items, setItems] = useState(null);
>>>>>>> 3b5a822d61982f7b0d045aaed5b17951e2283838
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
<<<<<<< HEAD
  const [likesCheck, setLikesChecked] = useState(false);
  const [dateCheck, setDateChecked] = useState(false);
  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);
=======
  const [check, setCheck] = useState(false);
  useEffect(() => {
    // Fetch items from another resources.
    asignaturaService.getComentarios(idAsignatura).then((response) => {
      console.log(response);
      setItems(response);
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(response.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(response.length / itemsPerPage));
    });
  }, [itemOffset, itemsPerPage, idAsignatura]);
>>>>>>> 3b5a822d61982f7b0d045aaed5b17951e2283838

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

<<<<<<< HEAD
  return (
    <>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <ToggleButton
          style={{marginRight: '1rem'}}
=======
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ToggleButton
          style={{ marginRight: "1rem" }}
>>>>>>> 3b5a822d61982f7b0d045aaed5b17951e2283838
          className="mb-2"
          id="toggle-check"
          type="checkbox"
          variant="outline-primary"
<<<<<<< HEAD
          checked={likesCheck}
          value="1"
          onChange={(e) => setLikesChecked(e.currentTarget.checked)}
=======
          checked={check}
          value="1"
          onChange={() => changeCheck("like")}
>>>>>>> 3b5a822d61982f7b0d045aaed5b17951e2283838
        >
          Más likes
        </ToggleButton>
        <ToggleButton
          className="mb-2"
          id="toggle-check2"
          type="checkbox"
          variant="outline-primary"
<<<<<<< HEAD
          checked={dateCheck}
          value="1"
          onChange={(e) => setDateChecked(e.currentTarget.checked)}
=======
          checked={!check}
          value="1"
          onChange={() => changeCheck("reciente")}
>>>>>>> 3b5a822d61982f7b0d045aaed5b17951e2283838
        >
          Recientes
        </ToggleButton>
      </div>
<<<<<<< HEAD
      <Items currentItems={currentItems} />
      <div style={{ marginLeft: "2rem" }}>
=======
      <Comentario currentItems={currentItems} />
      <div style={{ display: "flex", justifyContent: "center" }}>
>>>>>>> 3b5a822d61982f7b0d045aaed5b17951e2283838
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
<<<<<<< HEAD
  );
}
=======
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        margin: '2rem'
      }}
    >
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};
>>>>>>> 3b5a822d61982f7b0d045aaed5b17951e2283838

export default PaginatedItems;
