var source = document.getElementById("source");
var output = document.getElementById("output");
var result = "";
var filename = "";

function readSourceFile(evt) {
	files = evt.target.files;
	if (Object.entries(files).length === 0){
		alert("Failed to load file");
		document.getElementById("save").disabled = true;
	} else {
		Object.keys(evt.target.files).forEach(key => {
			var file = files[key];
			filename = file.name;
			var r = new FileReader();
			r.onload = function(e) {
				//Remove comments
				var contents = e.target.result.replace(/\/\/[^\n]*/g, "").replace(/^[\n\r]+/g, "");
				
				//Parse VM code
				var contentsOut = parse(contents).join("\n");

				//Display results
				source.value += contents + "\n";
				output.value += contentsOut + "\n";

				result += contentsOut;				
			}
			r.readAsText(file);
		});
		//Enable Save Button
		document.getElementById("save").disabled = false;
	}
}

function writeOutputFile() {
	filename = filename.replace(/.vm$/g, ".asm");
	data = result.replace(/[\n]+/g, "\n");
	var file = new Blob([data], {type: "text"});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

document.getElementById("fileinput").addEventListener("change", readSourceFile, false);
document.getElementById("save").addEventListener("click", writeOutputFile, false);