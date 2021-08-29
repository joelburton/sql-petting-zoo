import { Table } from "react-bootstrap";


const MIN_HEIGHT = 75;
// Pick a max height that will cut if mid-line, so there's some feedback that
// they should scroll to see rest
const MAX_HEIGHT = 383;

/** Show table of results (or error message if no cols given).
 *
 * - cols: [colName, ...]
 * - rows: [ [fld, fld, ...], ... ]
 *
 * Results -> ResultTable
 *
 */

function ResultTable({ cols, rows }) {
  // If there was an error, this will be the error message.
  if (cols.length === 0) {
    return <pre>{ rows[0] }</pre>;
  }

  return (
      <div
          className="overflow-scroll"
          style={ { minHeight: MIN_HEIGHT, maxHeight: MAX_HEIGHT } }>

        <Table bordered={ true } size="sm">

          <thead>
          <tr>
            { cols.map((col, idx) => <th key={ idx }>{ col }</th>) }
          </tr>
          </thead>

          <tbody>
          { rows.map((row, idx) =>
              <tr key={ idx }>
                { row.map((fld, idx) => <td key={ idx }>{ fld }</td>) }
              </tr>,
          ) }
          </tbody>

        </Table>
      </div>
  );
}

export default ResultTable;