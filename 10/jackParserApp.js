var source = document.getElementById("source");
var output = document.getElementById("output");
var result = "";
var filename = "";

function readSourceFile(evt) {
	var file = evt.target.files[0];
	if (file) {
		filename = file.name;
		var r = new FileReader();
		r.onload = function(e) {
			//Remove comments
			var contents = e.target.result.replace(/\/\/[^\n]*|\/\*(?:[^*]|\*[^\/])*\*\//g, "").replace(/^[ \t]*[\n\r]+/g, "");
			
			//Display input
			source.value = contents;

			//Remove spaces/tabs and parse
			result = parse(contents).join("\n");

			//Display output
			output.value = result;

			//Enable Save Button
			document.getElementById("save").disabled = false;
		}
		r.readAsText(file);
	} else { 
		alert("Failed to load file");
		document.getElementById("save").disabled = true;
	}
}

function writeOutputFile() {
	filename = filename.replace(/.jack$/g, "_.xml");
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