var Brightness = require("nativescript-brightness").Brightness;
var brightness = new Brightness();

describe("greet function", function() {
    it("exists", function() {
        expect(brightness.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(brightness.greet()).toEqual("Hello, NS");
    });
});