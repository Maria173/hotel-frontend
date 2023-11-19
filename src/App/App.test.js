import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import SingleRoom from "../Pages/SingleRoom";
import Room from "../Pages/Room";
import Home from "../Pages/Home";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from 'react-dom';

import { getUnique, formatDate, formatLiteralDate } from '../Helpers';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><App /></Router>, div);
});

test("renders page title element", () => {
  render(<Router><App /></Router>);
  const linkElement = screen.getByText('Гостиница N');
  expect(linkElement).toBeInTheDocument();
});

test('getUnique returns unique values array from arg array', () => {
  const items = [1, 2, 3, 3, 4, 5, 5];
  const uniqueItems = getUnique(items);
  expect(uniqueItems).toEqual([1, 2, 3, 4, 5]);
});

test('getUnique with empty array arg returns empty array', () => {
  const items = [];
  const uniqueItems = getUnique(items);
  expect(uniqueItems).toEqual([]);
});

test('getUnique with non-array arg returns empty array', () => {
  const items = 1;
  const uniqueItems = getUnique(items);
  expect(uniqueItems).toEqual([]);
});

test('formatDate eturns the formatted date in "yyyy-mm-dd" format"', () => {
  const dateString = '2022-01-01';
  const formattedDate = formatDate(dateString);
  expect(formattedDate).toBe('2022-01-01');
});

test('formatDate pads single-digit month and day with leading zeros', () => {
  const dateString = '2022-2-3';
  const formattedDate = formatDate(dateString);
  expect(formattedDate).toBe('2022-02-03');
});

test('formatDate handles different date formats', () => {
  const dateString = '01/01/2022';
  const formattedDate = formatDate(dateString);
  expect(formattedDate).toBe('2022-01-01');
});

test('formatLiteralDate returns the formatted date string in Russian locale', () => {
  const date = '2022-01-01';
  const formattedDate = formatLiteralDate(date);
  expect(formattedDate).toBe('1 января 2022 г.');
});

test('formatLiteralDate handles different date formats', () => {
  const date = '01/01/2022';
  const formattedDate = formatLiteralDate(date);
  expect(formattedDate).toBe('1 января 2022 г.');
});

test("renders not found info if room is not provided on toom page", () => {
  render(<Router><SingleRoom /></Router>);
  expect(screen.getByText('Номер не найден!')).toBeInTheDocument()
});

test("not renders book button if date in is not selected", () => {
  // localStorage.setItem('dateIn', '2024-04-14');
  localStorage.setItem('dateOut', '2024-04-15');
  const mockRoom = [{id: 1, name: 'Англия', description: 'Номер с видом на лес', type: 'Стандарт', breakfast: false, pets: false}];
  render(<Router><SingleRoom mockRoom={mockRoom} /></Router>);
  const button = screen.queryByRole('button');
  expect(button).not.toBeInTheDocument();
  localStorage.removeItem('dateOut');
});

test("not renders book button if date out is not selected", () => {
  localStorage.setItem('dateIn', '2024-04-14');
  // localStorage.setItem('dateOut', '2024-04-15');
  const mockRoom = [{id: 1, name: 'Англия', description: 'Номер с видом на лес', type: 'Стандарт', breakfast: false, pets: false}];
  render(<Router><SingleRoom mockRoom={mockRoom} /></Router>);
  const button = screen.queryByRole('button');
  expect(button).not.toBeInTheDocument();
  localStorage.removeItem('dateIn');
});

test("renders book button if date in and date out are selected", () => {
  localStorage.setItem('dateIn', '2024-04-14');
  localStorage.setItem('dateOut', '2024-04-15');
  const mockRoom = [{id: 1, name: 'Англия', description: 'Номер с видом на лес', type: 'Стандарт', breakfast: false, pets: false}];
  render(<Router><SingleRoom mockRoom={mockRoom} /></Router>);
  const button = screen.getByRole('button')
  expect(button).toBeInTheDocument();
  localStorage.removeItem('dateIn');
  localStorage.removeItem('dateOut');
});

test('clicking the book button shows book FIO form input', () => {
  localStorage.setItem('dateIn', '2024-04-14');
  localStorage.setItem('dateOut', '2024-04-15');
  const mockRoom = [{id: 1, name: 'Англия', description: 'Номер с видом на лес', type: 'Стандарт', breakfast: false, pets: false}];
  render(<Router><SingleRoom mockRoom={mockRoom} /></Router>);

  const button = screen.getByRole('button')
  fireEvent.click(button)
  expect(screen.getByText('ФИО')).toBeInTheDocument()
  localStorage.removeItem('dateIn');
  localStorage.removeItem('dateOut');
});

test('clicking the book button shows book Phone form input', () => {
  localStorage.setItem('dateIn', '2024-04-14');
  localStorage.setItem('dateOut', '2024-04-15');
  const mockRoom = [{id: 1, name: 'Англия', description: 'Номер с видом на лес', type: 'Стандарт', breakfast: false, pets: false}];
  render(<Router><SingleRoom mockRoom={mockRoom} /></Router>);

  const button = screen.getByRole('button')
  fireEvent.click(button)
  expect(screen.getByText('Телефон')).toBeInTheDocument()
  localStorage.removeItem('dateIn');
  localStorage.removeItem('dateOut');
});

test('clicking the book button shows book Email form input', () => {
  localStorage.setItem('dateIn', '2024-04-14');
  localStorage.setItem('dateOut', '2024-04-15');
  const mockRoom = [{id: 1, name: 'Англия', description: 'Номер с видом на лес', type: 'Стандарт', breakfast: false, pets: false}];
  render(<Router><SingleRoom mockRoom={mockRoom} /></Router>);

  const button = screen.getByRole('button')
  fireEvent.click(button)
  expect(screen.getByText('Email')).toBeInTheDocument()
  localStorage.removeItem('dateIn');
  localStorage.removeItem('dateOut');
});

test('rooms page renders rooms elements', () => {
  const mockRooms = [{id: 1, name: 'Англия', description: 'Номер с видом на лес', type: 'Стандарт', breakfast: false, pets: false}];
  render(<Router><Room mockRooms={mockRooms} /></Router>);
  expect(screen.getByText('Номер «Англия»')).toBeInTheDocument()
});

test('renders not found info if rooms are not provided on rooms page', () => {
  render(<Router><Room /></Router>);
  expect(screen.getByText('Нет номеров, подходящих выбранным фильтрам')).toBeInTheDocument()
});

test('renders feature rooms on home page', () => {
  const mockRooms = [{id: 1, name: 'Англия', description: 'Номер с видом на лес', type: 'Стандарт', breakfast: false, pets: false}];
  render(<Router><Home mockRooms={mockRooms} /></Router>);
  expect(screen.getByText('Номер «Англия»')).toBeInTheDocument()
});
