# pythonjs

This is dirty converter of sourcecode from Pythonic JS, which is defined as blocks.

So

```
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```

becomes (with tab separation)

```
class Rectangle:
    constructor(height, width):
      this.height = height;
      this.width = width;
  }
}
```
