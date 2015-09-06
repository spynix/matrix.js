/*    File: matrix2d.js
 *  Author: Jin Savage ("spynix")
 *  
 *  
 * Notes:
 * ----------------------------------------------------------------------------
 * 
 * These are general purpose classes for handling common matrix tasks.
 * 
 * And camel case sucks.
 * 
 * 
 *  
 * 
 * License - 2-clause ("simplified") BSD
 * ----------------------------------------------------------------------------
 * 
 * Copyright (c) 2015, Jin Savage ("spynix")
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/* Matrix2d():
 *   creates a 2d matrix of size (m * n)
 *   
 *   the matrix itself is initially zeroed out
 *   m = max(1, m);
 *   n = max(1, n);
 */
function Matrix2d(m, n, debug) {
  var i, j;
  
  this.debug = ((debug === undefined) ? false : debug);
  this.matrix = [];
  this.num_rows = ((m <= 0) ? 1 : m);
  this.num_columns = ((n <= 0) ? 1 : n);
  
  for (i = 0; i < m; i++)
    for (j = 0; j < n; j++)
      this.matrix.push(0);
}


Matrix2d.prototype.copy = function(source) {
  if (!(source instanceof Matrix2d)) {
    if (this.debug)
      console.log("Matrix2d->copy(): source material not a Matrix2d instance");
    
    return false;
  }
  
  this.num_rows = source.num_rows;
  this.num_columns = source.num_columns;
  this.matrix = source.matrix;
};


Matrix2d.prototype.clone = function() {
  var clone = new Matrix2d(this.num_rows, this.num_columns);
  
  clone.update(this.matrix);
  
  return clone;
};


/* set():
 *   set overwrites the matrix with all new data
 *   
 *   data can be either a two dimensional array, or a 1 dimensional array
 */
Matrix2d.prototype.set = function(m, n, data) {
  var i, j, k, l, type;
  var temp = [];
  
  if (Object.prototype.toString.call(data) !== "[object Array]") {
    if (this.debug)
      console.log("Matrix2d->set(): data not an array");
      
    return false;
  }
  
  if (m <= 0) {
    if (this.debug)
      console.log("Matrix2d->set(): number of rows must be > 0 -- (received " + m.toString() + ")");
    
    return false;
  } else if (n <= 0) {
    if (this.debug)
      console.log("Matrix2d->set(): number of columns must be > 0 -- (received " + n.toString() + ")");
    
    return false;
  }
  
  type = Object.prototype.toString.call(data[0]);
  
  if (type === "[object Array]") { /* first element array? so we assume 2d array */
    if (data.length != m) {
      if (this.debug)
        console.log("Matrix2d->set(): 2d input expected (" + m.toString() + ") rows -- (found " + data.length.toString() + " rows)");
      
      return false;
    }
    
    for (i = 0, j = data.length; i < j; i++) {
      if (data[i].length != n) {
        if (this.debug)
          console.log("Matrix2d->set(): 2d input expected (" + n.toString() + ") columns -- (found " + data[i].length.toString() + " at row " + i.toString() + ")");

        return false;
      }
      
      for (k = 0, l = data[i].length; k < l; k++)
        temp.push(data[i][k]);
    }
    
    if (temp.length != (m * n)) {
      if (this.debug)
        console.log("Matrix2d->set(): 2d data successfully handled yet did not result in the correct number of total elements");
      
      return false;
    }
  } else if (type === "[object Number]") { /* first element number? so we assume 1d array */
    if ((l = data.length) != (m * n)) {
      if (this.debug)
        console.log("Matrix2d->set(): 1d data expected (" + (m * n).toString() + "elements -- (found " + l.toString() + ")");
      
      return false;
    }
    
    for (i = 0; i < l; i++)
      temp.push(data[i]);
    
    if (temp.length != (m * n)) {
      if (this.debug)
        console.log("Matrix2d->set(): 1d data successfully handled yet did not result in the correct number of total elements");
      
      return false;
    }
  } else { /* first element something else?  you fucked up */
    if (this.debug)
      console.log("Matrix2d->set(): input expected Array or Number -- (found " + type + ")");
    
    return false;
  }
  
  this.num_rows = m;
  this.num_columns = n;
  this.matrix = temp;
};


/* set_row():
 *   set a row's data 
 */
Matrix2d.prototype.set_row = function(index, data) {
  var i, j, k, l;
  
  if (index === undefined) {
    if (this.debug)
      console.log("Matrix2d->set_row(): row parameter was undefined");
    
    return false;
  }
  
  if ((index >= this.num_rows) || (index < 0)) {
    if (this.debug)
      console.log("Matrix2d->set_row(): expected range of (0 - " + (this.num_rows - 1).toString() + ") -- (received " + index.toString() + ")");
    
    return false;
  }
  
  if (Object.prototype.toString.call(data) !== "[object Array]") {
    if (this.debug)
      console.log("Matrix2d->set_row(): input not an array");
      
    return false;
  }
  
  if (data.length != this.num_columns) {
    if (this.debug)
      console.log("Matrix2d->set_row(): input array not correct size (expected " + this.num_columns.toString() + ") -- (received " + data.length.toString() + ")");
    
    return false;
  }
  
  for (i = (index * this.num_columns), j = ((index + 1) * this.num_columns), k = 0, l = data.length; (i < j) && (k < l); i++, k++)
    this.matrix[i] = data[k];
  
  return true;
};


/* set_column():
 *   set a row's data 
 */
Matrix2d.prototype.set_column = function(index, data) {
  var i, j, k, l;
  
  if (index === undefined) {
    if (this.debug)
      console.log("Matrix2d->set_column(): row parameter was undefined");
    
    return false;
  }
  
  if ((index >= this.num_columns) || (index < 0)) {
    if (this.debug)
      console.log("Matrix2d->set_column(): expected range of (0 - " + (this.num_columns - 1).toString() + ") -- (received " + index.toString() + ")");
    
    return false;
  }
  
  if (Object.prototype.toString.call(data) !== "[object Array]") {
    if (this.debug)
      console.log("Matrix2d->set_column(): input not an array");
      
    return false;
  }
  
  if (data.length != this.num_rows) {
    if (this.debug)
      console.log("Matrix2d->set_column(): input array not correct size (expected " + this.num_rows.toString() + ") -- (received " + data.length.toString() + ")");
    
    return false;
  }
  
  for (i = index, j = (this.num_rows * this.num_columns), k = 0, l = data.length; (i < j) && (k < l); i += this.num_columns, k++)
    this.matrix[i] = data[k];
  
  return true;
};


/* set_element():
 *   sets the element at row x column
 */
Matrix2d.prototype.set_element = function(row, column, data) {
  if ((row === undefined) || (column === undefined)) {
    if (this.debug)
      console.log("Matrix2d->set_element(): row(" + row.toString() + "), column(" + column.toString() + ")");
    
    return false;
  }
  
  if (data === undefined) {
    if (this.debug)
      console.log("Matrix2d->set_element(): input undefined");
    
    return false;
  } else if (typeof data !== "number") {
    if (this.debug)
      console.log("Matrix2d->set_element(): input not a number -- (received " + data.toString() + ")");
    
    return false;
  }
  
  if ((row < 0) || (row > (this.num_rows - 1)) || (column < 0) || (column > this.num_columns - 1)) {
    if (this.debug)
      console.log("Matrix2d->set_element(): index out of range; expected ((0 - " + (this.num_rows - 1).toString() + "), (0 - " + (this.num_columns - 1).toString() + ") -- received (" + row.toString() + ", " + column.toString() + ")");
    
    return false;
  }
  
  this.matrix[(row * this.num_columns) + column] = data;
  
  return true;
};


/* get():
 *   retrieve the data stored in the matrix
 *   
 *   dimension refers to the dimensionality of the return value.
 *     1 = 1 dimensional array
 *     2 = array of 1 dimensional arrays (ie 2 dimensional array)
 */
Matrix2d.prototype.get = function(dimension) {
  var i, j, row;
  var rows = [];
  
  if (dimension === undefined)
    dimension = 1;
  
  if (dimension == 1) {
    return this.matrix;
  } else if (dimension == 2) {
    for (i = 0; i < this.num_rows; i++) {
      row = [];
      
      for (j = 0; j < this.num_columns; j++)
        row.push(this.matrix[(i * this.num_columns) + j]);
      
      rows.push(row);
    }
    
    return rows;
  } else {
    if (this.debug)
      console.log("Matrix2d->get(): invalid retrieval dimensionality");
    
    return false;
  }
  
  return false;
};


/* get_row():
 *   retrieve the specified row by index
 */
Matrix2d.prototype.get_row = function(index) {
  var i, j;
  var temp = [];
  
  if (index === undefined) {
    if (this.debug)
      console.log("Matrix2d->get_row(): row parameter was undefined");
    
    return false;
  }
  
  if ((index >= this.num_rows) || (index < 0)) {
    if (this.debug)
      console.log("Matrix2d->get_row(): expected range of (0 - " + (this.num_rows - 1).toString() + ") -- (received " + index.toString() + ")");
    
    return false;
  }
  
  for (i = (index * this.num_columns), j = ((index + 1) * this.num_columns); i < j; i++)
    temp.push(this.matrix[i]);
  
  return temp;
};


/* get_column():
 *   retrieve the specified column by index
 * 
 */
Matrix2d.prototype.get_column = function(index) {
  var i, j;
  var temp = [];
  
  if (index === undefined) {
    if (this.debug)
      console.log("Matrix2d->get_column(): column parameter was undefined");
    
    return false;
  }
  
  if ((index >= this.num_columns) || (index < 0)) {
    if (this.debug)
      console.log("Matrix2d->get_column(): expected range of (0 - " + (this.num_columns - 1).toString() + ") -- (received " + index.toString() + ")");
    
    return false;
  }
  
  for (i = index, j = (this.num_rows * this.num_columns); i < j; i += this.num_columns)
    temp.push(this.matrix[i]);
  
  return temp;
};


/* get_element():
 *   retrieves the element at row x column
 */
Matrix2d.prototype.get_element = function(row, column) {
  if ((row === undefined) || (column === undefined)) {
    if (this.debug)
      console.log("Matrix2d->get_element(): row(" + row.toString() + "), column(" + column.toString() + ")");
    
    return false;
  }
  
  if ((row < 0) || (row > (this.num_rows - 1)) || (column < 0) || (column > this.num_columns - 1)) {
    if (this.debug)
      console.log("Matrix2d->get_element(): index out of range; expected ((0 - " + (this.num_rows - 1).toString() + "), (0 - " + (this.num_columns - 1).toString() + ") -- received (" + row.toString() + ", " + column.toString() + ")");
    
    return false;
  }
  
  return this.matrix[(row * this.num_columns) + column];
};


/* add():
 *   adds this matrix with the input
 */
Matrix2d.prototype.add = function(right, assign) {
  var matrix = [];
  var i, j, temp;
  
  if (!(right instanceof Matrix2d)) {
    if (this.debug)
      console.log("Matrix2d->add(): right operand [input] is not a Matrix2d instance");
    
    return false;
  }
  
  if ((this.num_rows != right.num_rows) || (this.num_columns != right.num_columns)) {
    if (this.debug)
      console.log("Matrix2d->add(): size mismatch; left operand [this] (" + this.num_rows.toString() + ", " + this.num_columns.toString() + ") -- right operand [input] (" + right.num_rows.toString() + ", " + right.num_columns.toString() + ")");
    
    return false;
  }
  
  for (i = 0; i < this.num_rows; i++)
    for (j = 0; j < this.num_columns; j++)
      matrix[(i * this.num_columns) + j] = this.matrix[(i * this.num_columns) + j] + right.matrix[(i * this.num_columns) + j];
  
  if (assign === undefined)
    assign = true; /* if unknown, default action is to assign */
  
  if (assign) {
    this.matrix = temp;
  } else {
    temp = new Matrix2d(this.num_columns, this.num_rows, this.debug);
    temp.update(matrix);
    
    return temp;
  }
  
  return true;
};


/* scalar_add():
 *   adds scalar to each element
 */
Matrix2d.prototype.scalar_add = function(scalar) {
  var i, j;
  
  if (typeof scalar !== "number") {
    if (this.debug)
      console.log("Matrix2d->scalar_add(): input scalar is not a number");
    
    return false;
  }
  
  for (i = 0; i < this.num_rows; i++)
    for (j = 0; j < this.num_columns; j++)
      this.matrix[(i * this.num_columns) + j] += scalar;
  
  return true;
};


/* scalar_multiply():
 *   multiplies each element by the scalar
 */
Matrix2d.prototype.scalar_multiply = function(scalar) {
  var i, j;
  
  if (typeof scalar !== "number") {
    if (this.debug)
      console.log("Matrix2d->scalar_multiply(): input scalar is not a number");
    
    return false;
  }
  
  for (i = 0; i < this.num_rows; i++)
    for (j = 0; j < this.num_columns; j++)
      this.matrix[(i * this.num_columns) + j] *= scalar;
  
  return true;
};


/* cw():
 *   rotates the matrix clockwise by 90 degrees
 *   
 *   assign is a boolean determining whether the result is assigned to this
 *   matrix or the result is returned
 */
Matrix2d.prototype.cw = function(assign) {
  var matrix = [];
  var i, j, row, temp;
  
  for (i = 0; i < this.num_columns; i++)
    for (row = this.num_rows - 1, j = (i + (row * this.num_columns)); j >= 0; j -= this.num_columns, row--)
      matrix.push(this.matrix[j]);
  
  if (assign === undefined)
    assign = true; /* if not specified, default action for rotation is to assign the result */
  
  if (assign) {
    this.matrix = matrix;
    
    temp = this.num_columns;
    this.num_columns = this.num_rows;
    this.num_rows = temp;
  } else {
    temp = new Matrix2d(this.num_columns, this.num_rows, this.debug);
    temp.update(matrix);
    
    return temp;
  }
  
  return true;
};


/* ccw():
 *   rotates the matrix counter-clockwise by 90 degrees
 *   
 *   assign is a boolean determining whether the result is assigned to this
 *   matrix or the result is returned
 */
Matrix2d.prototype.ccw = function(assign) {
  var matrix = [];
  var i, j, row, temp;
  
  for (i = this.num_columns - 1; i >= 0; i--)
    for (row = 0, j = (i + (row * this.num_columns)); row < this.num_rows; j += this.num_columns, row++)
      matrix.push(this.matrix[j]);
  
  if (assign === undefined)
    assign = true; /* if not specified, default action for rotation is to assign the result */
  
  if (assign) {
    this.matrix = matrix;
    
    temp = this.num_columns;
    this.num_columns = this.num_rows;
    this.num_rows = temp;
  } else {
    temp = new Matrix2d(this.num_columns, this.num_rows, this.debug);
    temp.update(matrix);
    
    return temp;
  }
  
  return true;
};


/* rotate():
 *   wrapper function for using cw and ccw
 *   
 *   see cw() or ccw() for assign
 */
Matrix2d.prototype.rotate = function(direction, assign) {
  if (assign === undefined)
    assign = true; /* if not specified, default action for rotation is to assign the result */
  
  if ((direction == "cw") || (direction == 0)) {
    return this.cw(assign);
  } else if ((direction == "ccw") || (direction == 1)) {
    return this.ccw(assign);
  }
  
  if (this.debug)
    console.log("Matrix2d->rotate(): possible rotation directions are (\"cw\", \"ccw\", 0, and 1) -- (received " + direction.toString() + ")");
  
  return false;
};


/* update():
 *   update will simply try to change the data stored in the matrix while
 *   complying with the matrix's current dimensions.  again, data can be either
 *   a 1 or 2 dimensional array
 */
Matrix2d.prototype.update = function(data) {
  var temp = [];
  var i, j, k, l, type;
  
  if (Object.prototype.toString.call(data) !== "[object Array]") {
    if (this.debug)
      console.log("Matrix2d->update(): input not an array");
      
    return false;
  }
  
  type = Object.prototype.toString.call(data[0]);
  
  if (type === "[object Array]") { /* first element array? so we assume 2d array */
    if (data.length != this.num_rows) {
      if (this.debug)
        console.log("Matrix2d->update(): 2d input expected (" + this.num_rows.toString() + ") rows -- (found " + data.length.toString() + " rows)");
      
      return false;
    }
    
    for (i = 0, j = data.length; i < j; i++) {
      if (data[i].length != this.num_columns) {
        if (this.debug)
          console.log("Matrix2d->update(): 2d input expected (" + this.num_rows.toString() + ") columns -- (found " + data[i].length.toString() + " at row " + i.toString() + ")");

        return false;
      }
      
      for (k = 0, l = data[i].length; k < l; k++)
        temp.push(data[i][k]);
    }
    
    if (temp.length != (this.num_rows * this.num_columns)) {
      if (this.debug)
        console.log("Matrix2d->update(): 2d data successfully handled yet did not result in the correct number of total elements");
      
      return false;
    }
  } else if (type === "[object Number]") { /* first element number? so we assume 1d array */
    if ((l = data.length) != (this.num_rows * this.num_columns)) {
      if (this.debug)
        console.log("Matrix2d->update(): 1d data expected (" + (this.num_rows * this.num_columns).toString() + "elements -- (found " + l.toString() + ")");
      
      return false;
    }
    
    for (i = 0; i < l; i++)
      temp.push(data[i]);
    
    if (temp.length != (this.num_rows * this.num_columns)) {
      if (this.debug)
        console.log("Matrix2d->update(): 1d data successfully handled yet did not result in the correct number of total elements");
      
      return false;
    }
  } else { /* first element something else?  you fucked up */
    if (this.debug)
      console.log("Matrix2d->update(): input expected Array or Number -- (found " + type + ")");
    
    return false;
  }
  
  /* our validation is successful at this point, so assign it */
  this.matrix = temp;
};


Matrix2d.prototype.toString = function() {
  var i, j;
  var buf = "";
  
  for (i = 0; i < this.num_rows; i++) {
    for (j = 0; j < this.num_columns; j++)
      buf += (j == 0 ? "" : " ") + this.matrix[(i * this.num_columns) + j].toString();
    
    buf += "\r\n";
  }
  
  if (this.debug)
    console.log(buf);
  
  return buf;
};