function SaferHTML(templateData) {
  var s = templateData[0];
  for (var i = 1; i < arguments.length; i++) {
    var arg = String(arguments[i]);
 
    // Escape special characters in the substitution.
    s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
 
    // Don't escape special characters in the template.
    s += templateData[i];
  }
  return s;
}
 
var bonk = {
    sender: "Hacker Steve <script>alert('xss');</script>"
};
 
console.log(SaferHTML`<p>${bonk.sender} sent you a bonk.</p>`);
 
