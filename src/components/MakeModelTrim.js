import React, { Fragment } from 'react';

import {
  Panel,
  RefinementList,
  CurrentRefinements,
  connectAutoComplete,
  connectStateResults,
} from 'react-instantsearch-dom';

const hasRefinements = (searchState, attribute, widget = 'refinementList') =>
  Boolean(searchState?.[widget]?.[attribute]?.length > 0);

// https://codesandbox.io/s/serene-http-evk8n?file=/src/App.js
const MakeModelTrim = connectStateResults(function ConditionalRefinements({
  searchState,
}) {
  return (
    <Fragment>
      <Panel header="Make Name">
        <RefinementList
          attribute="make_name"
          limit={6}
          showMore={true}
          showMoreLimit={50}
        />
      </Panel>

      {hasRefinements(searchState, 'make_name') && (
        <Panel header="Model Name">
          <RefinementList
            attribute="model_name"
            limit={6}
            showMore={true}
            showMoreLimit={50}
          />
        </Panel>
      )}

      {hasRefinements(searchState, 'model_name') && (
        <Panel header="Trim">
          <RefinementList attribute="trim" limit={6} showMore={true} />
        </Panel>
      )}
    </Fragment>
  );
});

export default connectAutoComplete(MakeModelTrim);
