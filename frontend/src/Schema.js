import {Modal} from "react-bootstrap";
import Markdown from "react-remarkable";

function Schema({schema, toggleSchema}) {
  return (
    <Modal show={true}
           dialogClassName="modal-lg"
           onHide={toggleSchema}>
      <Modal.Header>
        <Modal.Title>About the Database</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="markdown">
          <Markdown children={schema}/>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default Schema;