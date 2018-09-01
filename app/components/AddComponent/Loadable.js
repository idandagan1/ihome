/**
 *
 * Asynchronously loads the component for AddComponent
 *
 */

import Loadable from "react-loadable";

export default Loadable({
  loader: () => import("./index"),
  loading: () => null
});
