$(document).ready(function() {
  // Set custom step
  $("#range-4").range({
    min: 0,
    max: 5000,
    start: 2500,
    step: 10,
    input: "#input-4"
  });
});
