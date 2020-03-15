# pythonjs

This is a dirty converter of sourcecode from Pythonic JS, which is defined as blocks that have Python style.

So

```
class Rectangle:
    constructor(height, width):
        this.width = width
        this.height = height
```

Is converted into:

```
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```

```
    if (i % 3 == 0):
        console.log("Fizz")
    if (i % 5 == 0):
        console.log("Buzz")
```

Becomes

```
    if (i % 3 == 0) {
        console.log("Fizz")
    }    
    if (i % 5 == 0) {
        console.log("Buzz")
    }
```

# Usage

Write pythonic Javascript and convert to normal Javascript with the following command. Supports tabs or spaces (detected)

```
./pjs.js example.pjs | node
```

If you have a number of spaces that is not 4 spaces per indention level, pass the number of spaces as the second argument.

```
./pjs.js example.pjs 4 | node
```
