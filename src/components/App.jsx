import React, { Component } from 'react';
import api from '../services/image-api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Button from './Button/Button';
// import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

export default class App extends Component {
  state = {
    images: [],
    searchImages: '',
    page: 1,
    isLoading: false,
    showModal: false,
    modalImage: '',
    error: null,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchImages !== this.state.searchImages) {
      this.getImages();
    }
  }

  onChangeImages = query => {
    this.setState({ searchImages: query, page: 1, images: [], error: null });
  };

  getImages = () => {
    const { searchImages, page } = this.state;
    this.setState({ isLoading: true });

    api
      .fetchImages({ searchImages, page })
      .then(hits => {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          page: prevState.page + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  onLoadMore = () => {
    this.getImages();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  openModal = largeURL => {
    this.setState({ modalImage: largeURL });
    this.toggleModal();
  };

  render() {
    const { images, isLoading, error, showModal, modalImage } = this.state;
    return (
      <div>
        {showModal && (
          <Modal modalURL={modalImage} onClose={this.toggleModal} />
        )}
        {error && <p>Oops!</p>}
        <Searchbar onSubmit={this.onChangeImages} />
        <ImageGallery images={images} onClick={this.openModal}></ImageGallery>
        {isLoading && <Loader />}
        {images.length > 0 && <Button onClick={this.onLoadMore} />}
      </div>
    );
  }
}
