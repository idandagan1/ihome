/**
 *
 * Asynchronously loads the component for ListComponent
 *
 */

import Loadable from "react-loadable";

export default Loadable({
  loader: () => import("./index"),
  loading: () => null
});
