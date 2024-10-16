//java -jar C:\Users\Axel\Desktop\JavaTown.jar\JavaTown.jar

/**
 * to do:
 * add object garbage cleanup system
 * display
 * allow chaining of method calls -- replacement of variable value??
 * 
 * ...
 * more features?
 */

String.prototype.trimm = function() {
  let a = this.trim();
  let b = "";
  while (a.length > 0) {
    if (a.substring(0,2) == "//") {
      if (a.indexOf("\n") == -1) {
        break;
      }
      a = a.substring(a.indexOf("\n"));
    }
    else if (a.substring(0,2) == "/*") {
      if (a.indexOf("*/") == -1) {
        break;
      }
      a = a.substring(a.indexOf("*/")+2);
    }
    else {
      b += a.substring(0,1);
      a = a.substring(1);
    }
  }
  return b;
}

class objectFunction {
  constructor(name, parameters, body, isPrivate) {
    this.name = name;
    this.parameters = parameters;
    this.parameterNumber = parameters.length;
    this.body = body;
    this.isPrivate = isPrivate;
  }
}

class objectVariable {
  constructor(name, value, level) {
    this.name = name;
    this.value = value;
    this.level = level;
  }
}

class objectObject {
  constructor(classValue, houseNumber) {
    this.houseNum = houseNumber;
    this.class = classValue;
    this.variables = [];
    for (let i = 0; i < classes[this.class].variables.length; i++) {
      this.variables.push(new objectVariable(classes[this.class].variables[i].name, null));
    }
  }
}

let height = window.innerHeight;
let width = window.innerWidth;

let fileInput = document.getElementById("file");
let input = document.getElementById("input");
let terminal = document.getElementById("terminal");
let widthDiv = document.getElementById("widthDiv");
let heap = document.getElementById("heap");
let animation = document.getElementById("animation");
let policeText = document.getElementById("policeText");

  let options = [];
  for (let i = 0; i < 3; i++) {
    options.push(document.getElementById("option"+i));
  }
  let smallPerson = document.getElementById("smallPerson");
  smallPerson.display = "none";
  let people = [];
  for (let i = 1; i < 9; i++) {
    people.push(document.getElementById("person"+i));
    people[i-1].setAttribute("display","none");
  }
  let boards = [];
  for (let i = 1; i < 9; i++) {
    boards.push(document.getElementById("board"+i));
    boards[i-1].setAttribute("display","none");
  }
  let text = [];
  for (let i = 1; i < 9; i++) {
    text.push([]);
    for (let j = 0; j < 5; j++) {
      if (j == 0) {
        text[i-1].push(document.getElementById("className"+i));
      }
      else {
        text[i-1].push(document.getElementById("text"+i+j));
      }
    }
  }
  let speech = [];
  for (let i = 1; i < 9; i++) {
    speech.push(document.getElementById("speech"+i));
    speech[i-1].ctype = "thought";
  }
input.style.width = '400px';

let currentLocation = 0;
let classes = [];
let objects = [];
let variables = [];
let s = [""];
let tnum = 0;
let lastCheckedWord;
let speed = 0.5;
let commands = [];
let houses = [];
let positions = [];
fillHouses(8);

//getComputedTextLength
function textBox(ele,text,params,color) {
  ele.setAttribute("display","block");
  let group;
  if (ele.ctype == "thought") {
    let l;
    if (ele.children.length == 1) {
      l = {e: -10, f: 10};
    }
    else {
      //get the children whose display is not none
      for (let i = ele.children.length-1; i >= 0; i--) {
        if (ele.children[i].getAttribute("display") != "none") {
          l = ele.children[i].transform.baseVal[0].matrix;
          break;
        }
      }
    }
    ele.innerHTML += "<g transform=\"translate(" + (l.e + 10) + " " + (l.f - 10) + ")\"><path id=\"path-p2ulfr5j8d\" d=\"M179.513912,253C179.513912,255,179.513912,258,179.513912,260C179.513912,262,180.513912,263,182.513912,263C184.513912,263,184.513912,263,186.513912,263C188.513912,263,189.513912,262,189.513912,260C189.513912,258,189.513912,255,189.513912,253C189.513912,251,188.513912,250,186.513912,250C184.513912,250,184.513912,250,182.513912,250C180.513912,250,179.513912,251,179.513912,253Z\" transform=\"translate(0.486088 0)\" fill=\"rgb(255,255,255)\" stroke=\"rgb(0,0,0)\" stroke-width=\"1\" style=\"mix-blend-mode: normal; paint-order: fill;\"></path></g>";
    group = ele.children[ele.children.length-1];
  }
  else {
    group = ele.children[0];
  }

  group.innerHTML += "<text id=\"smallPersonText\" font-family=\"&quot;Roboto&quot;\" font-size=\"30\" font-weight=\"bold\" text-decoration=\"\" letter-spacing=\"0\" transform=\"matrix(0.5 0 0 0.5 185 265)\" fill=\""+color+"\" stroke=\"none\" stroke-width=\"0\" style=\"mix-blend-mode: normal; paint-order: fill;\"><tspan stroke-width=\"0\" y=\"0\" id=\"tspan-s5kb8ia4pub\" style=\"mix-blend-mode: normal; paint-order: fill;\">"+text+"</tspan></text>"
  let maxWidth = group.children[group.children.length-1].children[0].getComputedTextLength();
  for (let i = 0; i < params.length; i++) {
    group.innerHTML += "<text id=\"smallPersonText\" font-family=\"&quot;Roboto&quot;\" font-size=\"30\" font-weight=\"400\" text-decoration=\"\" letter-spacing=\"0\" transform=\"matrix(0.5 0 0 0.5 185 "+(265+20+20*i)+")\" fill=\"rgb(0,0,0)\" stroke=\"none\" stroke-width=\"0\" style=\"mix-blend-mode: normal; paint-order: fill;\"><tspan stroke-width=\"0\" y=\"0\" id=\"tspan-s5kb8ia4pub\" style=\"mix-blend-mode: normal; paint-order: fill;\">"+params[i]+"</tspan></text>"
    if (maxWidth < group.children[group.children.length-1].children[0].getComputedTextLength()) {
      maxWidth = group.children[group.children.length-1].children[0].getComputedTextLength();
    }
  }
  maxWidth /= 2;
  maxWidth += 10;
  let hegt = 8+20*params.length;
  group.children[0].setAttribute("d","M179.5,253C179.5,"+(255+hegt)+",179.5,"+(258+hegt)+",179.5,"+(260+hegt)+"C179.5,"+(262+hegt)+",180.5,"+(263+hegt)+",182.5,"+(263+hegt)+"C"+(174.5+maxWidth)+","+(263+hegt)+","+(174.5+maxWidth)+","+(263+hegt)+","+(176.5+maxWidth)+","+(263+hegt)+"C"+(178.5+maxWidth)+","+(263+hegt)+","+(179.5+maxWidth)+","+(262+hegt)+","+(179.5+maxWidth)+","+(260+hegt)+"C"+(179.5+maxWidth)+",258,"+(179.5+maxWidth)+",255,"+(179.5+maxWidth)+",253C"+(179.5+maxWidth)+",251,"+(178.5+maxWidth)+",250,"+(176.5+maxWidth)+",250C184.5,250,184.5,250,182.5,250C180.5,250,179.5,251,179.5,253Z");
}

function hideTextBox(ele) {
  if (ele.ctype == "thought") {
    let count = 0;
    for (let i = 0; i < ele.children.length; i++) {
      if (ele.children[i].getAttribute("display") != "none") {
        count++;
      }
    }
    if (count == 2) {
      ele.setAttribute("display","none");
      ele.innerHTML = "<circle translate=\"none\" r=\"3\" cx=\"173\" cy=\"255\" fill=\"#ffffff\" stroke=\"rgb(0,0,0)\" stroke-width=\"1\"/>";
    }
    else {
      for (let i = ele.children.length-1; i >= 0; i--) {
        if (ele.children[i].getAttribute("display") != "none") {
          ele.children[i].setAttribute("display","none");
          break;
        }
      }
    }
  }
  else {
    ele.setAttribute("display","none");
    ele.innerHTML = "<g transform=\"translate(0 0)\"><path id=\"path-p2ulfr5j8d\" d=\"M179.513912,253C179.513912,255,179.513912,258,179.513912,260C179.513912,262,180.513912,263,182.513912,263C184.513912,263,184.513912,263,186.513912,263C188.513912,263,189.513912,262,189.513912,260C189.513912,258,189.513912,255,189.513912,253C189.513912,251,188.513912,250,186.513912,250C184.513912,250,184.513912,250,182.513912,250C180.513912,250,179.513912,251,179.513912,253Z\" transform=\"translate(0.486088 0)\" fill=\"rgb(255,255,255)\" stroke=\"rgb(0,0,0)\" stroke-width=\"1\" style=\"mix-blend-mode: normal; paint-order: fill;\"></path></g>";
  }
}

async function animate(type, data, parameters) {
  return new Promise(async (resolve) => {
    if (type == "create a new object") {
      textBox(policeText,"new " + data[1],parameters,"#000000");
      smallPerson.setAttribute("display","block");
      //show dude in his hand, show in a text box "new" + className + parameters
      await animate("go to an object", [data[0]]);
      smallPerson.setAttribute("display","none");
      console.log(data[0])
      people[data[0]-1].setAttribute("display","block");
      boards[data[0]-1].setAttribute("display","block");
      text[data[0]-1][0].innerHTML = data[1];
      text[data[0]-1][0].setAttribute("display","block");
      hideTextBox(policeText);
    }
    else if (type == "go to an object") {
      animation.setAttribute("dur",1*speed+"s")
      animation.setAttribute("repeatCount",1)
      if (positions.length == 0) {
        animation.setAttribute("path","m0,0 l"+data[0]%2?"-20":"20"+",-20 v"+(-64)*(data[0]%2?3.5:4-data[0]/2));
        positions.push(data[0]);
      }
      else {
        let p = positions[positions.length-1];
        animation.setAttribute("path","m"+p%2?"-20":"20"+((-64)*(p%2?3.5:4-p/2)-20)+" m"+data[0]%2?"-20":"20"+((-64)*(data[0]%2?3.5:4-data[0]/2)-20));
        positions.push(data[0]);
      }
      animation.beginElement();
      await delay(1000*speed);
    }
    else if (type == "running function") {
      let list = [];
      for (let i = 0; i < parameters.length; i++) {
        list.push(data[2][i] + ": " + parameters[i]);
      }
      textBox(policeText,data[1],list,"#000000");
      await delay(1000*speed);
      textBox(speech[data[0]-1],data[1],list,"#000000");
      await delay(500*speed);
      hideTextBox(policeText);
      await delay(500*speed);
    }
    else if (type == "creturn") {
      textBox(speech[data[0]-1],"I live at #"+data[0],[],"#0000ff");
      await delay(1000*speed);
      hideTextBox(speech[data[0]-1]);
      textBox(policeText,"#"+data[0],[],"#0000ff");
      await animate("go back",[data[0]]);
      hideTextBox(policeText);
    }
    else if (type == "return") {
      if (data[1] == "null") {
        textBox(speech[data[0]-1],"OK",[],"#0000ff");
      }
      else {
        textBox(speech[data[0]-1],"It is "+data[1],[],"#0000ff");
      }
      await delay(400*speed);
      hideTextBox(speech[data[0]-1]);
      await delay(400*speed);
    }
    else if (type == "hide") {
      hideTextBox(speech[data[0]-1]);
      refreshObjectVariables();
    }
    else if (type == "go back") {
      animation.setAttribute("dur",1*speed+"s");
      animation.setAttribute("repeatCount",1);
      let p = positions.pop();
      if (p != data[0]) {
        console.log(p,data[0]);
      }
      if (positions.length == 0) {
        animation.setAttribute("path","m"+data[0]%2?"-20":"20"+((-64)*(data[0]%2?3.5:4-data[0]/2)-20)+" l"+data[0]%2?"20":"-20"+",20 v"+(64)*(data[0]%2?3.5:4-data[0]/2));
      }
      else {
        let p = positions[positions.length-1];
        animation.setAttribute("path","m"+data[0]%2?"-20":"20"+((-64)*(data[0]%2?3.5:4-data[0]/2)-20)+" m"+p%2?"-20":"20"+((-64)*(p%2?3.5:4-p/2)-20));
      }
      animation.beginElement();
      await delay(1000*speed);
    }
    resolve();
  })
}

function fillHouses(num) {
  houses = [];
  for (let i = 1; i < 1+num; i++) {
    houses.push(i);
  }
}

async function execute() {
  let text="";
  s[0] += input.value;
  commands.push(input.value);
  //get the last character of s[0]
  if(s[0].charAt(s[0].length-1) != ";")  {
    s[0] += ";";
  }
  try { 
    await runCode();
  }
  catch (e) {
    console.log(e, s);
  }

  //Autoformating
  if (options[2].checked) {
    let lines = input.value.split(/\r?\n/);
    // fix { that aren't on their own line
    for (let i = 0; i < lines.length; i++) {
      lines[i] = lines[i].trim();
      if (lines[i].trimm() != "{" && lines[i].indexOf("{") != -1) {
        lines.splice(i+1,0,"{",lines[i].substring(lines[i].indexOf("{")+1).trim());
        lines[i] = lines[i].substring(0,lines[i].indexOf("{"));
      }
    }
    // fix } that aren't on their own line
    for (let i = 0; i < lines.length; i++) {
      lines[i] = lines[i].trim();
      if (lines[i].trimm() != "}" && lines[i].indexOf("}") != -1) {
        lines.splice(i+1,0,"}",lines[i].substring(lines[i].indexOf("}")+1).trim());
        lines[i] = lines[i].substring(0,lines[i].indexOf("}"));
      }
    }
    // fix statements that aren't on their own line
    for (let i = 0; i < lines.length; i++) {
      lines[i] = lines[i].trim();
      if (lines[i].indexOf(";",lines[i].indexOf(";")+1) != -1) {
        lines.splice(i+1,0,lines[i].substring(lines[i].indexOf(";")+1).trim());
        lines[i] = lines[i].substring(0,lines[i].indexOf(";")+1);
      }
    }
    // get rid of empty lines
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() == "") {
        lines.splice(i,1);
      }
    }
    let tab = 0;
    text += "<p>";
    for(let i=0;i<lines.length;i++){
      let tabText = "";
      if(lines[i].trimm() == "}") {
        tab--;
      }
      for (let j = 0; j < tab; j++) {
        tabText+='&emsp;';
      }
      if(lines[i].trimm() == "{") {
        tab++;
      }
      text += "<br>" + tabText + lines[i];
    }
    text += "</p>";
  }
  else {
    let lines = input.value.split(/\r?\n/);
    let tab = "";
    text += "<p>";
    for(let i=0;i<lines.length;i++){
      tab = "";
      while (lines[i].substring(0,1) == "\t") {
        lines[i] = lines[i].substring(1);
        tab += "&emsp;";
      }
      text+="<br>"+tab+lines[i];
    }
    text += "</p>";
  }

  input.value = "";
  terminal.innerHTML += text;
  terminal.scrollTo(0,terminal.scrollHeight);
}

function autoFormat(num) {
  if (num == 0) {
    for (let i = 0; i < options.length; i++) {
      options[i].checked = options[0].checked;
    }
  }
}

async function evaluateParameters(string, isDefinition, theObject) {
  return new Promise(async (resolve) => {
    //loop through the string, and add parameters to an array, skipping over "", '', and ()
    let parameters = [];
    let p = "";
    while (string.length > 0) {
      if (string.substring(0,1) == "(") {
        s[7] = string;
        getNextChar(7, "(", true);
        p += string.substring(0,string.indexOf(")^"+tnum+"^")+3+(tnum+"").length+1);
        string = string.substring(string.indexOf(")^"+tnum+"^")+3+(tnum+"").length);
      }
      else if (string.substring(0,1) == "\"") {
        p += string.substring(0,string.indexOf("\"",1)+1);
        string = string.substring(string.indexOf("\"",1));
      }
      else if (string.substring(0,1) == "'") {
        p += string.substring(0,string.indexOf("'",1)+1);
        string = string.substring(string.indexOf("'",1));
      }
      else if (string.substring(0,1) == ",") {
        if (isDefinition) {
          parameters.push(p);
        }
        else {
          parameters.push(await evaluateExpression(p, theObject));
        }
          p = "";
      }
      else if (string.substring(0,1) == "") {
        p += string.substring(0,1);
      }
      else {
        p += string.substring(0,1);
      }
      string = string.substring(1);
    }
    if (p != "") {
      if (isDefinition) {
        parameters.push(p);
      }
      else {
        parameters.push(await evaluateExpression(p, theObject));
      }
    }
    resolve(parameters);
  });
}

async function runCode() {
  return new Promise(async (resolve) => {
    //ctx.drawImage(tile, 0, 0);

    labelPB(0);
    while (getNext(0)) {
      if (checkNextWord(0, "public")) {
        if (checkNextWord(0, "class")) {
          let name = getNextWord(0);
          let tvariables = [];
          let functions = [];
          let constructors = [];
          if (getNextChar(0, "{")) {
            while(checkNextWord(0, "public", true) || checkNextWord(0, "private", true)) {
              let functionName = getNextWord(0);
              let functionParameters = [];
              let functionBody;
              if (getNextChar(0, ";")) {
                if (lastCheckedWord == "public") {
                  error("Variables cannot be public :/", currentLocation);
                }
                tvariables.push(new objectVariable(functionName));
              }
              else if (getNextChar(0, "(", true)) {
                let t12 = tnum;
                functionParameters = await evaluateParameters(s[0].substring(0,s[0].indexOf(")^"+t12+"^")),true);
                s[0] = s[0].substring(s[0].indexOf(")^"+t12+"^")+3+(t12+"").length);
                if (getNextChar(0, "{", true)) {
                  if (s[0].indexOf("}^"+tnum+"^") != -1 ) {
                    let t123 = tnum;
                    functionBody = checkFunctionBody(s[0].substring(0,s[0].indexOf("}^"+t123+"^")));
                    s[0] = s[0].substring(s[0].indexOf("}^"+t123+"^")+3+(t123+"").length);
                  }
                  else {
                    error("} expected", currentLocation);
                  }
                }
                else {
                  error("{ expected", currentLocation);
                }
                if (functionName == name) {
                  constructors.push(new objectFunction(functionName, functionParameters, functionBody));
                }
                else {
                  functions.push(new objectFunction(functionName, functionParameters, functionBody, lastCheckedWord == "private"));
                }
              }
              else {
                error("incorrect method or variable declaration", currentLocation);
              }
            } 
            if (getNextChar(0, "}")) {
              getNextChar(0, ";");
              if (constructors.length == 0) {
                constructors.push(new objectFunction(name, [], ""));
              }
              createClass(name, tvariables, functions, constructors);
              terminal.innerHTML += "<p>Defined class "+name+"</p>";
              terminal.scrollTo(0,terminal.scrollHeight);
            }
            else {
              error("} expected", currentLocation);
            }
          }
          else {
            error("{ expected", currentLocation);
          }
        }
        else {
          error("incomplete class declaration", currentLocation);
        }
      }
      else if (checkNextWord(0,"print")) {
        if (getNextChar(0, "(", true)) {
          let t12 = tnum;
          functionParameters = await evaluateParameters(s[0].substring(0,s[0].indexOf(")^"+t12+"^")),true);
          s[0] = s[0].substring(s[0].indexOf(")^"+t12+"^")+3+(t12+"").length);
        }
        else {
          error("( expected");
        }
      }
      else {
        await runStatement(s[0]);
        refreshVariables();
      }
    }
    resolve();
  });
}

function refreshVariables() {
  for (let i = variables.length - 1; i >= 0; i--) {
    if (variables[i].level > 0) {
      variables.splice(i,1);
    }
  }
  heap.innerHTML = "";
  for (let i = 0; i < variables.length; i++) {
    heap.innerHTML += "<p>"+variables[i].name+": "+variables[i].value+"</p>";
  }
  refreshObjectVariables();
}

function refreshObjectVariables() {
  for (let i = 0; i < objects.length; i++) {
    if (objects[i]) {
      for (let j = 1; j < Math.min(5,objects[i].variables.length+1); j++) {//fix this later
        text[objects[i].houseNum-1][j].innerHTML = objects[i].variables[j-1].name+": "+objects[i].variables[j-1].value;
        text[objects[i].houseNum-1][j].setAttribute("display","block")
      }
    }
  }
}

function getLevel() {
  let max = 0;
  for (let i = 0; i < variables.length; i++) {
    if (variables[i].level > max) {
      max = variables[i].level;
    }
  }
  return max;
}

async function evaluateExpression(expression, theObject) {
  return new Promise(async (resolve) => {
    s[5] = expression;
    let value = "";
    
    while (getNext(5)) {
      let theWord = getNextWord(5);
      if ((theWord.substring(0,1) == "'" || theWord.substring(0,1) == "\"") && (theWord.substring(theWord.length-1,theWord.length) == "'" || theWord.substring(theWord.length-1,theWord.length) == "\"")) {
        value += "\"" + theWord.substring(1,theWord.length-1) + "\"";
      }
      else if (theWord == "true" || theWord == "false") {
        value += theWord;
      }
      else if (theWord == "") {
        value += s[5].substring(0,1);
        s[5] = s[5].substring(1);
      }
      else if (theWord == "new") {
        let className = getNextWord(5);
        if (getNextChar(5, "(", true)) {
          let t123678 = tnum;
          let pramList = await evaluateParameters(s[5].substring(0,s[5].indexOf(")^"+tnum+"^")),false,classes[object.class]);
          s[5] = s[5].substring(s[5].indexOf(")^"+t123678+"^")+3+(t123678+"").length);
          for (let i = 0; i < classes.length; i++) {
            if (classes[i].name == className) {
              let l = classes[i].constructors;
              for (let j = 0; j < l.length || l.length == 0; j++) {
                if (l.length == 0 || l[j].parameterNumber == pramList.length) {
                  if (houses.length == 0) {
                    error("Out of memory", currentLocation);
                  }
                  let mval = Math.floor(Math.random() * houses.length);
                  mval = houses.splice(mval,1)[0];
                  objects[mval] = new objectObject(i, mval);
                  for (let a = variables.length-1; a >= 0; a--) {
                    if (variables[a].name == theWord) {
                      variables[a].value = "#" + mval;
                      value += mval;
                    }
                    else if (a == 0) {
                      variables.push(new objectVariable(theWord, "#" + mval, level));
                      value += mval;
                    }
                  }
                  if (variables.length == 0) {
                    variables.push(new objectVariable(theWord, "#" + mval, level));
                    value += mval;
                  }
                  let currentFunctionBody = s[5];

                  await animate('create a new object', [mval, classes[i].name], pramList);
                  await runFunction(objects[mval], l[j], pramList, level+1, true);
                  await animate('creturn', [mval]);
                  //refreshObjectVariables();
                  s[5] = currentFunctionBody;
                  break;
                }
                else if (j == l.length - 1 && l.length != 0) {
                  error("No constructor found with " + pramList.length + " parameters", currentLocation);
                }
              }
              break;
            }
            else if (i == classes.length - 1) {
              error("Class not found", currentLocation);
            }
          }
        }
        else {
          error("( expected", currentLocation);
        }
      }
      else if (getNextChar(5,".")) {
        let functionName = getNextWord(5);
        if (getNextChar(5,"(", true)) {
          let temporary = s[5];
          let abcdefg = tnum;
          let pramList = await evaluateParameters(s[5].substring(0,s[5].indexOf(")^"+tnum+"^")),theObject);
          s[5] = temporary.substring(temporary.indexOf(")^"+tnum+"^")+3+(tnum+"").length);
          if (theWord == "this") {
            if (theObject == null) {
              throw "unexpected \"this\"";
            }
            let l = classes[theObject.class].functions;
            animate('go to an object', [theObject.houseNum, functionName], pramList);
            for (let j = 0; j < l.length; j++) {
              if (l[j].name == functionName && l[j].parameterNumber == pramList.length) {
                let currentFunctionBody = s[5];
                value += await runFunction(theObject,l[j], pramList, getLevel()+1, false);
                await animate('go back',[theObject.houseNum]);
                s[5] = currentFunctionBody;
                break;
              }
              else if (j == l.length - 1) {
                error("Function not found", currentLocation);
              }
            }
          }
          else {
            for (let i = variables.length - 1; i >= 0; i--) {
              if (theWord == variables[i].name) {
                let l = classes[objects[variables[i].value.substring(1)].class].functions;
                await animate('go to an object', [variables[i].value.substring(1), functionName], pramList);
                for (let j = 0; j < l.length; j++) {
                  if (l[j].name == functionName && l[j].parameterNumber == pramList.length && l[j].isPrivate == false) {
                    let currentFunctionBody = s[5];
                    value += await runFunction(objects[variables[i].value.substring(1)],l[j], pramList, getLevel()+1, false);
                    await animate('go back',[variables[i].value.substring(1)]);
                    s[5] = currentFunctionBody;
                    break;
                  }
                  else if (j == l.length - 1) {
                    error("Function not found", currentLocation);
                  }
                }
                break;
              }
              else if (i == 0) {
                error("Variable not found", currentLocation);
              }
            }
          }
        }
        else {
          value += theWord + "." + functionName;
        }
      }
      else if (!isNaN(theWord)) {
        value += theWord;
      }
      else {
        //find variable with name and value += variable.value
        for (let i = variables.length - 1; i >= 0; i--) {
          if (theWord == variables[i].name) {
            if (variables[i].value.substring(0,1) == "#")
              value += "\""+variables[i].value+"\"";
            else
              value += variables[i].value;
            break;
          }
          else if (i == 0) {
            console.log(variables, theWord);
            error("Variable not found", currentLocation);
          }
        }
      }
    }

    while (value.indexOf("^") != -1) {
      value = value.substring(0,value.indexOf("^")) + value.substring(value.indexOf("^",value.indexOf("^")+1)+1);
    }

    console.log(value);
    resolve(eval(value));
  });
}

async function runFunction(object, functionObject, parameters, level, isConstructor) {
  return new Promise(async (resolve) => {
    await animate("running function", [object.houseNum, functionObject.name, functionObject.parameters], parameters);
    s[3] = functionObject.body;
    for (let i = 0; i < parameters.length; i++) {
      variables.push(new objectVariable(functionObject.parameters[i], parameters[i], level));
    }
    for (let i = 0; i < object.variables.length; i++) {
      for (let j = 0; j < variables.length; j++) {
        if (variables[j].name == object.variables[i].name) {
          break;
        }
        else if (j == variables.length - 1) {
          object.variables[i].level = level;
          variables.push(object.variables[i]);
        }
      }
      if (variables.length == 0) {
        object.variables[i].level = level;
        variables.push(object.variables[i]);
      }
    }
    
    while (getNext(3)) {
      if (getNextChar(3, "^")) {
        s[3] = s[3].substring(s[3].indexOf("^")+1);
        for (let i = variables.length-1; i >= 0; i--) {
          if (variables[i].level == level) {
            variables.splice(i,1);
          }
        }
        level--;
      }
      else if (checkNextWord(3, "if")) {
        if (getNextChar(3, "(", true)) {
          let t123 = tnum;
          let boolean = await evaluateExpression(s[3].substring(0,s[3].indexOf(")^"+t123+"^")), object);
          s[3] = s[3].substring(s[3].indexOf(")^"+t123+"^")+3+(t123+"").length);
          if (getNextChar(3, "{", true)) {
            if (boolean == true) {
              let temp1 = s[3].substring(0,s[3].indexOf("}^"+tnum+"^"));
              s[3] = s[3].substring(s[3].indexOf("}^"+tnum+"^")+3+(tnum+"").length);
              while (getNextWord(3, "else")) {
                //else if 
                if (getNextWord(3, "if")) {
                  if (getNextChar(3, "(", true)) {
                    s[3] = s[3].substring(s[3].indexOf(")^"+tnum+"^")+3+(tnum+"").length);
                  }
                  else {
                    error("( expected", currentLocation);
                  }
                }
                //else if 
                if (getNextChar(3, "{", true)) {
                  s[3] = s[3].substring(s[3].indexOf("}^"+tnum+"^")+3+(tnum+"").length);
                }
                else {
                  error("{ expected", currentLocation);
                }
              }
              level++;
              s[3] = temp1 + "^"+level+"^" + s[3];
              wasIf = false;
            }
            else {
              s[3] = s[3].substring(s[3].indexOf("}^"+tnum+"^")+3+(tnum+"").length);
              wasIf = true;
            }
          }
          else {
            error("{ expected", currentLocation);
          }
        }
        else {
          error("( expected", currentLocation);
        }
      }
      else if (checkNextWord(3, "else")) {
        if (wasIf) {
          if (getNextWord(3, "if")) {
            if (getNextChar(3, "(", true)) {
              let t123 = tnum;
              let boolean = await evaluateExpression(s[3].substring(0,s[3].indexOf(")^"+t123+"^")), object);
              s[3] = s[3].substring(s[3].indexOf(")^"+t123+"^")+3+(t123+"").length);
              if (getNextChar(3, "{", true)) {
                if (boolean == true) {
                  let temp1 = s[3].substring(0,s[3].indexOf("}^"+tnum+"^"));
                  s[3] = s[3].substring(0,s[3].indexOf("}^"+tnum+"^")+3+(tnum+"").length);
                  while (getNextWord(3, "else")) {
                    if (getNextWord(3, "if")) {
                      if (getNextChar(3, "(", true)) {
                        s[3] = s[3].substring(s[3].indexOf(")^"+tnum+"^")+3+(tnum+"").length);
                      }
                      else {
                        error("( expected", currentLocation);
                      }
                    }
                    if (getNextChar(3, "{", true)) {
                      s[3] = s[3].substring(s[3].indexOf("}^"+tnum+"^")+3+(tnum+"").length);
                    }
                    else {
                      error("{ expected", currentLocation);
                    }
                  }
                  level++;
                  s[3] = temp1 + "^"+level+"^" + s[3];
                  wasIf = false;
                }
                else {
                  s[3] = s[3].substring(s[3].indexOf("}^"+tnum+"^")+3+(tnum+"").length);
                  wasIf = true;
                }
              }
              else {
                error("{ expected", currentLocation);
              }
            }
            else {
              error("( expected", currentLocation);
            }
          }
          else {
            if (getNextChar(3, "{", true)) {
              level++;
              s[3] = s[3].substring(0,s[3].indexOf("}^"+tnum+"^")) + "^" + level + "^"
                  +  s[3].substring(s[3].indexOf("}^"+tnum+"^")+3+(tnum+"").length);
              wasIf = false;
            }
            else {
              error("{ expected", currentLocation);
            }
          }
        }
        else {
          error("unexpected else", currentLocation);
        }
      }
      else if (checkNextWord(3, "return")) {
        wasIf = false;
        if (s[3].indexOf(";") == -1) {
          error("; expected", currentLocation);
        }
        if (isConstructor) {
          error("unexpected return", currentLocation);
        }
        let returnValue = await evaluateExpression(s[3].substring(0,s[3].indexOf(";")), object);
        await animate("hide", [object.houseNum]);
        await animate("return", [object.houseNum, returnValue]);
        resolve(returnValue, object);
      }
      else {
        wasIf = false;
        let name = getNextWord(3);
        if (getNextChar(3,".")) {
          let functionName = getNextWord(3);
          if (getNextChar(3,"(", true)) {
            abcdefgh = tnum;
            let pramList = await evaluateParameters(s[3].substring(0,s[3].indexOf(")^"+tnum+"^")),false,classes[object.class]);
            s[3] = s[3].substring(s[3].indexOf(")^"+abcdefgh+"^")+3+(abcdefgh+"").length);
            if (name == "this") {
              let l = classes[object.class].functions;
              for (let j = 0; j < l.length; j++) {
                if (l[j].name == functionName && l[j].parameterNumber == pramList.length) {
                  let currentFunctionBody = s[3];
                  await runFunction(object, l[j], pramList, level+1, false);
                  s[3] = currentFunctionBody;
                  break;
                }
                else if (j == l.length - 1) {
                  error("Function not found", currentLocation);
                }
              }
            }
            else {
              for (let i = variables.length - 1; i >= 0; i--) {
                if (name == variables[i].name) {
                  let l = classes[objects[variables[i].value.substring(1)].class].functions;
                  for (let j = 0; j < l.length; j++) {
                    if (l[j].name == functionName && l[j].parameterNumber == pramList.length && l[j].isPrivate == false) {
                      let currentFunctionBody = s[3];
                      await runFunction(objects[variables[i].value.substring(1)],l[j], pramList, level+1, false);
                      s[3] = currentFunctionBody;
                      break;
                    }
                    else if (j == l.length - 1) {
                      error("Function not found", currentLocation);
                    }
                  }
                  break;
                }
                else if (i == 0) {
                  error("Variable not found", currentLocation);
                }
              }
            }
          }
          else {
            error("( expected", currentLocation);
          }
        }
        else if (getNextChar(3, "=")) {
          if (checkNextWord(3,"new")) {
            let className = getNextWord(3);
            if (getNextChar(3, "(", true)) {
              let t123 = tnum;
              let pramList = await evaluateParameters(s[3].substring(0,s[3].indexOf(")^"+tnum+"^")),false,classes[object.class]);
              s[3] = s[3].substring(s[3].indexOf(")^"+t123+"^")+3+(t123+"").length);
              for (let i = 0; i < classes.length; i++) {
                if (classes[i].name == className) {
                  let l = classes[i].constructors;
                  for (let j = 0; j < l.length || l.length == 0; j++) {
                    if (l.length == 0 || l[j].parameterNumber == pramList.length) {
                      if (houses.length == 0) {
                        error("Out of memory", currentLocation);
                      }
                      let mval = Math.floor(Math.random() * houses.length) + 1;
                      mval = houses.splice(mval,1)[0];
                      objects[mval] = new objectObject(i, mval);
                      for (let a = variables.length-1; a >= 0; a--) {
                        if (variables[a].name == name) {
                          variables[a].value = "#" + mval;
                        }
                        else if (a == 0) {
                          variables.push(new objectVariable(name, "#" + mval, level));
                        }
                      }
                      if (variables.length == 0) {
                        variables.push(new objectVariable(name, "#" + mval, level));
                      }
                      let currentFunctionBody = s[3];
                      await runFunction(objects[mval], l[j], pramList, level+1, true);
                      s[3] = currentFunctionBody;
                      break;
                    }
                    else if (j == l.length - 1 && l.length != 0) {
                      error("No constructor found with " + pramList.length + " parameters", currentLocation);
                    }
                  }
                  break;
                }
                else if (i == classes.length - 1) {
                  error("Class not found", currentLocation);
                }
              }
            }
            else {
              error("( expected", currentLocation);
            }
          }
          else {
            if (s[3].indexOf(";") == -1) {
              error("; expected", currentLocation);
            }
            let value = await evaluateExpression(s[3].substring(0,s[3].indexOf(";")), object);
            s[3] = s[3].substring(s[3].indexOf(";"));
            for (let i = variables.length - 1; i >= 0; i--) {
              if (variables[i].name == name) {
                variables[i].value = value;
                break;
              }
              else if (i == 0) {
                variables.push(new objectVariable(name, value, level));
              }
            }
            if (variables.length == 0) {
              variables.push(new objectVariable(name, value, level));
            }
          }
        }
        else {
          error("method call or assignment expected", currentLocation);
        }
        if (!getNextChar(3, ";")) {
          error("; expected", currentLocation);
        }
      }
    }
    for (let i = variables.length - 1; i >= 0; i--) {
      if (variables[i].level >= level) {
        variables.splice(i,1);
      }
    }
    animate("hide", [object.houseNum]);
    if (!isConstructor) {
      animate("return", [object.houseNum, "null"]);
      console.log(isConstructor)
    }
    resolve();
  });
}

async function runStatement(body) {
  return new Promise(async (resolve) => {
    s[2] = body.trimm();
    let name = getNextWord(2);
    if (getNextChar(2,".")) {
      let functionName = getNextWord(2);
      if (getNextChar(2,"(", true)) {
        abcd = tnum;
        let pramList = await evaluateParameters(s[2].substring(0,s[2].indexOf(")^"+tnum+"^")),false,null);
        s[2] = s[2].substring(s[2].indexOf(")^"+tnum+"^")+3+(tnum+"").length);
        for (let i = variables.length - 1; i >= 0; i--) {
          if (name == variables[i].name) {
            let houseNum = variables[i].value.substring(1);
            let l = classes[objects[houseNum].class].functions;
            await animate('go to an object', [houseNum, functionName], pramList);
            for (let j = 0; j < l.length; j++) {
              if (l[j].name == functionName && l[j].parameterNumber == pramList.length && l[j].isPrivate == false) {
                await runFunction(objects[houseNum],l[j], pramList, 1, false);
                await animate('go back',[houseNum]);
                break;
              }
              else if (j == l.length - 1) {
                error("Function not found", currentLocation);
              }
            }
            break;
          }
          else if (i == 0) {
            error("Variable not found", currentLocation);
          }
        }
      }
      else {
        error("( expected", currentLocation);
      }
    }
    else if (getNextChar(2,"=")) {
      if (checkNextWord(2,"new")) {
        let className = getNextWord(2);
        if (getNextChar(2,"(", true)) {
          let t123 = tnum;
          let pramList = await evaluateParameters(s[2].substring(0,s[2].indexOf(")^"+tnum+"^")),false,null);
          s[2] = s[2].substring(s[2].indexOf(")^" + t123 + "^")+3+(t123+"").length);
          for (let i = 0; i < classes.length; i++) {
            if (classes[i].name == className) {
              let l = classes[i].constructors;
              for (let j = 0; j < l.length || l.length == 0; j++) {
                if (l.length == 0 || l[j].parameterNumber == pramList.length) {
                  if (houses.length == 0) {
                    error("Out of memory", currentLocation);
                  }
                  let mval = Math.floor(Math.random() * houses.length);
                  console.log(mval);
                  mval = houses.splice(mval,1)[0];
                  console.log(mval, houses, houses.length)
                  objects[mval] = new objectObject(i, mval);
                  await animate('create a new object', [mval, classes[i].name], pramList);
                  await runFunction(objects[mval], l[j], pramList, 1, true);
                  await animate('creturn', [mval]);
                  for (let a = variables.length-1; a >= 0; a--) {
                    if (variables[a].name == name) {
                      variables[a].value = "#" + mval;
                    }
                    else if (a == 0) {
                      variables.push(new objectVariable(name, "#" + mval, 0));
                    }
                  }
                  if (variables.length == 0) {
                    variables.push(new objectVariable(name, "#" + mval, 0));
                  }
                  break;
                }
                else if (j == l.length - 1 && l.length != 0) {
                  error("No constructor found with " + pramList.length + " parameters", currentLocation);
                }
              }
              break;
            }
            else if (i == classes.length - 1) {
              error("Class not found", currentLocation);
            }
          }
        }
        else {
          error("( expected", currentLocation);
        }
      }
      else {
        if (s[2].indexOf(";") == -1) {
          error("; expected", currentLocation);
        }
        let value = await evaluateExpression(s[2].substring(0,s[2].indexOf(";")),null);
        s[2] = s[2].substring(s[2].indexOf(";"));
        for (let i = variables.length - 1; i >= 0; i--) {
          if (variables[i].name == name) {
            variables[i].value = value;
            break;
          }
          else if (i == 0) {
            variables.push(new objectVariable(name, value, 0));
          }
        }
        if (variables.length == 0) {
          variables.push(new objectVariable(name, value, 0));
        }
      }
    }
    else {
      error("method call or variable assignment expected", currentLocation);
    }
    
    if (!getNextChar(2, ";")) {
      error("; expected", currentLocation);
    }

    s[0] = s[2];
    resolve();
  });
}

function labelPB(num) {
  s[num] = s[num].trimm();
  let b = "";
  let num1 = 0;
  let num2 = [];
  while (s[num].indexOf("(") != -1 || s[num].indexOf(")") != -1) {
    if (s[num].indexOf("(") != -1 && (s[num].indexOf("(") < s[num].indexOf(")") || s[num].indexOf(")") == -1)) {
      num1++;
      num2.push(num1);
      b += s[num].substring(0,s[num].indexOf("(")+1) + "^"+num1+"^";
      s[num] = s[num].substring(s[num].indexOf("(")+1);
    }
    else {
      b += s[num].substring(0,s[num].indexOf(")")+1) + "^"+num2.pop()+"^";
      s[num] = s[num].substring(s[num].indexOf(")")+1);
    }
  }
  b += s[num];
  if (num2.length > 0) {
    error("unmatched parentheses", currentLocation);
  }
  num1 = 0;
  num2 = [];
  s[num] = b;
  b = "";

  while (s[num].indexOf("{") != -1 || s[num].indexOf("}") != -1) {
    if (s[num].indexOf("{") != -1 && (s[num].indexOf("{") < s[num].indexOf("}") || s[num].indexOf("}") == -1)) {
      num1++;
      num2.push(num1);
      b += s[num].substring(0,s[num].indexOf("{")+1) + "^"+num1+"^";
      s[num] = s[num].substring(s[num].indexOf("{")+1);
    }
    else {
      b += s[num].substring(0,s[num].indexOf("}")+1) + "^"+num2.pop()+"^";
      s[num] = s[num].substring(s[num].indexOf("}")+1);
    }
  }
  b += s[num];
  if (num2.length > 0) {
    error("unmatched braces", currentLocation);
  }
  s[num] = b;
}

function checkFunctionBody(body) {
  s[1] = body;
  while (getNext(1)) {
    if (checkNextWord(1, "if")) {
      if (getNextChar(1, "(", true)) {
        s[1] = s[1].substring(s[1].indexOf(")^"+tnum+"^")+3+(tnum+"").length);
      }
      else {
        error("( expected", currentLocation);
      }
      if (getNextChar(1, "{", true)) {
        let temp1 = s[1];
        let temp2 = tnum;
        checkFunctionBody(s[1].substring(0,s[1].indexOf("}^"+temp2+"^")));
        s[1] = temp1.substring(temp1.indexOf("}^"+temp2+"^")+3+(temp2+"").length);
      }
      else {
        error("{ expected", currentLocation);
      }
    }
    else if (checkNextWord(1, "return")) {
      if (s[1].indexOf(";") == -1) {
        error("; expected", currentLocation);
      }
      s[1] = s[1].substring(s[1].indexOf(";")+1);
    }
    else {
      getNextWord(1);
      if (getNextChar(1, ".")) {
        getNextWord(1);
        if (getNextChar(1, "(", true)) {
          s[1] = s[1].substring(s[1].indexOf(")^"+tnum+"^")+3+(tnum+"").length);
        }
        else {
          error("( expected", currentLocation);
        }
      }
      else if (getNextChar(1, "=")) {
        if (checkNextWord(1,"new")) {
          getNextWord(1);
          if (getNextChar(1, "(", true)) {
            s[1] = s[1].substring(s[1].indexOf(")^"+tnum+"^")+3+(tnum+"").length);
          }
          else {
            error("( expected", currentLocation);
          }
        }
        else {
          while (s[1].length > 0 && !getNextChar(1, ";")) {
            s[1] = s[1].substring(1);
          }
          s[1] = ";" + s[1];
        }
      }
      else {
        error("method call or assignment expected", currentLocation);
      }
      if (!getNextChar(1, ";")) {
        error("; expected", currentLocation);
      }
    }
  }
  return body;
}

function createClass(aname, avariables, afunctions, aconstructors) {
  for (let i = 0; i < classes.length; i++) {
    if (classes[i].name == aname) {
      classes[i] = {name: aname, variables: avariables, functions: afunctions, constructors: aconstructors};
      return;
    }
  }
  classes.push({name: aname, variables: avariables, functions: afunctions, constructors: aconstructors});
}

function error(details, location) {
  console.log(s);
  s = [""];
  throw details;
}

function getNextChar(num, comparison, getNum) {
  let trimmed = s[num].trimm();
  let word = trimmed.substring(0,1);
  if (word == comparison) {
    if (word == "{" || word == "}" || word == "(" || word == ")") {
      if (trimmed.substring(1,2) == "^") {
        if (getNum) {
          s[num] = trimmed.substring(trimmed.indexOf("^",2)+1);
          tnum = parseInt(trimmed.substring(2,trimmed.indexOf("^",2)));
          return true;
        }
        s[num] = trimmed.substring(trimmed.indexOf("^",2)+1);
        return true;
      }
      return true
    }
    s[num] = trimmed.substring(1);
    return true;
  }
  //current location = blockOfCode.indexOf(s[num])
  return false;
}

function checkNextWord(num, comparison, broadcast) {
  let temp = s[num].trimm();
  let word = "";
  while (temp.length > 0) {
    switch (temp.substring(0,1)) {
      case " ":
      case ".":
      case "\t":
      case "\r":
      case "\n":
      case "(":
      case ")":
      case "{":
      case "}":
      case ";":
      case ",":
      case "+":
      case "-":
      case "*":
      case "/":
      case "%":
      case "=":
      case "|":
      case "&":
      case "!":
      case "^":
      case ">":
      case "<":
        if (word == comparison) {
          if (broadcast) {
            lastCheckedWord = word;
          }
          s[num] = temp;
        }
        return word == comparison;
      default:
        word += temp.substring(0,1);
        temp = temp.substring(1);
    }
  }
  //current location = blockOfCode.indexOf(s[num])
  return word == comparison;
}

function getNextWord(num) {
  s[num] = s[num].trimm();
  let word = "";
  while (s[num].length > 0) {
    switch (s[num].substring(0,1)) {
      case " ":
      case ".":
      case "\t":
      case "\r":
      case "\n":
      case "(":
      case ")":
      case "{":
      case "}":
      case ";":
      case ",":
      case "+":
      case "-":
      case "*":
      case "/":
      case "%":
      case "=":
      case "|":
      case "&":
      case "!":
      case "^":
      case ">":
      case "<":
        return word;
      default:
        word += s[num].substring(0,1);
        s[num] = s[num].substring(1);
    }
  }
  //current location = blockOfCode.indexOf(s[num])
  return word;
}

function getNext(num) {
  s[num] = s[num].trimm();
  if (s[num].length > 0) {
    return true;
  }
  return false;
}

file.addEventListener("input", handleFiles, false);

function handleFiles(event) {
  input.value = event.target.files[0].name;
  let m = new FileReader();
  m.readAsText(event.target.files[0]);
  m.onload = function(e) {
    input.value = e.target.result;
    if (input.value.trimm() == "") {
      executeButton.disabled = true;
    }
    else {
      executeButton.disabled = false;
    }
  }
}

let executeButton = document.getElementById("executeButton");
let lastBrace = false;
let command = 'none';

input.addEventListener('keydown', function(e) {
  if (e.key == "ArrowUp" && (this.value == ""||command!='none') && commands[0]) {
    let i = command!='none'?(commands[command-1]?command-1:command):commands.length-1;
    this.value = commands[i];
    command = i;
    this.selectionStart = this.selectionEnd = this.value.length;
  }
  else if (e.key == "ArrowDown" && (this.value == ""||command!='none') && commands[0]) {
    let i = command!='none'?(commands[command+1]?command+1:command):commands.length-1;
    this.value = commands[i];
    command = i;
  }
  else {
    command = 'none';
  }
  if (e.key == 'Tab') {
    e.preventDefault();
    document.execCommand("insertText",false,"\t");
  }
  if (options[1].checked) {
    if (e.key == "(" || e.key == "{" || e.key == "[") {
      lastBrace = e.key;
      document.execCommand("insertText",false,e.key+(e.key=="("?")":e.key=="{"?"}":"]"));
      e.preventDefault();
      this.selectionStart = this.selectionEnd = this.selectionStart - 1;
    }
    else if (e.key == "'" || e.key == "\"") {
      lastBrace = e.key;
      document.execCommand("insertText",false,e.key+(e.key=="'"?"'":"\""));
      e.preventDefault();
      this.selectionStart = this.selectionEnd = this.selectionStart - 2;
    }
    else if (!e.shiftKey){
      lastBrace = false;
    }
    if ((e.key == ")" && lastBrace == "(") || (e.key == "}" && lastBrace == "{") ||
        (e.key == "]" && lastBrace == "[") || (e.key == "'" && lastBrace == "'") ||
        (e.key == "\"" && lastBrace == "\"")) {
      e.preventDefault();
      this.selectionStart += 1;
    }
  }
  if (e.ctrlKey && e.key == 'Enter') {
    execute();
  }
  else if (options[2].checked) {
    if (e.key == 'Enter') {
      e.preventDefault();
      let start = this.value.substring(0,this.selectionStart);
      let end = this.value.substring(this.selectionEnd);
      let tabs = start.substring(start.lastIndexOf("\n")+1);
      let tabNum = 0;
      while(tabs.substring(0,1) == "\t") {
        tabs = tabs.substring(1);
        tabNum++;
      }
      if (tabs.indexOf("{") != -1) {
        tabNum++;
      }
      if (end.substring(0,1) == "}") {
        if (tabNum != 0)
          document.execCommand("insertText",false,"\n" + "\t".repeat(tabNum) + "\n" + "\t".repeat(tabNum-1));
        else
          document.execCommand("insertText",false,"\n");
      }
      else {
        document.execCommand("insertText",false,"\n"+"\t".repeat(tabNum));
      }
      this.selectionStart = this.selectionEnd = start.length+1+tabNum;
    }
    // if (e.key == '}') {
    //   e.preventDefault();
    //   let start = this.value.substring(0,this.selectionStart);
    //   let end = this.value.substring(this.selectionEnd);
    //   let tabs = start.substring(0,start.lastIndexOf("{")+1);
    //   tabs = tabs.substring(tabs.lastIndexOf("\n")+1);
    //   let tabNum = -1;
    //   while(tabs.substring(0,1) == "\t") {
    //     tabs = tabs.substring(1);
    //     tabNum++;
    //   }
    //   if (tabs.indexOf("{") != -1) {
    //     tabNum++;
    //   }
    //   if (tabNum != -1)
    //     this.value =  start.substring(0,start.lastIndexOf("\n")+1) + "\t".repeat(tabNum) + start.substring(start.lastIndexOf("\n")+1) + "}" + end;
    //   else 
    //     this.value =  start + "}" + end;
    // }
  }
});

input.addEventListener('keyup', function(e) {
  if (input.value.trimm() == "") {
    executeButton.disabled = true;
  }
  else {
    executeButton.disabled = false;
  }
});

/*window.onresize = input.onmouseup = image.onload = handleResize;
input.onmousedown = function () {window.onmousemove = handleResize};
input.onmouseup = function () {window.onmousemove = null};
function handleResize() {
  canvas.width = window.innerWidth - widthDiv.getBoundingClientRect().width;
  canvas.height = canvas.width * 563 / 675;
  ctx.drawImage(image,0,0,canvas.width,canvas.width*563/675);
}*/

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let menu = document.getElementById("menu");
let menuButton = document.getElementById("menuButton");
let menuButtonIcon = document.getElementById("menuButtonIcon");
let menuShow = false;
function updateMenu() {
  if (menuShow) {
    menuShow = false;
    menu.classList.remove("show");
  }
  else {
    menuShow = true;
    menu.classList.add("show");
  }
}

function showMenu() {
  menuShow = true;
  menu.classList.add("show");
}

document.addEventListener("click", function(e) {
  if (e.target == menuButton || e.target == menuButtonIcon) {
    updateMenu();
  }
  else if (menuShow && !menu.contains(e.target)) {
    menuShow = false;
    menu.classList.remove("show");
  }
})