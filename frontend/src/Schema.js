import { Modal } from "react-bootstrap";
import Markdown from "react-remarkable";


/** Modal to display schema.
 *
 * - schema: text of schema (in Markdown)
 * - toggleSchema: fn to toggle display
 *
 * Question -> Schema
 *
 **/

function Schema({ schema, toggleSchema }) {
  return (
      <Modal show={ true }
             dialogClassName="modal-lg"
             onHide={ toggleSchema }>
        <Modal.Header>
          <Modal.Title>About the Database</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="markdown">
            <Markdown children={ schema } />
          </div>
        </Modal.Body>
      </Modal>
  );
}

export default Schema;