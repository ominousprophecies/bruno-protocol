function convertPostmanToBruno(postmanJson) {
  var outputFiles = [];
  
  if (!postmanJson || !postmanJson.item || !Array.isArray(postmanJson.item)) {
    throw new Error("Invalid Postman Collection format. Must be a valid v2.1 export JSON.");
  }

  var flatRequests = [];
  function extractRequests(items, sequenceTracker) {
    sequenceTracker = sequenceTracker || { count: 1 };
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.request) {
        item.seq = sequenceTracker.count++;
        flatRequests.push(item);
      } else if (item.item && Array.isArray(item.item)) {
        extractRequests(item.item, sequenceTracker);
      }
    }
  }
  
  extractRequests(postmanJson.item);

  for (var j = 0; j < flatRequests.length; j++) {
    var reqObj = flatRequests[j];
    var name = reqObj.name || "Unnamed Request";
    var method = (reqObj.request.method || "GET").toLowerCase();
    var seq = reqObj.seq;
    
    var rawUrl = "";
    if (reqObj.request.url) {
      rawUrl = typeof reqObj.request.url === 'string' 
        ? reqObj.request.url 
        : reqObj.request.url.raw || "";
    }
    
    var cleanUrl = rawUrl.replace(/{{(.*?)}}/g, "{{$1}}");
    var bruContent = "meta {\n  name: \"" + name + "\"\n  type: \"http\"\n  seq: " + seq + "\n}\n\n";
    bruContent += method + " {\n  url: \"" + cleanUrl + "\"\n}\n\n";

    var headers = reqObj.request.header;
    if (headers && Array.isArray(headers) && headers.length > 0) {
      bruContent += "headers {\n";
      for (var k = 0; k < headers.length; k++) {
        var h = headers[k];
        if (!h.disabled) {
          bruContent += "  " + h.key + ": " + h.value + "\n";
        }
      }
      bruContent += "}\n\n";
    }

    var body = reqObj.request.body;
    if (body && body.mode === 'raw' && body.raw) {
      try {
        var parsedBody = JSON.parse(body.raw);
        var formattedJson = JSON.stringify(parsedBody, null, 2)
          .split('\n')
          .map(function(line) { return "  " + line; })
          .join('\n');
          
        bruContent += "body:json {\n" + formattedJson + "\n}\n\n";
      } catch (e) {
        bruContent += "body:text {\n  " + body.raw + "\n}\n\n";
      }
    }

    var safeFilename = name.toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    outputFiles.push({
      filename: (safeFilename || 'request-' + seq) + ".bru",
      content: bruContent.trim() + "\n"
    });
  }

  return outputFiles;
}