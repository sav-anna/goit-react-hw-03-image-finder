import React, { Component } from 'react';
import api from '../services/image-api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Button from './Button/Button';

export default class App extends Component {
  state = {
    images: [],
    searchImages: '',
    page: 1,
    isLoading: false,
    showModal: false,
    modalImage: '',
    error: null,
    showLoadMoreBTN: false,
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
          showLoadMoreBTN: true,
        }));
        if (hits.length < 12 && hits.length > 0) {
          alert('You have seen all the pictures');
          this.setState({ showLoadMoreBTN: false });
          return;
        }
        if (hits.length === 0) {
          alert('Sorry, we did not find any images');
          this.setState({ showLoadMoreBTN: false });
          return;
        }
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  onLoadMore = images => {
    this.getImages();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  openModal = largeURL => {
    this.setState({ modalImg: largeURL });
    this.toggleModal();
  };

  render() {
    const { images, isLoading, error, showModal, modalImg, showLoadMoreBTN } =
      this.state;
    return (
      <div>
        {showModal && <Modal modalURL={modalImg} onClose={this.toggleModal} />}
        {error && <p>Oops!</p>}
        <Searchbar onSubmit={this.onChangeImages} />
        <ImageGallery images={images} openModal={this.openModal}></ImageGallery>
        {isLoading && <Loader />}
        {showLoadMoreBTN && <Button onClick={this.onLoadMore} />}
      </div>
    );
  }
}
