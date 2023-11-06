import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import './Header.css';

export const Header = ({ selectedCount, onDelete }) => {
    return (
      <>
        <header className="gallery-header">
          {selectedCount === 0 ? ( // Display header differently based on selectedCount
            <>
               <h1>Gallery</h1>  {/*Gallery title when no items are selected */}
              <hr />
            </>
          ) : (
            <div className="selected-header">
              <div className="check-icon-container">
                <FontAwesomeIcon icon={faCheckSquare} className="check-icon" />
              </div>
              <div className="selected-count">
                <h1>{`${selectedCount} File${
                  selectedCount > 1 ? "s" : ""
                } Selected`}</h1>
              </div>
            </div>
          )}
          {selectedCount > 0 && (
            <h1 className="delete-text" onClick={onDelete}>
              Delete files
            </h1>
          )}
        </header>
      </>
    );
  };