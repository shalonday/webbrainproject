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

import { BallTriangle } from "react-loader-spinner";
import styles from "./Loader.module.css";
function Loader() {
  return (
    <div className={styles.loaderDiv}>
      {/* <Circles
        height="80"
        width="100%"
        color="hsl(60 100% 50%)"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass={styles.loader}
        visible={true}
      /> */}
      <BallTriangle
        height={100}
        width="100%"
        radius={5}
        color="hsl(350 100% 30%)"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass={styles.loader}
        visible={true}
      />
    </div>
  );
}

export default Loader;
