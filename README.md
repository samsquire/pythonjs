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

```
./pjs example.pjs | node
```


