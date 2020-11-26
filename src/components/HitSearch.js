import React, { Fragment } from 'react';

import { slug } from '../helpers';
import { Highlight } from 'react-instantsearch-dom';
import numeral from 'numeral';

const HitSearch = (props) => {
  let seo = slug(
    `${props.hit.stock_type} ${props.hit.year} ${props.hit.make_name} ${props.hit.model_name} ${props.hit.trim}`
  );

  let imageAlt = props.hit.make_name + ' ' + props.hit.model_name;

  // @todo Custom URL path should be read from window.vdpUrl
  let vdpURL = `/inventory/${seo}/${props.hit.item_key}`;

  let active = false;

  let special = () => {
    if (props.hit.is_on_special === true) {
      return <div className="special">On Special</div>;
    }
  };

  let certified = () => {
    if (props.hit.is_certified === true) {
      return <div className="certified">Is Certified</div>;
    }
  };

  let Promotional = () => {
    return (
      <Fragment>
        <div className="promotional">
          {special(props)}
          {certified(props)}
        </div>
        <div className="gradient"></div>
      </Fragment>
    );
  };

  let Favorite = () => {
    return (
      <Fragment>
        <div
          className={isFavorite(active)}
          onClick={(e) => {
            e.preventDefault();
            window.alert('Add to Favorites');
          }}
        >
          <i className="fal fa-bookmark fa-lg"></i>
          <i className="fad fa-bookmark fa-lg"></i>
          <i className="fas fa-bookmark fa-lg"></i>
        </div>
      </Fragment>
    );
  };

  let isFavorite = (active) => {
    return active ? 'fav active' : 'fav';
  };

  let Details = () => {
    return (
      <Fragment>
        <div className="title mb-2">
          <strong>
            <Highlight attribute="year" hit={props.hit} />{' '}
            <Highlight attribute="make_name" hit={props.hit} />{' '}
            <Highlight attribute="model_name" hit={props.hit} />{' '}
            <Highlight attribute="trim" hit={props.hit} />
          </strong>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="price">
              ${numeral(props.hit.regular_price).format('0,0')}
            </div>
          </div>
          <div className="col-md-6 text-right">
            <strong>
              <div className="price">
                $
                {numeral(props.hit.lowest_biweekly_finance_payment).format(
                  '0,0'
                )}
                /BW
              </div>
            </strong>
          </div>
        </div>

        <div className="dealer mt-3 mb-3 text-left">
          <small>
            <Highlight attribute="dealer_name" hit={props.hit} />
          </small>
        </div>

        <div className="stock-number mt-3 mb-3 text-center">
          <strong>
            STK:
            <Highlight attribute="stock_number" hit={props.hit} />
          </strong>
        </div>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <div className="image">
        <a href={vdpURL}>
          <Promotional />
          <Favorite />
          <img src={props.hit.photo_url} alt={imageAlt} className="img-fluid" />
        </a>
      </div>
      <div className="details">
        <Details />
      </div>
    </Fragment>
  );
};

export default HitSearch;
