import D3Chart from "../D3Chart";
import PropTypes from 'prop-types';

function TreePageChart({
  branch,
  clickedNode,
  setClickedNode,
  setIsModuleVisible,
}) {
  let timer;
  const touchduration = 500;

  function handleNodeClick(e) {
    setClickedNode((clickedNode) =>
      clickedNode === e.target.__data__ ? null : e.target.__data__
    );
    if (e.target.__data__.type === "module") setIsModuleVisible(true);
  }

  function handleNodeTouchStart() {
    // !!! still need to test on actual phone.
    //do on longtouch

    if (window.matchMedia("(pointer: coarse)").matches) {
      //https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
      // touchscreen
      timer = setTimeout(() => {}, touchduration);
    }
  }

  function handleNodeTouchEnd() {
    //stops short touches from firing the event
    if (timer) clearTimeout(timer); // https://stackoverflow.com/questions/6139225/how-to-detect-a-long-touch-pressure-with-javascript-for-android-and-iphone
  }

  return (
    <>
      <D3Chart
        tree={branch}
        onNodeClick={handleNodeClick}
        onNodeTouchStart={handleNodeTouchStart}
        onNodeTouchEnd={handleNodeTouchEnd}
        currentNode={clickedNode}
      />
    </>
  );
}

export default TreePageChart;

TreePageChart.propTypes = {
  branch: PropTypes.object,
  clickedNode: PropTypes.object,
  setClickedNode: PropTypes.func,
  setIsModuleVisible: PropTypes.func
}