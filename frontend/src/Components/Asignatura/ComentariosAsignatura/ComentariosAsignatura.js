import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "react-bootstrap/Pagination";
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
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [likesCheck, setLikesChecked] = useState(false);
  const [dateCheck, setDateChecked] = useState(false);
  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <ToggleButton
          style={{marginRight: '1rem'}}
          className="mb-2"
          id="toggle-check"
          type="checkbox"
          variant="outline-primary"
          checked={likesCheck}
          value="1"
          onChange={(e) => setLikesChecked(e.currentTarget.checked)}
        >
          Más likes
        </ToggleButton>
        <ToggleButton
          className="mb-2"
          id="toggle-check2"
          type="checkbox"
          variant="outline-primary"
          checked={dateCheck}
          value="1"
          onChange={(e) => setDateChecked(e.currentTarget.checked)}
        >
          Recientes
        </ToggleButton>
      </div>
      <Items currentItems={currentItems} />
      <div style={{ marginLeft: "2rem" }}>
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
  );
}

export default PaginatedItems;
