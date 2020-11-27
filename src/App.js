import React, { Fragment, useState, useRef, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import qs from 'qs';
import {
  Hits,
  Panel,
  Stats,
  SearchBox,
  Configure,
  PoweredBy,
  Pagination,
  VoiceSearch,
  NumericMenu,
  InstantSearch,
  RefinementList,
  ClearRefinements,
  ToggleRefinement,
  CurrentRefinements,
} from 'react-instantsearch-dom';

import algoliasearch from 'algoliasearch/lite';

import {
  Tags,
  Banner,
  Slider,
  HitSearch,
  CustomHits,
  MakeModelTrim,
} from './components';

// Tags: https://github.com/algolia/instantsearch-labs/blob/master/tagsbox/react-instantsearch/src/App.js
// Range: https://github.com/algolia/react-instantsearch/blob/master/examples/tourism/App.js

// Look at removing React Router and use popstate
// https://github.com/algolia/react-instantsearch/blob/master/examples/default-theme/URLSync.js

// @todo Read from site settings.
const searchClient = algoliasearch(
  'COXSVE6G57',
  '0660cbba04cdb7e44a91c52ed2505136'
);

const SearchRouter = () => {
  const DEBOUNCE_TIME = 750;

  const createURL = (state) =>
    `?${qs.stringify(state, { encode: false, strictNullHandling: true })}`;

  const searchStateToUrl = (location, searchState) => {
    return searchState ? `${location.pathname}${createURL(searchState)}` : '';
  };

  const urlToSearchState = (location) => qs.parse(location.search.slice(1));

  const location = useLocation();
  const history = useHistory();

  const [userFavorites, setUserFavorites] = useState([
    '3LHdg2b5ER',
    '16684026',
    'P7gYqoBKCr',
    'D6U8brPLsj',
  ]);

  function handleUserFavorite(item_key) {
    // Get the position of the item_key in the users array
    const index = userFavorites.indexOf(item_key);

    if (index > -1) {
      setUserFavorites(userFavorites.filter((item, i) => i !== index));
    } else {
      setUserFavorites([...userFavorites, item_key]);
    }
  }

  const [searchState, setSearchState] = useState(urlToSearchState(location));

  const setStateId = useRef();

  useEffect(() => {
    const nextSearchState = urlToSearchState(location);

    if (JSON.stringify(searchState) !== JSON.stringify(nextSearchState)) {
      setSearchState(nextSearchState);
    }

    // eslint-disable-next-line
  }, [location]);

  function onSearchStateChange(nextSearchState) {
    clearTimeout(setStateId.current);

    setStateId.current = setTimeout(() => {
      history.push(
        searchStateToUrl(location, nextSearchState),
        nextSearchState
      );
    }, DEBOUNCE_TIME);

    setSearchState(nextSearchState);
  }

  return (
    <Fragment>
      <div className="ais-InstantSearch row">
        <InstantSearch
          indexName="smi_fresh"
          searchClient={searchClient}
          searchState={searchState}
          onSearchStateChange={onSearchStateChange}
          createURL={createURL}
        >
          <Configure aroundLatLngViaIP={true} />
          <aside className="col-md-3 filters">
            <ClearRefinements className="mb-4" />

            <Panel header="Price Range">
              {/*
                            <NumericMenu
                                attribute="regular_price"
                                items={[
                                    {label: '<= $10,000', end: 10000},
                                    {label: '$10,000 - $20,000', start: 10000, end: 20000},
                                    {label: '$20,000 - $50,000', start: 20000, end: 50000},
                                    {label: '>= $50,000', start: 50000},
                                ]}
                            />*/}

              <Slider attribute="regular_price" unit="$_" />
            </Panel>

            <Panel
              // Show when used is selected
              header="Odometer"
            >
              {/*
                            <NumericMenu
                                attribute="odometer"
                                items={[
                                    {label: '0 km - 50,000 km', start: 0, end: 50000},
                                    {label: '50,000 km - 100,000 km', end: 100000},
                                    {label: '>= 100,00 km', start: 100000},
                                ]}
                            />*/}
              <Slider attribute="odometer" unit="_km" />
            </Panel>

            <Panel header="Stuff">
              <ToggleRefinement
                attribute="is_on_special"
                label="Is On Special"
                value={true}
              />

              <ToggleRefinement
                className="mb-3"
                attribute="is_certified"
                label="Is Certified"
                value={true}
              />
            </Panel>

            <Panel header="Stock Type">
              <RefinementList label="Stock Type" attribute="stock_type" />
            </Panel>

            <Panel header="Year">
              <RefinementList
                attribute="year"
                limit={6}
                showMore={true}
                transformItems={(items) => {
                  return items.sort((a, b) => (a.label < b.label ? 1 : -1));
                }}
              />
            </Panel>

            {MakeModelTrim()}

            <Panel header="Body Type">
              <RefinementList attribute="body_type" limit={6} showMore={true} />
            </Panel>

            <Panel header="Transmission Type">
              <RefinementList
                attribute="transmission_type"
                limit={6}
                showMore={true}
              />
            </Panel>

            <Panel header="Fuel Type">
              <RefinementList
                attribute="fuel_type_name"
                limit={6}
                showMore={true}
              />
            </Panel>

            <Panel header="City">
              <RefinementList
                attribute="dealer_city"
                limit={6}
                showMore={true}
              />
            </Panel>

            <Panel header="Dealer Name">
              <RefinementList
                attribute="dealer_name"
                limit={6}
                showMore={true}
              />
            </Panel>

            <Panel header="Payments">
              <NumericMenu
                attribute="lowest_biweekly_finance_payment"
                items={[
                  { label: '<=$200/m', end: 200 },
                  { label: '>= $200/m', start: 200 },
                ]}
              />
            </Panel>
            {/* Tags made it slow
                        <Panel header="Equipment">
                            <p>
                                Needs icons and probably a list of the top features to list.
                            </p>
                            <Tags
                                attribute="equipment"
                                limit={6}
                                showMore={true}
                                showMoreLimit="100"
                            />
                        </Panel>
*/}
          </aside>
          <div className="col-md-9 results">
            <div className="row">
              <div className="col-md-11 mb-3">
                <SearchBox focusShortcuts={['/']} />
              </div>
              <div className="col-md-1 mb-3">
                <VoiceSearch
                  // https://www.algolia.com/doc/api-reference/widgets/voice-search/react/#connector
                  searchAsYouSpeak={true}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <Stats className="mb-4" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mb-3">
                <CurrentRefinements />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <Banner />
              </div>
            </div>
            <div className="row ais-Hits-list">
              {/*<HitSearch  hitComponent={HitSearch}/>*/}
              <CustomHits
                userFavorites={userFavorites}
                onClickFavorite={handleUserFavorite}
              />
            </div>
            <div className="row">
              <div className="col-md-12">
                <Pagination />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <PoweredBy />
              </div>
            </div>
          </div>
        </InstantSearch>
      </div>
    </Fragment>
  );
};

export default SearchRouter;
