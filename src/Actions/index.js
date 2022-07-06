import cursorBlink from "../Tasks/cursorBlink";
import arrayVariables from "../Variables/arrayVariables";
import conditionalVariables from "../Variables/conditionalVariables";
import dataVariables from "../Variables/dataVariables";
import intervalVariables from "../Variables/intervalVariables";
import addingCodeEditorEventListeners from "./addingCodeEditorEventListeners";
import addingInputEventListeners from "./addingInputEventListeners";
import addingWindowEventListener from "./addingWindowEventListener";
import codeEditorDom from "./codeEditorDom";



/**
 * @description - This is the main class that creates a code editor , add all the events listenrs 
 * and exports the complete code editor to be appended into a container.
 */
export default class generateCodeEditor{

  constructor(){
    this.codeEditor = new codeEditorDom();
    this.dataVariables = new dataVariables();
    this.conditionalVariables = new conditionalVariables();
    this.arrayVariables = new arrayVariables();
    this.intervalVariables = new intervalVariables();
  }

  generateCodeEditorDOM(){
    this.combineAllActions();
    return this.codeEditor.getCodeEditor();
  }

  combineAllActions(){
    let codeEditor = this.codeEditor.getCodeEditor();
    addingCodeEditorEventListeners(codeEditor, this.intervalVariables, this.conditionalVariables, this.dataVariables);
    addingInputEventListeners(codeEditor,this.dataVariables,this.conditionalVariables,this.arrayVariables)
    // let testLine = document.getElementsByClassName('code_editor_line_measure')[0].childNodes[1];
    // let charSize = (testLine.clientWidth)/40;
  }
  /**
   * @description - we need some values of Code editor after the codeEditor has been injected into
   * the DOM like height and width of a div or <p>. we might need to run some functions after the DOM
   * is injected. we assign all those kinds of data into variables and run all those functions
   * in this function which will be called after the code Editor is appended into the DOM.
   * 
   */
  setupInitialDomData(){
    // update the character width size once the DOM is appended 
    let codeEditor = this.codeEditor.getCodeEditor();

    let testLine = codeEditor.getElementsByClassName('code_editor_line_measure')[0].childNodes[0];
    this.dataVariables.setCharSize((testLine.clientWidth)/40);
    
    // update line height of the lines in code editor
    let testLine1 = codeEditor.getElementsByClassName('line')[0]
    let testLineDimensions = testLine1.getBoundingClientRect();
    let testLineHeight = testLineDimensions.top - testLineDimensions.bottom;
    this.dataVariables.setLineHeight(Math.abs(testLineHeight))
    // start cursor Blink
    cursorBlink(codeEditor);

    // adding eventListeners on windows
    addingWindowEventListener(codeEditor,this.conditionalVariables,this.intervalVariables,this.dataVariables);
  }
}