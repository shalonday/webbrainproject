/* 
Copyright 2023, Salvador Pio Alonday

This file is part of The Web Brain Project

The Web Brain Project is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software Foundation,
either version 3 of the License, or (at your option) any later version.

The Web Brain Project is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with The Web
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
                ariaLabel="ball-triangle-loading"
                color="hsl(350 100% 30%)"
                height={100}
                radius={5}
                visible
                width="100%"
                wrapperClass={styles.loader}
                wrapperStyle={{}}
            />
        </div>
    );
}

export default Loader;
