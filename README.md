# pythonjs

This is dirty converter of sourcecode from Pythonic JS, which is defined as blocks that have Python style.

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

# Usage

```
./pjs example.pjs | node
```


