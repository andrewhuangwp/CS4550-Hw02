# HW02

Link: hw02.normalwebsite.art

### Calculator Design:

Thought process on ambiguous requirements:

1. I disregarded PEMDAS as I assumed since this was a simple four function calculator whenever a operation occurred after two numbers and an operation were inputted, the result would be displayed. For example, inputting 2 + 2 * would display 4 and then inputting 3 afterwards would display 12 as opposed to following PEMDAS where 2 + 2 * 3 should display 8. 
2. If a decimal is present already in the current number, then pressing a decimal button will not do anything.
3. Dividing by zero will display Not a number on the calculator.
4. Since most calculators only support up to 16 digits before switching scientific notation, I decided to only support input numbers with 16 digits or less. If a result has more than 16 digits, then the calculator will display the result in scientific notation.
5. If an operation has been selected but a new number has not yet inputted, inputting an operation will change the selected operation. For example, pressing 2 + * - 4 is the same as pressing 2 - 4.
6. Since there are only four operations, I decided that the user cannot input negative numbers, but it is possible to attain negative results (e.g. 0 - 1).