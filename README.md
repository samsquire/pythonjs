# pythonjs

This is dirty converter of sourcecode from Pythonic JS, which is defined as blocks.

So

```
class Rectangle:
    constructor(height, width):
      this.height = height;
      this.width = width;
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


