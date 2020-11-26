import React, { Fragment } from 'react';
import { connectHits } from 'react-instantsearch-dom';

const Hits = ({ hits, userFavorites, handler }) => {
  return (
    <Fragment>
      {hits.map((hit) => {
        let isActive = userFavorites.indexOf(hit.item_key) > -1 ? 'avtive' : '';

        return (
          <div className={'col-md-3 mb-5 ' + isActive} key={hit.objectID}>
            <div
              onClick={() => {
                handler(hit.item_key);
              }}
            >
              {hit.make_name} {hit.model_name} - {hit.item_key} -{' '}
              <strong>{isActive}</strong>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default connectHits(Hits);
