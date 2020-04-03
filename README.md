# errorPosition
---
根据js错误堆栈字符串和sourceMap文件定位错误位置

## Usage
---
例如：代码中抛出这样的错误：

```js
try {
  throw new EvalError('Hello');
} catch (e) {
  console.log(e.stack);               
}
```

得到错误堆栈 `e.stack` 字符串，sourcemap文件路径为E:\\code\\dist，如下代码可对错误堆栈字符串进行解析得到源代码所在位置、行数、列数、报错行代码等信息
```js
const errorPosition = require("errorPosition");

let result = errorPosition(`EvalError: Hello    
    at Object.<anonymous> (/Users/file/errorPosition/index.js:4:9)    
    at Module._compile (internal/modules/cjs/loader.js:1155:14)    
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1178:10)    
    at Module.load (internal/modules/cjs/loader.js:1002:32)    
    at Function.Module._load (internal/modules/cjs/loader.js:901:14)    
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:74:12)    
    at internal/main/run_main_module.js:18:47
    `, 
    'E:\\code\\dist')

```
