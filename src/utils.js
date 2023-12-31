/* 
Copyright 2023, Salvador Pio Alonday

This file is part of The Online Brain Project

The Online Brain Project is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software Foundation,
either version 3 of the License, or (at your option) any later version.

The Online Brain Project is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with The Online
Brain Project. If not, see <https://www.gnu.org/licenses/>.
*/

//generate uuid; retrieved from https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid 4Sep2023
export function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

// build comma separated string of node ids that will be used as url params
export function buildParamStringFromArray(array) {
  let string = "";
  for (let i = 0; i < array.length; i++) {
    if (i < array.length - 1) string += array[i] + ",";
    else string += array[i]; // last element, so don't put an & at the end.
  }
  if (array.length === 0) string = "blank";
  return string;
}
