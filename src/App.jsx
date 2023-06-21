import React, { useState } from 'react';
import './App.scss';
import cn from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const fullProducts = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(
    serverCategory => serverCategory.id === product.categoryId,
  );

  const user = usersFromServer.find(owner => owner.id === category.ownerId);

  const fullProduct = { ...product, category, user };

  return fullProduct;
});

const findProductsByUserId = (userId, products) => {
  if (userId === 'All') {
    return products;
  }

  return products.filter(product => product.user.id === +userId);
};

export const App = () => {
  const [products, setProducts] = useState(fullProducts);
  // const [users, setUsers] = useState(usersFromServer);
  const users = usersFromServer;
  const [selectedUserId, setSelectedUserId] = useState('All');

  const filterProducts = (event) => {
    setSelectedUserId(event.target.id);
    setProducts(current => findProductsByUserId(selectedUserId, current));
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                id="All"
                onClick={filterProducts}
                className={cn({
                  'is-active': selectedUserId === 'All',
                })}
                data-cy="FilterAllUsers"
                href="#/"
              >
                All
              </a>

              {users.map(user => (
                <a
                  id={user.id}
                  onClick={filterProducts}
                  key={user.id}
                  data-cy="FilterAllUsers"
                  href="#/"
                  className={cn({
                    'is-active': +selectedUserId === user.id,
                  })}
                >
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value="qwe"
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                  />
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 1
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 4
              </a>
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>

          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    ID

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Product

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-down" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Category

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-up" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    User

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map(product => (
                <tr key={product.id} data-cy="Product">
                  <td
                    className="has-text-weight-bold"
                    data-cy="ProductId"
                  >
                    {product.id}
                  </td>
                  <td data-cy="ProductName">
                    {product.name}
                  </td>
                  <td data-cy="ProductCategory">
                    {product.category.icon}
                    &nbsp;-&nbsp;
                    {product.category.title}
                  </td>
                  <td
                    data-cy="ProductUser"
                    className={cn({
                      'has-text-link': product.user.sex === 'm',
                      'has-text-danger': product.user.sex === 'f',
                    })}
                  >
                    {product.user.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
