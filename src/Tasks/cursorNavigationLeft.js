import deselectText from "./deselectText";
import focusOnCursor from "./focusOnCursor";

export default function cursorNavigationLeft(codeEditorCont,dataVariables,conditionalVariables){

  let textSelectionInProgress = conditionalVariables.getTextSelectionInProgress();
  let lineNumber = dataVariables.getLineNumber();
  let charNumber = dataVariables.getCharNumber();
  let charSize = dataVariables.getCharSize();
  let lineHeight = dataVariables.getLineHeight();
  let numberLineWidth = dataVariables.getNumberLineWidth();


  deselectText(codeEditorCont);
  conditionalVariables.setDrag(false);
  textSelectionInProgress = conditionalVariables.setTextSelectionInProgress(false);
  let codeLines = codeEditorCont.getElementsByClassName("line");
  let cursor = codeEditorCont.getElementsByClassName('code_editor_cursor')[0];
  
  if(charNumber > 0){
      charNumber = dataVariables.setCharNumber(charNumber - 1);
      cursor.style.left = (charNumber)*charSize + numberLineWidth  + "px";
  } else if(charNumber == 0 && lineNumber != 1){
      if(codeLines[lineNumber-2].innerText == "\u200B"){
          charNumber = dataVariables.setCharNumber(0);

      } else {
          charNumber = dataVariables.setCharNumber(codeLines[lineNumber-2].innerText.length);
      }        
      lineNumber = dataVariables.setLineNumber(lineNumber - 1);
      cursor.style.left = (charNumber)*charSize + numberLineWidth  + "px";
      cursor.style.top = (lineNumber-1)*lineHeight +"px";
  }

  focusOnCursor(codeEditorCont,dataVariables);
  
  
}