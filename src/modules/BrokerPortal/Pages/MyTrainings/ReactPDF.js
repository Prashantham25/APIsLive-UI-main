import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import "./ReactPDF.css";

export default function ReactPDF({ file }) {
  const [totalPage, setTotalPage] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setTotalPage(numPages);
    setPageNumber(1);
  };

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <>
      {/* <div>
        <p>
          Page {pageNumber || (totalPage ? 1 : "--")} of {totalPage || "--"}
        </p>
        <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </button>
        <button type="button" disabled={pageNumber >= totalPage} onClick={nextPage}>
          Next
        </button>
      </div>
      <div className="Example__container__document">
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
      </div> */}
      <div className="Example">
        <div>
          <p>
            Page {pageNumber || (totalPage ? 1 : "--")} of {totalPage || "--"}
          </p>
          <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
            Previous
          </button>
          <button type="button" disabled={pageNumber >= totalPage} onClick={nextPage}>
            Next
          </button>
        </div>
        <div className="Example__container">
          <div className="Example__container__document">
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
          </div>
        </div>
      </div>
    </>
  );
}
