import focusOnCursor from "./focusOnCursor";
import SelectTextByMouse from "./selectTextByMouse";
import { codeEditorCont, dataVariables, conditionalVariables } from "../store";
/**
 * This methods runs when the events for making the cursor go Right along with Shift key is triggered and makes
 * the cursor go Right selecting the text left to it and move down if the cursor reached the end of text.
 * @function cursorNavigationSelectRight
 */
export default function cursorNavigationSelectRight(){

  let drag = conditionalVariables.getDrag();
  let textSelectionInProgress = conditionalVariables.getTextSelectionInProgress();
  let lineNumber = dataVariables.getLineNumber();
  let charNumber = dataVariables.getCharNumber();
  let charSize = dataVariables.getCharSize();
  let lineHeight = dataVariables.getLineHeight();
  let numberLineWidth = dataVariables.getNumberLineWidth();
  let lineEnd = dataVariables.getLineEnd();
  let lineStart = dataVariables.getLineStart();

  let codeLines = codeEditorCont.getElementsByClassName("line");
  let cursor = codeEditorCont.getElementsByClassName('code_editor_cursor')[0];
  if(charNumber < codeLines[lineNumber-1].innerText.length){
      if(!textSelectionInProgress){
        lineStart=dataVariables.setLineStart({
            line : lineNumber,
            char:charNumber
        });
        lineEnd=dataVariables.setLineEnd({
            line : lineNumber,
            char:charNumber
        });
        textSelectionInProgress = conditionalVariables.setTextSelectionInProgress(true);
      }
      if(codeLines[lineNumber-1].innerText == "\u200B" && lineNumber != codeLines.length) {
        charNumber = dataVariables.setCharNumber(0);
        lineNumber = dataVariables.setLineNumber(lineNumber + 1);
        lineEnd.line = lineEnd.line + 1;
        lineEnd.char = 1;
        dataVariables.setLineEnd(lineEnd);
        cursor.style.left = (charNumber)*charSize + numberLineWidth  + "px";
        cursor.style.top = (lineNumber)*lineHeight +"px";
      }
      else {
        charNumber = dataVariables.setCharNumber(charNumber + 1);
        lineEnd.char = lineEnd.char + 1;
        dataVariables.setLineEnd(lineEnd);
        cursor.style.left = (charNumber)*charSize + numberLineWidth  + "px";
      }
     
  }
  else if(charNumber == codeLines[lineNumber-1].innerText.length && lineNumber != codeLines.length){
    charNumber =  dataVariables.setCharNumber(0);
    lineNumber = dataVariables.setLineNumber(lineNumber + 1);;
    lineEnd.char = 1;
    lineEnd.line = lineEnd.line + 1;
    dataVariables.setLineEnd(lineEnd);
    cursor.style.left = (charNumber)*charSize + numberLineWidth  + "px";
    cursor.style.top = (lineNumber)*lineHeight +"px";
  }
  drag = conditionalVariables.setDrag(true);
  focusOnCursor();
  SelectTextByMouse();
}