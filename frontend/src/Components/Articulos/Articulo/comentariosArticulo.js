import { useState, useEffect } from "react"
import ReactPaginate from "react-paginate"
import moment from "moment"
import "react-bootstrap/Pagination"
import ToggleButton from "react-bootstrap/ToggleButton"
import Spinner from "react-bootstrap/Spinner"
import articleServices from "../../../services/article.service"
import ComentarioArt from "./comentarioArt"
import "../../Asignatura/ComentariosAsignatura/ComentariosAsignatura.css"

const PaginatedItemsArt = ({ itemsPerPage, idArticulo, idUsuario, votados }) => {
  const [currentItems, setCurrentItems] = useState(null)
  const [items, setItems] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [check, setCheck] = useState(false)

  useEffect(() => {
    articleServices.getArticleComments(idArticulo).then((commentList) => {
      commentList.sort( (a, b) =>
        moment(a.fecha, "YYYY-MM-DD").unix() -
        moment(b.fecha, "YYYY-MM-DD").unix()
      )
      commentList.reverse()
      setItems(commentList)
      const endOffset = itemOffset + itemsPerPage
      setCurrentItems(commentList.slice(itemOffset, endOffset))
      setPageCount(Math.ceil(commentList.length / itemsPerPage))
    })
  }, [itemOffset, itemsPerPage, idArticulo])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length
    setItemOffset(newOffset)
  }

  const changeCheck = (tipo) => {
    if (tipo === "like") {
      setCheck(true)
      currentItems.sort((a, b) => a.mg - b.mg)
      currentItems.reverse()
    } else {
      setCheck(false)
      currentItems.sort((a, b) =>
        moment(a.fecha, "YYYY-MM-DD").unix() -
        moment(b.fecha, "YYYY-MM-DD").unix()
      )
      currentItems.reverse()
    }
  }

  return items && items[0].fecha !== null ? (
    <>
      <p style={{ textAlign: "center", fontWeight: "100", fontSize: "22px"}}> Ordenar </p>
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
      <ComentarioArt currentItems={currentItems} votados={votados} idUsuario={idUsuario}/>
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
  )
}

export default PaginatedItemsArt
