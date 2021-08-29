import React, { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-pgsql";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/ext-language_tools";
import "./SqlEditor.css";

import { Button } from "react-bootstrap";
import { NEVER_SEEN } from "./globals";

function SqlEditor(
  {
    initial,
    submit,
    toggleHint,
    showingHint,
    toggleSolution,
    showingSolution,
    toggleSchema,
  }) {
  const [sql, setSql] = useState(initial);

  function onChange(newValue) {
    setSql(newValue);
  }

  function onSubmit() {
    submit(sql);
  }

  function onReset() {
    setSql(initial);
  }

  function toggleAndShowSolution() {
    const solution = toggleSolution();
    if (solution) setSql(solution);
  }

  return (
    <div className="SqlEditor border p-2 mb-4">
      <AceEditor
        mode="pgsql"
        theme="xcode"
        value={ sql }
        onChange={ onChange }
        showGutter={ false }
        height="300px"
        width="100%"
        fontSize={ 13 }
        editorProps={ { $blockScrolling: true } }
        setOptions={ {
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
        } }
      />
      <div className="SqlEditor-buttons">
        <Button variant="outline-danger"
                size="sm"
                onClick={ onReset }>Reset</Button>
        { toggleSolution &&
        <Button variant="outline-warning"
                size="sm"
                onClick={ toggleAndShowSolution }>
          { showingSolution !== NEVER_SEEN && <span className="me-1">👀</span> }
          Solution
        </Button>
        }
        { toggleHint &&
        <Button variant="outline-primary"
                size="sm"
                onClick={ toggleHint }>
          { showingHint !== NEVER_SEEN && <span className="me-1">👀</span> }
          Hint
        </Button> }
        <Button variant="outline-primary"
                size="sm"
                onClick={ toggleSchema }>Schema</Button>
        <Button variant="primary"
                size="sm"
                onClick={ onSubmit }>Go</Button>
      </div>

    </div>
  );
}

export default SqlEditor;