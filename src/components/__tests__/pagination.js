import { mount } from '@vue/test-utils';
import Pagination from '../Pagination.vue';
import { __setState } from '../../component';
jest.mock('../../component');

const defaultState = {
  createURL: () => '#',
  refine: jest.fn(),
  pages: [0, 1, 2, 3, 4, 5, 6],
  nbPages: 20,
  currentRefinement: 0,
  isFirstPage: true,
  isLastPage: false,
};

it('renders correctly first page', () => {
  __setState(defaultState);
  const wrapper = mount(Pagination);

  expect(wrapper.html()).toMatchSnapshot();
});

it('renders correctly another page', () => {
  __setState({
    ...defaultState,
    pages: [3, 4, 5, 6, 7, 8, 9],
    nbPages: 20,
    currentRefinement: 6,
    isFirstPage: false,
    isLastPage: false,
  });
  const wrapper = mount(Pagination);

  expect(wrapper.html()).toMatchSnapshot();
});

it('renders correctly last page', () => {
  __setState({
    ...defaultState,
    pages: [3, 4, 5, 6, 7, 8, 9],
    nbPages: 9,
    currentRefinement: 9,
    isFirstPage: false,
    isLastPage: true,
  });
  const wrapper = mount(Pagination);

  expect(wrapper.html()).toMatchSnapshot();
});

it('Moves to the first page on that button', () => {
  __setState({
    ...defaultState,
    isFirstPage: false,
  });
  const wrapper = mount(Pagination);

  const firstPage = wrapper.find(
    '.ais-Pagination-item--firstPage .ais-Pagination-link'
  );
  firstPage.trigger('click');
  expect(wrapper.vm.state.refine).toHaveBeenLastCalledWith(0);
});

it('Moves to the next page on that button', () => {
  const currentRefinement = 5;
  __setState({
    ...defaultState,
    currentRefinement,
  });
  const wrapper = mount(Pagination);

  const nextPage = wrapper.find(
    '.ais-Pagination-item--nextPage .ais-Pagination-link'
  );
  nextPage.trigger('click');
  expect(wrapper.vm.state.refine).toHaveBeenLastCalledWith(
    currentRefinement + 1
  );
});

it('Moves to the last page on that button', () => {
  const nbPages = 1000;
  __setState({
    ...defaultState,
    isLastPage: false,
    nbPages,
  });
  const wrapper = mount(Pagination);

  const lastPage = wrapper.find(
    '.ais-Pagination-item--lastPage .ais-Pagination-link'
  );
  lastPage.trigger('click');
  expect(wrapper.vm.state.refine).toHaveBeenLastCalledWith(nbPages - 1);
});

it('Moves to the previous page on that button', () => {
  const currentRefinement = 5;
  __setState({
    ...defaultState,
    isFirstPage: false,
    currentRefinement,
  });
  const wrapper = mount(Pagination);

  const previousPage = wrapper.find(
    '.ais-Pagination-item--previousPage .ais-Pagination-link'
  );
  previousPage.trigger('click');
  expect(wrapper.vm.state.refine).toHaveBeenLastCalledWith(
    currentRefinement - 1
  );
});
