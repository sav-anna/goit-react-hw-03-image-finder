import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  render() {
    const { id, imageURL, modalURL, tags } = this.props;
    return (
      <li className={css.ImageGalleryItem} key={id}>
        <img
          className={css.ImageGalleryItem__image}
          src={imageURL}
          alt={tags}
          onClick={() => this.props.onClick(modalURL)}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  imageURL: PropTypes.string.isRequired,
  modalURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
};
