import React from 'react';
import { render, screen ,fireEvent } from '@testing-library/react';

import App from './App';

describe('tree with height 0', () => {
  it('should update treeHeight state correctly to 0', () => {
    render(<App />);
    const button = screen.getByText('Add Root Node');
    fireEvent.click(button);
    const treeHeight = screen.getByText('Height of tree:0');
    expect(treeHeight).toBeInTheDocument();
  });
});


describe('tree with height 1', () => {
  it('should update treeHeight state correctly to 1', () => {
    render(<App />);
    const rootNodeButton = screen.getByText('Add Root Node');
    const leftChildButton = screen.getByText('Add Left Child');
const input = screen.getByLabelText(/id of node you want to add children to/i);
    fireEvent.change(input, { target: { value: '0' } });
    fireEvent.click(rootNodeButton);
    fireEvent.click(leftChildButton);
    const treeHeight = screen.getByText('Height of tree:1');
    expect(treeHeight).toBeInTheDocument();
    expect(input.value).toBe('0');
  });
});

describe('checks number of leafes', () => {
  it('should return 1 leaf', () => {
    render(<App />);
    const button = screen.getByText('Add Root Node');
    fireEvent.click(button);
    const leafes = screen.getByText('number of leafes:1');
    expect(leafes).toBeInTheDocument();
  });
});

describe('check number of leafes', () => {
  it('should return 2 leafes', () => {
    render(<App />);
   
    const rootNodeButton = screen.getByText('Add Root Node');
    const leftChildButton = screen.getByText('Add Left Child');
    const rightChildButton = screen.getByText('Add Right Child');
const input = screen.getByLabelText(/id of node you want to add children to/i);
    fireEvent.change(input, { target: { value: '0' } });
    fireEvent.click(rootNodeButton);
    fireEvent.click(leftChildButton);
    fireEvent.click(rightChildButton);
    const treeHeight = screen.getByText('number of leafes:2');
    expect(treeHeight).toBeInTheDocument();
    expect(input.value).toBe('0');
  });
});



describe('check if trees are equal', () => {
  it('should return that trees are equal', () => {
    render(<App />);
    const equalityTester=screen.getByText('test equality');
    const valu = screen.getByLabelText(/node to add to tree/i);
    const id = screen.getByLabelText(/id of node you want to add children to/i);
    const tableFirst = screen.getByLabelText(/number of first tree/i);
    const tableSecond = screen.getByLabelText(/number of second tree/i);
    const rootNodeButton = screen.getByText('Add Root Node');
    const leftChildButton = screen.getByText('Add Left Child');
    const rightChildButton = screen.getByText('Add Right Child');
     const addTree=screen.getByText('Add Tree');
    fireEvent.change(id, { target: { value: '0' } });
    fireEvent.change(valu, { target: { value: '1' } });
    fireEvent.click(rootNodeButton);
    fireEvent.change(valu, { target: { value: '2' } });
    fireEvent.click(leftChildButton);
    fireEvent.change(valu, { target: { value: '3' } });
    fireEvent.click(rightChildButton);
 
    fireEvent.click(addTree);
    fireEvent.change(id, { target: { value: '0' } });
    fireEvent.change(valu, { target: { value: '1' } });
    fireEvent.click(rootNodeButton);
    fireEvent.change(valu, { target: { value: '2' } });
    fireEvent.click(leftChildButton);
    fireEvent.change(valu, { target: { value: '3' } });
    fireEvent.click(rightChildButton);
      


    fireEvent.change(tableFirst, { target: { value: '0' } });
    fireEvent.change(tableSecond, { target: { value: '1' } });

    fireEvent.click(equalityTester);
   
    const treeEqual = screen.getByText('trees are equal');
    expect(treeEqual).toBeInTheDocument();
  });
});

describe('check if trees are equal', () => {
  it('should return that trees are not equal', () => {
    render(<App />);
    const equalityTester=screen.getByText('test equality');
    const valu = screen.getByLabelText(/node to add to tree/i);
    const id = screen.getByLabelText(/id of node you want to add children to/i);
    const tableFirst = screen.getByLabelText(/number of first tree/i);
    const tableSecond = screen.getByLabelText(/number of second tree/i);
    const rootNodeButton = screen.getByText('Add Root Node');
    const leftChildButton = screen.getByText('Add Left Child');
    const rightChildButton = screen.getByText('Add Right Child');
     const addTree=screen.getByText('Add Tree');
    fireEvent.change(id, { target: { value: '0' } });
    fireEvent.change(valu, { target: { value: '1' } });
    fireEvent.click(rootNodeButton);
    fireEvent.change(valu, { target: { value: '2' } });
    fireEvent.click(leftChildButton);
    fireEvent.change(valu, { target: { value: '3' } });
    fireEvent.click(rightChildButton);
 
    fireEvent.click(addTree);
    fireEvent.change(id, { target: { value: '0' } });
    fireEvent.change(valu, { target: { value: '6' } });
    fireEvent.click(rootNodeButton);
    fireEvent.change(valu, { target: { value: '5' } });
    fireEvent.click(leftChildButton);
    fireEvent.change(valu, { target: { value: '4' } });
    fireEvent.click(rightChildButton);
      


    fireEvent.change(tableFirst, { target: { value: '0' } });
    fireEvent.change(tableSecond, { target: { value: '1' } });

    fireEvent.click(equalityTester);
   
    const treeEqual = screen.getByText('trees are not equal');
    expect(treeEqual).toBeInTheDocument();
  });
});