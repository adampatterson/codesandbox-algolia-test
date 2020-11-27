import React, { Fragment } from 'react';
import { connectHits, Highlight } from 'react-instantsearch-dom';

import { slug } from '../helpers';
import numeral from 'numeral';

const Hits = ({ hits, userFavorites, onClickFavorite }) => {
  return (
    <Fragment>
      {hits.map((hit) => {
        let seo = slug(
          `${hit.stock_type} ${hit.year} ${hit.make_name} ${hit.model_name} ${hit.trim}`
        );

        let imageAlt = hit.make_name + ' ' + hit.model_name;

        // @todo Custom URL path should be read from window.vdpUrl
        let vdpURL = `/inventory/${seo}/${hit.item_key}`;

        let isFavActive =
          userFavorites.indexOf(hit.item_key) > -1 ? 'active' : '';

        let special = () => {
          if (hit.is_on_special === true) {
            return <div className="special">On Special</div>;
          }
        };

        let certified = () => {
          if (hit.is_certified === true) {
            return <div className="certified">Is Certified</div>;
          }
        };

        let Promotional = () => {
          return (
            <Fragment>
              <div className="promotional">
                {special(hit)}
                {certified(hit)}
              </div>
              <div className="gradient"></div>
            </Fragment>
          );
        };

        let Favorite = ({ onClick }) => {
          return (
            <Fragment>
              <div
                className={'fav ' + isFavActive}
                onClick={(e) => {
                  e.preventDefault();
                  onClickFavorite(hit.item_key);
                }}
              >
                <i className="fal fa-bookmark fa-lg"></i>
                <i className="fad fa-bookmark fa-lg"></i>
                <i className="fas fa-bookmark fa-lg"></i>
              </div>
            </Fragment>
          );
        };

        let Details = () => {
          return (
            <Fragment>
              <div className="title mb-2">
                <strong>
                  <Highlight attribute="year" hit={hit} />{' '}
                  <Highlight attribute="make_name" hit={hit} />{' '}
                  <Highlight attribute="model_name" hit={hit} />{' '}
                  <Highlight attribute="trim" hit={hit} />
                </strong>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="price">
                    ${numeral(hit.regular_price).format('0,0')}
                  </div>
                </div>
                <div className="col-md-6 text-right">
                  <strong>
                    <div className="price">
                      $
                      {numeral(hit.lowest_biweekly_finance_payment).format(
                        '0,0'
                      )}
                      /BW
                    </div>
                  </strong>
                </div>
              </div>

              <div className="dealer mt-3 mb-3 text-left">
                <small>
                  <Highlight attribute="dealer_name" hit={hit} />
                </small>
              </div>

              <div className="stock-number mt-3 mb-3 text-center">
                <strong>
                  STK:
                  <Highlight attribute="stock_number" hit={hit} />
                </strong>
              </div>
            </Fragment>
          );
        };

        return (
          <div className={'ais-Hits-item ' + isFavActive} key={hit.objectID}>
            <div className="image">
              <a href={vdpURL}>
                <Promotional />
                <img src={hit.photo_url} alt={imageAlt} className="img-fluid" />
                <Favorite onClickFavorite={onClickFavorite} />
              </a>
            </div>
            <div className="details">
              <Details />
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default connectHits(Hits);
