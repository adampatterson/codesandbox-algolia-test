import React, { Component } from 'react';
import { QueryRuleCustomData } from 'react-instantsearch-dom';

class Banner extends Component {
  render() {
    return (
      <QueryRuleCustomData>
        {({ items }) =>
          items.map((item) => {
            return (
              <header
                id="searchIncentive"
                className="bg-cover bg-center mb-4"
                style={{
                  backgroundImage: `url(${
                    window.fresh.assets +
                    'images/incentives/' +
                    item.show_banner +
                    '.jpg'
                  })`,
                }}
                key={item.show_banner}
              >
                <section
                  className="d-flex justify-content-center align-items-center text-center mb-0"
                  style={{
                    backgroundColor: 'rgba(0,0,0,.5)',
                  }}
                >
                  <div className="d-block text-white">
                    <h1>{item.promo_content}</h1>
                  </div>
                </section>
              </header>
            );
          })
        }
      </QueryRuleCustomData>
    );
  }
}

export default Banner;
