# matrix.js

Matrix is a series of matrix classes designed to aid in the normal usage of
matrices.

Currently there's only a two-dimensional matrix, Matrix2d, but in the future I'm
considering a 3d block puzzle style game which might make use of a 3 dimensional
matrix, at which point I'll write it.

## Matrix2d API:
### Construction:
- Matrix2d((`int`) `m`, (`int`) `n`, (`boolean` or `int`) `debug`)  
  Creates the matrix.  
  
  - `m` is the number of rows  
  - `n` is the number of columns  
  - `debug` should either be a boolean (`true` or `false`), or a positive
    integer.  `debug` may be left out and it will default to `false`.  
  
  
### Retrieving data:
- get((`int`) `dimension`)  
  Retrieves the entire matrix.  
  
  - `dimension` indicates the dimensionality of the return format -- meaning
    whether this function returns the matrix data in a 1 dimensional array, or
    a two dimensional array (one array per row).  Available options are 1 or 2.
    If `dimension` is not included, it will default to 1 (the storage method).  
  
  
- get_row((`int`) `index`)  
  Retrieves the row referenced by index.  
  
  - `index` begins at 0  
  
  
- get_column((`int`) `index`)  
  Retrieves the column referenced by index.  
  
  - `index` begins at 0  
  
  
- get_element((`int`) `row`, (`int`) `column`)  
  Retrieves the information referenced by (row x column)  
  
  - `row` is an index and begins at 0  
  - `column` is an index and begins at 0  
  
  
### Setting data:
- update((`array`) `data`)  
  Sets the matrix to data.  
  
  - `data` is an array of numbers.  `data` may contain a 1-dimensional
    representation or a 2-dimensional representation (an array of arrays, ie:
    rows)  
  
  
- set((`int`) `m`, (`int`) `n`, (`array`) `data`)  
  Modifies the number of rows and columns, and sets the matrix to `data`.  
  
  - `m` is the number of rows  
  - `n` is the number of columns  
  - `data` is an array of numbers.  `data` may contain a 1-dimensional
    representation or a 2-dimensional representation (an array of arrays, ie:
    rows)  
  
  
- set_row((`int`) `index`, (`array`) `data`)  
  Sets the referenced row to data.  
  
  - `data` is a 1-dimensional array  
  
  
- set_column((`int`) `index`, (`array`) `data`)  
  Sets the referenced column to data.  
  
  - `data` is a 1-dimensional array  
  
  
- set_element((`int`) `row`, (`int`) `column`, (`number`) `data`)  
  Sets the element at row x column to data.  
  
  - `row` is an index and begins at 0  
  - `column` is an index and begins at 0  
  - `data` is a number  
  
  
### Mathematical Operations:
- add((`Matrix2d`) `right`)  
- subtract((`Matrix2d`) `right`)  
- multiply((`Matrix2d`) `right`)
- product((`Matrix2d`) `right`) -- alias to multiply
- divide((`Matrix2d`) `right`)
  
- scalar_add((`number`) `scalar`)
- scalar_subtract((`number`) `scalar`)
- scalar_multiply((`number`) `scalar`)
- scalar_product((`number`) `scalar`) -- alias to scalar_multiply
- scalar_divide((`number`) `scalar`)
  
  
### Search Operations:
- contains(`value`)  
- row_contains(`index`, `value`)  
- column_contains(`index`, `value`)  
  
- find(`value`)
- row_find(`index`, `value`)
- column_find(`index`, `value`)
  
  
### Utility:
- copy((`Matrix2d`) `source`)  
  Assigns this matrix the values of the source matrix.  
  
  
- clone(`void`)  
  Returns a new Matrix2d instance with this matrix's values.  
  
  
- toString(void)
  Returns a string representing the matrix.  
  
  - I hate camel case with a passion, but I kept this consistent with JavaScript's
    toString().  