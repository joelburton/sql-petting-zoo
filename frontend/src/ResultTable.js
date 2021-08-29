import {Table} from "react-bootstrap";

function ResultTable({cols, rows}) {
  if (cols.length === 0) {
    return <pre>{rows[0]}</pre>
  }

  return (
    <div className="overflow-scroll"
         style={{minHeight: 75, maxHeight: 383}}>
      <Table bordered={true} size="sm">
        <thead>
        <tr>
          {cols.map((col, idx) =>
            <th key={idx}>{col}</th>
          )}
        </tr>
        </thead>

        <tbody>
        {rows.map((row, idx) =>
          <tr key={idx}>
            {row.map((fld, idx) =>
              <td key={idx}>{fld}</td>
            )}
          </tr>
        )}
        </tbody>
      </Table>
    </div>

  )
}

export default ResultTable;