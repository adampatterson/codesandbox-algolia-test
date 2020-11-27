import React, { Fragment } from 'react';
import {
  Highlight,
  connectRefinementList,
  connectStateResults,
  Panel,
} from 'react-instantsearch-dom';

const hasRefinements = (searchState, attribute, widget = 'refinementList') =>
  Boolean(searchState?.[widget]?.[attribute]?.length > 0);

const FeaturedEquipment = [
  'A/C',
  'ABS',
  'Power Windows',
  'Power Steering',
  'MP3 Player',
  'Bluetooth Connection',
];

const RefinementList = ({
  items,
  refine,
  createURL,
  isFromSearch,
  searchForItems,
  currentRefinement,
}) => {
  return (
    <ul className="row" style={{ paddingInlineStart: '0px' }}>
      {items.map((item) => {
        if (FeaturedEquipment.includes(item.label)) {
          return (
            <li key={item.label} className="list-unstyled col-md-4 ml-0 pb-4">
              <a
                href={createURL(item.value)}
                style={{ fontWeight: item.isRefined ? 'bold' : '' }}
                onClick={(event) => {
                  event.preventDefault();
                  refine(item.value);
                }}
              >
                <img
                  src={
                    currentRefinement.includes(item.label)
                      ? 'https://via.placeholder.com/100/333333/ffffff/?text=' +
                        item.label
                      : 'https://via.placeholder.com/100/eeeeee/000000/?text=' +
                        item.label
                  }
                  title={item.label + ' ' + item.count}
                  alt={item.label + ' ' + item.count}
                  className="img-fluid"
                />
              </a>
            </li>
          );
        }
      })}
    </ul>
  );
};

export default connectRefinementList(RefinementList);
