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

| Data |Number  | Size | Max| Max|Note|
|--|--|--|--|--|--| --|    
| AMC prefix | 1 | 3| 3| ALPHA| should be "AMC" |
| Separator 1 | 1 | 1| 1| ALPHA|should be "#" |
| Version number | 1 | 1| 1| NUM |Should be 1 |
| Separator 2 | 1 | 1| 1| ALPHA|should be "#" |
| AMC number | 1 | 10| 10 | NUM |10 characters max |
| Separator 3 | 1 | 1| 1| ALPHA|should be "#" |
| Secondary criterion (CSR) | 1 | 3| 3| ALPHA-NUM |3 characters max, empty if not provided |
| Separator 4 | 1 | 1| 1| ALPHA|should be "#" |
| Member number | 1 | 15| 15| ALPHA-NUM |15 characters max |
| Separator 5 | 1 | 1| 1| ALPHA|should be "#" |
| couples TypConv/Domain | 1 | 1| 50| ALPHA-NUM |1 TypConv can be followed by "*" if it applies to all domains.if it applies to all the domains and 1 separator "#" separates each pair if several TypConv are mentioned |
| Ending Separator | 1 | 1| 1| ALPHA|should be "/" |

SP-P-G-S-L-R-F-1-I-K-Y-2-3-C-O-T-H-E
SP = convention type
P = 	Pharmacie
G = Médecine
S = Médecine spéc sf radio
L = Laboratoire
R = Radiologie
F = Sage Femme
1 = Fournisseur hors optique / audio
I = Infirmier(e)
K = Kinésithérapie
Y = Orthoptie
2 = Orthophonie
3 = Pédicure podologue
C = Centre de santé
O = Optique
T = Transport
H = Séjour hospitalier
E = Soins externes hospitaliers
