var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    eval(this.responseText);
    var jbit = {
      "memory": [],
      "runBitProgram": function(bitprogram) {
        var bitarray = bitprogram.split(String.fromCharCode(parseInt(0xFEFF)));
        for(let i = 0; i < bitarray.length; i++) {
          var bitfunc = bitarray[i].split(String.fromCharCode(parseInt(0x1CBC)));
          var result = this[ parseInt( jpure.maximise(bitfunc[0]), 2 ) ](bitfunc[1]);
          if(!result) { console.warn("%cTermination OPCODE ran. OPCODE is 0x" + ("000" + (parseInt( jpure.maximise(bitfunc[0]), 2 )).toString(16).toUpperCase()).slice(-4), "font-size: 30pt; font-family: \'Ubuntu\', \'Arial\';"); return; } // Every function must return a result.
        }
      },
      "57005": function() { return false; }, // Terminate signal 0xDEAD. Return bit 0 to terminate program
      "33": function(param1) { // Add
        param1 = param1.split('');
        this.memory.push(parseInt(jpure.maximise(param1[0]), 2)+parseInt(jpure.maximise(param1[1]), 2)); 
        return true;
      },
      "44": function(param1) { // Minus
        param1 = param1.split('');
        this.memory.push(parseInt(jpure.maximise(param1[0]), 2)-parseInt(jpure.maximise(param1[1]), 2)); 
        return true;
      },
      "55": function(param1) { // Times
        param1 = param1.split('');
        this.memory.push(parseInt(jpure.maximise(param1[0]), 2)*parseInt(jpure.maximise(param1[1]), 2)); 
        return true;
      },
      "66": function(param1) { // Divide
        param1 = param1.split('');
        this.memory.push(parseInt(jpure.maximise(param1[0]), 2)/parseInt(jpure.maximise(param1[1]), 2)); 
        return true;
      }
    };
    window.jbit = jbit;
  }
};
xhttp.open("GET", "https://raw.githubusercontent.com/Nyanport/jpure/main/src/jpure.js", true);
xhttp.send();
