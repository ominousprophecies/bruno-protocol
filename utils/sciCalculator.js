function calculateSoftwareCarbonIntensity(teamSize, monthlyRequestsPerDev, gridRegion) {
  var gridIntensityMap = {
    'us-east-fossil': 380,
    'eu-mixed': 210,
    'ca-clean-hydro': 30
  };

  var selectedGridIntensity = gridIntensityMap[gridRegion] || 380;
  var POWER_PER_CLOUD_REQUEST = 0.000035;
  var POWER_PER_LOCAL_REQUEST = 0.000008;
  var EMBODIED_CARBON_PER_CLOUD_REQUEST = 0.000012;

  var totalMonthlyVolume = teamSize * monthlyRequestsPerDev;
  var totalAnnualVolume = totalMonthlyVolume * 12;

  var cloudAnnualEnergy = totalAnnualVolume * POWER_PER_CLOUD_REQUEST;
  var cloudOperationalEmissions = cloudAnnualEnergy * selectedGridIntensity;
  var cloudEmbodiedEmissions = totalAnnualVolume * EMBODIED_CARBON_PER_CLOUD_REQUEST;
  var totalCloudFootprintGrams = cloudOperationalEmissions + cloudEmbodiedEmissions;

  var localAnnualEnergy = totalAnnualVolume * POWER_PER_LOCAL_REQUEST;
  var totalLocalFootprintGrams = localAnnualEnergy * selectedGridIntensity;

  var annualGramsSaved = totalCloudFootprintGrams - totalLocalFootprintGrams;
  var annualKgSaved = Math.max(0, annualGramsSaved / 1000);
  var treeEquivalencyCount = Math.round(annualKgSaved / 22);

  return {
    annualKgSaved: parseFloat(annualKgSaved.toFixed(2)),
    treeEquivalencyCount: treeEquivalencyCount,
    functionalUnitRateDelta: parseFloat((annualGramsSaved / (totalAnnualVolume / 10000)).toFixed(4))
  };
}