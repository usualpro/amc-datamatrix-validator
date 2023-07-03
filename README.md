# amc-datamatrix-validator
A utils for validate AMC datamatrix

## usage
```js 
import { checkDataMatrix } from "./utils/datamatrix";

checkDataMatrix({
 datamatrix: value,
 onError: () => alert(`invalid datamatrix`),
 callBack: (conventionTypes, otherAMCData) => {
  console.log(otherAMCData);
  alert(`valid datamatrix`);
 }});
```
## Example
https://codesandbox.io/s/amc-datamatrix-validator-ygv8t2
