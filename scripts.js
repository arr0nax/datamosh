$(function() {

  document.getElementById("video").addEventListener("change",function(){
    var file = this.files[0];

    // var url = ["file:///Users/claytoncollins/Desktop/code%20projects/datamosh/spiderman.mp4"];
    // var file = new Blob(url, {type: 'file'});
    var fr = new FileReader();
    fr.addEventListener('load', function () {

      markup = [];
      result = this.result;
      for (n = 0; n < result.length; ++n) {
        aByte = result.charCodeAt(n);
        byteStr = aByte.toString(16);
        if (byteStr.length < 2) {
            byteStr = "0" + byteStr;
        }
        markup.push(byteStr);
      }
      var hexstring = markup.join('');
      // console.log(hexstring);
      setVideoSource(hexstring);
    });
    fr.readAsBinaryString(file);
  });
});

var setVideoSource = function(a) {
  // for(var i=0; i<a.length; i++) {
  //   // if(a[i] == "3d") {
  //   //   a[i] = '6b';
  //   // }
  // }
  var videoBlob = hexToBytes(a);
  // saveData(videoBlob, 'textvideo.mp4');
  var videoplayer = document.createElement("video");
  videoplayer.setAttribute("src", URL.createObjectURL(videoBlob));
  videoplayer.setAttribute("width", "320");
  videoplayer.setAttribute("height", "240");
  videoplayer.setAttribute("controls", "controls");
  document.body.appendChild(videoplayer);

}

function hexToBytes(hexx) {


      var hex = hexx.toString();//force conversion
      var str = new Uint8Array(hexx.length/2);
      for (var i = 0; i < hex.length; i += 2)
        if ((hex.substr(i, 2) == "00")&&(hex.substr(i+2, 2) == "b1")){
          str[i/2] = parseInt("b1", 16);
        } else if ((hex.substr(i, 2) == "00")&&(hex.substr(i+2, 2) == "b2")) {
          str[i/2] = parseInt("b1", 16);
        } else if ((hex.substr(i, 2) == "01")&&(hex.substr(i+2, 2) == "b0")) {
          str[i/2] = parseInt("b1", 16);
        }
        // if (hex.substr(i, 8) == "0001B001") {
        //   str[i/2] = parseInt("c3", 16);
        //   str[(i+2)/2] = parseInt("c3", 16);
        //   str[(i+4)/2] = parseInt("c3", 16);
        //   str[(i+6)/2] = parseInt("c3", 16);
        //   i+=3;
        // }

        else {
          str[i/2] = parseInt(hex.substr(i, 2), 16);

        }

      // console.log(str.join(''));
    var videoBlob = new Blob([str], {type: "application/octet-stream"});
    return videoBlob;
}


var saveData = function (data, fileName) {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  blob = data;
  url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
};



// <!DOCTYPE HTML>
// <html>
// <head>
// <meta http-equiv="Content-type" content="text/html;charset=UTF-8">
// <title>Show File Data</title>
// <style type='text/css'>
// body {
//     font-family: sans-serif;
// }
// </style>
// <script type='text/javascript'>
//
//     function loadFile() {
//         var input, file, fr;
//
//         if (typeof window.FileReader !== 'function') {
//             bodyAppend("p", "The file API isn't supported on this browser yet.");
//             return;
//         }
//
//         input = document.getElementById('fileinput');
//         if (!input) {
//             bodyAppend("p", "Um, couldn't find the fileinput element.");
//         }
//         else if (!input.files) {
//             bodyAppend("p", "This browser doesn't seem to support the `files` property of file inputs.");
//         }
//         else if (!input.files[0]) {
//             bodyAppend("p", "Please select a file before clicking 'Load'");
//         }
//         else {
//             file = input.files[0];
//             fr = new FileReader();
//             fr.onload = receivedText;
//             fr.readAsText(file);
//         }
//
//         function receivedText() {
//             showResult(fr, "Text");
//
//             fr = new FileReader();
//             fr.onload = receivedBinary;
//             fr.readAsBinaryString(file);
//         }
//
//         function receivedBinary() {
//             showResult(fr, "Binary");
//         }
//     }
//
//     function showResult(fr, label) {
//         var markup, result, n, aByte, byteStr;
//
//         markup = [];
//         result = fr.result;
//         for (n = 0; n < result.length; ++n) {
//             aByte = result.charCodeAt(n);
//             byteStr = aByte.toString(16);
//             if (byteStr.length < 2) {
//                 byteStr = "0" + byteStr;
//             }
//             markup.push(byteStr);
//         }
//         bodyAppend("p", label + " (" + result.length + "):");
//         bodyAppend("pre", markup.join(" "));
//     }
//
//     function bodyAppend(tagName, innerHTML) {
//         var elm;
//
//         elm = document.createElement(tagName);
//         elm.innerHTML = innerHTML;
//         document.body.appendChild(elm);
//     }
//
// </script>
// </head>
// <body>
// <form action='#' onsubmit="return false;">
// <input type='file' id='fileinput'>
// <input type='button' id='btnLoad' value='Load' onclick='loadFile();'>
// </form>
// </body>
// </html>
