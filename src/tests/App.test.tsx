import { render, screen, within } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import mockData from './mocks/mockData';
import App from '../App';
import PlanetProvider from '../context/globalProvider';


beforeEach(async () => {
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => mockData
  });
});

afterEach(() => {
  vi.clearAllMocks();
});
describe('App Without Api Return', () => {
  it('testing without API request return, no functions', () => {
    render (
    <PlanetProvider>
      <App />
    </PlanetProvider>
    );

    const searchBar = screen.getByRole('searchbox');
    const column = screen.getByText(/coluna:/i);
    const operator = screen.getByText(/operador:/i);
    const filterFor = screen.getByText(/ordenar por:/i);
    const dropdown = screen.getByRole('combobox', {  name: /operador:/i});
    const filterBtn = screen.getByRole('button', {  name: /filtrar/i});
    const ordenateBtn = screen.getByRole('button', {  name: /ordenar/i});
    const clearAllBtn = screen.getByRole('button', {  name: /limpar todos os filtros/i});
    const desc = screen.getByText(/descendente/i);
    expect(searchBar).toBeInTheDocument();
    expect(column).toBeInTheDocument();
    expect(operator).toBeInTheDocument();
    expect(filterFor).toBeInTheDocument();
    expect(dropdown).toBeInTheDocument();
    expect(filterBtn).toBeInTheDocument();
    expect(ordenateBtn).toBeInTheDocument();
    expect(clearAllBtn).toBeInTheDocument();
    expect(desc).toBeInTheDocument();
  });
  it('testing without API request return, with functions', async () => {

    render (
      <PlanetProvider>
        <App />
      </PlanetProvider>
      );
    const lastColumnHeader = await screen.findByRole('columnheader', {  name: /url/i});
    const firstColumnHeader = await screen.findByRole('columnheader', {  name: /name/i});
    const table = screen.getAllByRole('table')[0];
    expect(lastColumnHeader).toBeInTheDocument();
    expect(firstColumnHeader).toBeInTheDocument();
    expect(table).toBeInTheDocument();
    screen.debug();
  });
  it('testing with API request return, with functions', async () => {

    render (
      <PlanetProvider>
        <App />
      </PlanetProvider>
      );
    const dropdown = screen.getByTestId('column-filter');
    expect(dropdown).toBeInTheDocument();
    await userEvent.click(dropdown);
    const diameter = within(dropdown).getByRole('option', { name: /diameter/i });
    expect(diameter).toBeInTheDocument();
    await userEvent.click(diameter);
    const comparison = screen.getByTestId('comparison-filter');
    expect(comparison).toBeInTheDocument();
    await userEvent.click(comparison);
    const lessThan = screen.getByText(/menor que/i);
    expect(lessThan).toBeInTheDocument();
    await userEvent.click(lessThan);
    const value = screen.getByTestId('value-filter');
    expect(value).toBeInTheDocument();
    await userEvent.type(value, '9000');
    const filterBtn = screen.getByTestId('button-filter');
    expect(filterBtn).toBeInTheDocument();
    await userEvent.click(filterBtn);
    const table = screen.getAllByRole('table')[0];
    expect(table).toBeInTheDocument();
    const tableRows = screen.getAllByRole('row');
    expect(tableRows).toHaveLength(1);
  });
});
