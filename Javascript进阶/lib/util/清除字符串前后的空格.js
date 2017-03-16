function trim(str) {
  if (!String.prototype.trim) {
    String.prototype.trim = function() {
      return this.replace(/^\s+/, "").replace(/\s+$/, "");
    }
  }
}

var str = '  I am a student. I am ungry ...                  ';

str.trim();
