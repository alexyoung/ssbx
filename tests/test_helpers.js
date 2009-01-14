function include(file) {
  var script = document.createElement("script");
  script.setAttribute('src', file);
  $$('head').first().insert(script);
}