// Wait until the HTML elements are fully parsed in the browser window
document.addEventListener("DOMContentLoaded", function () {
  
  // 1. Identify and cache all interface elements
  var postmanInput = document.getElementById("postmanInput");
  var brunoOutput = document.getElementById("brunoOutput");
  var btnConvert = document.getElementById("btnConvert");
  var btnCopy = document.getElementById("btnCopy");

  var sliderTeamSize = document.getElementById("sliderTeamSize");
  var sliderRequests = document.getElementById("sliderRequests");
  var selectRegion = document.getElementById("selectRegion");

  var valTeamSize = document.getElementById("valTeamSize");
  var valRequests = document.getElementById("valRequests");
  var metricKgSaved = document.getElementById("metricKgSaved");
  var metricTreesCount = document.getElementById("metricTreesCount");

  // 2. Define the Conversion Trigger Function
  if (btnConvert) {
    btnConvert.addEventListener("click", function () {
      try {
        var rawText = postmanInput.value.trim();
        if (!rawText) {
          alert("Input Empty: Please paste your raw Postman v2.1 collection JSON string.");
          return;
        }

        var parsedJson = JSON.parse(rawText);
        var convertedFiles = convertPostmanToBruno(parsedJson);

        if (convertedFiles && convertedFiles.length > 0) {
          // Display the first converted file preview inside our code view panel
          brunoOutput.value = convertedFiles[0].content;
        } else {
          brunoOutput.value = "// Conversion parsed successfully, but no individual requests were found.";
        }
      } catch (err) {
        brunoOutput.value = "// Compilation Exception:\n// " + err.message;
      }
    });
  }

  // 3. --- COPY TO CLIPBOARD UX FUNCTION ---
  if (btnCopy) {
    btnCopy.addEventListener("click", function () {
      var outputText = brunoOutput.value;
      
      if (!outputText || outputText.startsWith("//") || outputText.trim() === "") {
        alert("Nothing to copy yet! Please convert a valid Postman collection first.");
        return;
      }

      // Use the modern browser Clipboard API
      navigator.clipboard.writeText(outputText).then(function () {
        // Visual feedback loop change
        btnCopy.innerText = "✅ Copied!";
        btnCopy.style.backgroundColor = "#10b981";

        // Reset button state back to standard after 2 seconds
        setTimeout(function () {
          btnCopy.innerText = "📋 Copy Code";
          btnCopy.style.backgroundColor = "#334155";
        }, 2000);
      }).catch(function (err) {
        console.error("Could not copy text: ", err);
      });
    });
  }

  // 4. Define the Carbon Metric Calculation Trigger Function
  function updateCarbonMetrics() {
    var team = parseInt(sliderTeamSize.value, 10);
    var reqs = parseInt(sliderRequests.value, 10);
    var region = selectRegion.value;

    // Update the layout labels over the sliders in real-time
    if (valTeamSize) valTeamSize.innerText = team + " devs";
    if (valRequests) valRequests.innerText = reqs.toLocaleString() + " reqs";

    // Run the data through our standard ISO formula calculation engine
    if (typeof calculateSoftwareCarbonIntensity === "function") {
      var results = calculateSoftwareCarbonIntensity(team, reqs, region);
      
      // Push calculated numerical metrics back out to the UI card text layout
      if (metricKgSaved) metricKgSaved.innerText = results.annualKgSaved.toFixed(2) + " kg CO₂e";
      if (metricTreesCount) metricTreesCount.innerText = results.treeEquivalencyCount + " Mature Trees";
    }
  }

  // 5. Bind listeners to all sliders to calculate on every adjustment drag
  if (sliderTeamSize) sliderTeamSize.addEventListener("input", updateCarbonMetrics);
  if (sliderRequests) sliderRequests.addEventListener("input", updateCarbonMetrics);
  if (selectRegion) selectRegion.addEventListener("change", updateCarbonMetrics);

  // 6. Run an initial calculation pass immediately on page load
  updateCarbonMetrics();
});