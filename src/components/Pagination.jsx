import { useEffect } from "react";
import classes from "./Pagination.module.css";

function Pagination({ total, limit, page, setPage }) {

    const numPages = Math.ceil(total / limit);

    useEffect(()=>{
      window.scrollTo(0,0)
    },[page])
  
    return (
      <>
        <nav className={classes.nav}>
          <button onClick={() => setPage(page-1)} disabled={page === 1} className={classes.button}>
            &lt;
          </button>
          {Array(numPages)
            .fill()
            .map((_, i) => (
              <button className={classes.button}
                key={i + 1}
                onClick={() => setPage(i + 1)}
                aria-current={page === i + 1 ? "page" : null}
              >
                {i + 1}
              </button>
            ))}
          <button onClick={() => setPage(page + 1)} disabled={page === numPages} className={classes.button}>
            &gt;
          </button>
        </nav>
      </>
    );
  }

  export default Pagination;