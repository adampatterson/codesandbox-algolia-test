import React, { Fragment, useState } from 'react';
import algoliasearch from 'algoliasearch/lite';

import { PoweredBy, InstantSearch } from 'react-instantsearch-dom';

import { CustomHits } from './components';

// @todo Read from site settings.
const searchClient = algoliasearch(
  'COXSVE6G57',
  '0660cbba04cdb7e44a91c52ed2505136'
);

const initialFavorites = ['3LHdg2b5ER', '16684026', 'P7gYqoBKCr', 'D6U8brPLsj'];

const SearchRouter = () => {
  const [userFavorites, setUserFavorites] = useState(initialFavorites);

  function handleUserFavorite(item_key) {
    // Get eh position of the item_key in the users array
    let index = userFavorites.indexOf(item_key);

    if (index > -1) {
      setUserFavorites(userFavorites.filter((item, i) => i !== index));
    } else {
      setUserFavorites([...userFavorites, item_key]);
    }
  }

  return (
    <Fragment>
      <div className="ais-InstantSearch row">
        <InstantSearch indexName="smi_fresh" searchClient={searchClient}>
          <div className="col-md-9 results">
            <div className="row p-5">
              <CustomHits
                userFavorites={userFavorites}
                handler={handleUserFavorite}
              />
            </div>
            <div className="row p-5">
              <PoweredBy />
            </div>
          </div>
        </InstantSearch>
      </div>
    </Fragment>
  );
};

export default SearchRouter;
