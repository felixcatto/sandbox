import { keyBy, pick } from 'lodash';


export default (object, error = { errors: [] }, id = null) => ({
  id,
  ...object,
  errors: error.errors
    .map(el => pick(el, ['path', 'message']))
    |> ((_) => keyBy(_, 'path')),
});
